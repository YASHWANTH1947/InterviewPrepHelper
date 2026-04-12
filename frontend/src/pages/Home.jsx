import React from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getMe, logoutUser } from "../api/auth.services"; // Import your service

const Home = () => {
  // Pass the queryFn so React Query knows how to re-fetch if needed

  const { data: user } = useQuery({
    queryKey: ["authUser"],
    queryFn: getMe,
  });
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear the cache so App.jsx redirects to Login immediately
      queryClient.setQueryData(["authUser"], null);
      // Or use: queryClient.invalidateQueries({ queryKey: ["authUser"] });

      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error.message);
    },
  });
  return (
    <div className="p-8">
      <header className="flex justify-between items-center">
        <h1>Welcome, {user?.username || "User"}</h1>

        <button
          onClick={() => logout()}
          disabled={isLoading}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </header>

      <main className="mt-10">
        <p>Your email: {user?.email}</p>
        {/* Your chat list or other content goes here */}
      </main>
    </div>
  );
};

export default Home;
