import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getUsers = async (req, res) => {
	try {
		const loggedInUserId = req.user._id; //protectRoute sayesinde yapabiliyoruz

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const sendFriendRequest = async (req, res) => {
	try {
		const { friendID } = req.body;
		const { id: receiverId } = req.params;

		const loggedInUserId = req.user._id; //protectRoute sayesinde yapabiliyoruz

		console.log("friend id :", friendID);
	    console.log("loggedInUserId :", loggedInUserId);
		
		const user = await User.findOne({ _id:friendID });
		
		user.friendRequests.push(loggedInUserId);
		// Save the updated sender document


		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newFriendRequest", user);
		}		
		await user.save();

		//res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in sendFriendRequest: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const getFriendRequest = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const user = await User.findOne({ _id: loggedInUserId });
        const friendRequestIds = user.friendRequests;


        const friendRequests = await Promise.all(friendRequestIds.map(async (friendId) => {
            const friendUser = await User.findById(friendId);
            return {
                user: friendUser,
            };
        }));

        res.status(200).json(friendRequests);
    } catch (error) {
        console.error("Error in getFriendRequest: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const deleteFriendRequest = async (req, res) => {
    try {
		//console.log("in backenddd");
		const { friendID } = req.body;
		const { id: receiverId } = req.params;
        const loggedInUserId = req.user._id;

		console.log(friendID);
		// Update the user document to remove the friendID from the friendRequests array
		const updatedUser = await User.findByIdAndUpdate(
			loggedInUserId,
			{ $pull: { friendRequests: friendID } }, // Use $pull to remove friendID from the array
			{ new: true } // Return the updated document
        );

        const friendRequestIds = updatedUser.friendRequests;

        const friendRequests = await Promise.all(friendRequestIds.map(async (friendId) => {
            const friendUser = await User.findById(friendId);
            return {
                user: friendUser,
            };
        }));

        res.status(200).json(friendRequests);
    } catch (error) {
        console.error("Error in getFriendRequest: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
