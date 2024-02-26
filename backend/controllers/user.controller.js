import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// Arkadas ekleme sekmesine girince acılan 
export const  getContactList = async (req, res) => {
	try {
		const loggedInUserId = req.user._id; //protectRoute sayesinde yapabiliyoruz

		// Get the IDs of the user's friends
        const friendsListObjects = req.user.friends;
		const friendsListIDs = friendsListObjects.map(friend => friend._id).toString();

        // Find users who are not in the friends list
        const filteredUsers = await User.find({ 
            _id: { $ne: loggedInUserId } // Exclude the logged-in user
        }).select("-password");

		const usersNotInFriendList = filteredUsers.filter(user => {
			// Return true if the user's ID is not present in the friendsListIDs array
			return !friendsListIDs.includes(user._id.toString());
		});
		
		res.status(200).json(usersNotInFriendList);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Ana ekrandaki kullanıcılar
export const  getUsers = async (req, res) => {
	try {
		const loggedInUserId = req.user._id; //protectRoute sayesinde yapabiliyoruz

		const user = await User.findOne({ _id: loggedInUserId });
        const friendsListIDs = user.friends;

        const friendsList = await Promise.all(friendsListIDs.map(async (friendId) => {
            const friendUser = await User.findById(friendId);
            return {
                user: friendUser,
            };
        }));

        res.status(200).json(friendsList);
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

		const user = await User.findOne({ _id:friendID });
		
		if (!user.friendRequests.includes(loggedInUserId)) {
			user.friendRequests.push(loggedInUserId);
		}
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
		
		const { friendID } = req.body;
		const { id: receiverId } = req.params;
        const loggedInUserId = req.user._id;

		
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


export const acceptFriendRequest = async (req, res) => {
    try {
		const { friendID } = req.body;
		const { id: receiverId } = req.params;
        const loggedInUserId = req.user._id;

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

		// Add to friends
		const friendsList = updatedUser.friends;

		const addedUser = await User.findOne({ _id: friendID });

		if (!friendsList.includes(addedUser)) {
			friendsList.push(addedUser);
		}
		await updatedUser.save();

        res.status(200).json(friendRequests);
    } catch (error) {
        console.error("Error in getFriendRequest: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
