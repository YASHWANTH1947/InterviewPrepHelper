import multer from "multer";

/*
memoryStorage stores data inside ram, so it cant store too much data, only used to store data that is going to be removed soon,there is automatic next here

*/

const upload = multer({ storage: multer.memoryStorage() });

export default upload;
