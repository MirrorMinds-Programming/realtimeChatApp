import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsers,sendFriendRequest, getFriendRequest, deleteFriendRequest, acceptFriendRequest, getContactList, getNumFriendRequests} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.post("/friendRequest", protectRoute, sendFriendRequest);
router.get("/getFriendRequest", protectRoute, getFriendRequest);
router.get("/getContactList", protectRoute, getContactList);
router.post("/deleteFriendRequest", protectRoute, deleteFriendRequest);
router.post("/acceptFriendRequest", protectRoute, acceptFriendRequest);
router.get("/getNumFriendRequests", protectRoute, getNumFriendRequests);

export default router;