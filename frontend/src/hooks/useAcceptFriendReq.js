import { useState } from "react";
import zustandFriendRequests from "../zustand/zustandFriendRequests";
import toast from "react-hot-toast";

const useAcceptFriendRequests = () => {
	const [loading, setLoading] = useState(false);
	const { requests, setRequests} = zustandFriendRequests();

	const acceptFriendRequests = async (friendID) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/users/acceptFriendRequest`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ friendID }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);
			setRequests([data]);

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { acceptFriendRequests, loading, requests };
};
export default useAcceptFriendRequests;

/*
react-hot-toast is a library used for displaying 
toast notifications in React applications. 
Toast notifications are small, temporary messages 
that typically appear at the bottom or top of the screen 
to provide feedback to the user.
*/