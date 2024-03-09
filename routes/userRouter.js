import express from "express";
const router = express.Router()
import * as userController from "../controllers/userController.js";
import { upload, cloudinary } from '../upload_function/multerCloudinary.js';
//import uploadCloud from '../upload/uploader.js';
// import { upload, cloudinary } from '../upload_function/multerCloudinary.js';
// import {loginMiddleWare,adminMiddleWare,userMiddleWare} from "../middlewares/authMiddleware.js"
// import { getUser,createUser,updateUser,deleteUser } from "../controllers/UserController.js";






router.get('/', userController.getAllUsers)
router.get('/detail', userController.getOneUser)


router.post('/',upload.array('avartar'), userController.createUser)
router.post('/delete', userController.deleteUser)
router.post('/update',upload.array('avartar'), userController.updateUser)

export default router;