import { useState } from "react";
import zustandFriendRequests from "../zustand/zustandFriendRequests";
import toast from "react-hot-toast";

const useSendFriendRequest = () => {
	const [loading, setLoading] = useState(false);
	const { requests, setRequests} = zustandFriendRequests();

	const sendFriendRequest = async (friendID) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/users/friendRequest`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ friendID }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);
			setRequests([...requests, data]);

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendFriendRequest, loading };
};
export default useSendFriendRequest;

/*
react-hot-toast is a library used for displaying 
toast notifications in React applications. 
Toast notifications are small, temporary messages 
that typically appear at the bottom or top of the screen 
to provide feedback to the user.
*/