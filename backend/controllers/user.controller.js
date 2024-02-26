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

		// Find users who are not in the friends list
        const Me = await User.find({ 
            _id: loggedInUserId  // Exclude the logged-in user
        }).select("-password");

		const usersNotInFriendList = filteredUsers.filter(user => {
			// Return true if the user's ID is not present in the friendsListIDs array
			return !friendsListIDs.includes(user._id.toString());
		});
		
		// Combine the data into a single object
        const responseData = {
            usersNotInFriendList: usersNotInFriendList,
            Me: Me
        };

        res.status(200).json(responseData);

	} catch (error) {
		console.error("Error in getContactList: ", error.message);
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

		const friend = await User.findOne({ _id:friendID });
		const me = await User.findOne({ _id:loggedInUserId });
		
		if (!friend.friendRequests.includes(loggedInUserId)) {
			friend.friendRequests.push(loggedInUserId);
			me.sentRequests.push(friendID);
		}
		// Save the updated sender document
 

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newFriendRequest", friend);
			io.to(req.user.socketId).emit("newFriendRequest", me); // Assuming you have stored the current user's socketId in req.user.socketId
		}		

		await Promise.all([me.save(), friend.save()]);

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

		
		// Update the my document to remove the friendID from the friendRequests array
		const updatedMe = await User.findByIdAndUpdate(
			loggedInUserId,
			{ $pull: { friendRequests: friendID } }, // Use $pull to remove friendID from the array
			{ new: true } // Return the updated document
        );

		// Update the friend document to remove the friendID from the sentRequests array
		const updatedFriend = await User.findByIdAndUpdate(
			friendID,
			{ $pull: { sentRequests: loggedInUserId } }, // Use $pull to remove friendID from the array
			{ new: true } // Return the updated document
        );
		

        const friendRequestIds = updatedMe.friendRequests;

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

		// Update the friend document to remove the friendID from the sentRequests array
		const updatedFriend = await User.findByIdAndUpdate(
			friendID,
			{ $pull: { sentRequests: loggedInUserId } }, // Use $pull to remove friendID from the array
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

		// Add to friends
		const friendsList1 = updatedFriend.friends;
		const addedUser1 = await User.findOne({ _id: loggedInUserId });

		if (!friendsList1.includes(addedUser1)) {
			friendsList1.push(addedUser1);
		}

		await Promise.all([updatedFriend.save(), updatedUser.save()]);

        res.status(200).json(friendRequests);
    } catch (error) {
        console.error("Error in getFriendRequest: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
