import User from "../models/user.models.js";
import BlackList from "../models/blackList.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @desc Login user and return JWT token
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const authLoginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user is not present,error inside login controller");
      return res.status(400).json({ message: "User is not present" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log("Invalid credentials, error inside login controller");
      return res.status(400).json({ message: "Password is incorrect" });
    }
    const token = jwt.sign(
      { userId: user._id, userEmail: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https";
    const options = {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: isSecure,
      sameSite: isSecure ? "none" : "lax",
    };
    console.log("A user successfully loged in,", user);
    res.cookie("token", token, options);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.log(
      "Error while logging in user, error inside login controller," + error,
    );
    res
      .status(500)
      .json({ message: "Server error,Error inside auth login controller!!" });
  }
};

/**
 * @desc Register a new user and return JWT token
 *
 * @param {*} req
 */

const authRegisterController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    console.log("Some data is not presnet in the input!!");
    return res
      .status(400)
      .json({ message: "Username, email and password are required" });
  }
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (user) {
    console.log("User with the same email or username already exists!!");

    console.log("A user Successfully registered,", user);
    return res
      .status(400)
      .json({ message: "User with the same email or username already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        userId: newUser._id,
        userEmail: newUser.email,
        username: newUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https";
    const options = {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: isSecure,
      sameSite: isSecure ? "none" : "lax",
    };
    res.cookie("token", token, options);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(
      "Error while registering user, error inside register controller," + error,
    );
    res.status(500).json({
      message: "Server error,Error inside auth register controller!!",
    });
  }
};

/**
 * @desc Logout user and invalidate JWT token
 *
 * @param {*} req
 */

const authLogoutController = async (req, res) => {
  console.log("A user successfully logged out");
  const token = req.cookies.token;
  if (token) {
    await BlackList.create({ token });
  }
  const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isSecure,
    sameSite: isSecure ? "none" : "lax",
  });
  res.status(200).json({ message: "Logout successful" });
};

const getMeController = async (req, res) => {
  try {
    // Verify token is not blacklisted
    const token = req.cookies.token;
    const isTokenBlackListed = await BlackList.findOne({ token });
    if (isTokenBlackListed) {
      res.clearCookie("token");
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const user = await User.findById(req.user.userId);

    res.status(200).json({
      message: "User details fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error inside get me controler,", error);
  }
};

export {
  authLoginController,
  authRegisterController,
  authLogoutController,
  getMeController,
};
