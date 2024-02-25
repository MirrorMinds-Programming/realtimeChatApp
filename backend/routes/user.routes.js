import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsers,sendFriendRequest, getFriendRequest, deleteFriendRequest} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.post("/friendRequest", protectRoute, sendFriendRequest);
router.get("/getFriendRequest", protectRoute, getFriendRequest);
router.post("/deleteFriendRequest", protectRoute, deleteFriendRequest);
//router.get("/acceptFriendRequest", protectRoute, acceptFriendRequest);

export default router;