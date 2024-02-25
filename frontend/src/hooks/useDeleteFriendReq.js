import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import zustandFriendRequests from "../zustand/zustandFriendRequests";

const useDeleteFriendRequests = () => {
	const [loading, setLoading] = useState(false);
	const {requests, setRequests} = zustandFriendRequests();

	useEffect(() => {
		const deleteFriendRequests = async (friendID) => {
			setLoading(true);
			try {
				console.log("hoooooook");
				console.log(friendID);

				const res = await fetch(`/api/users/deleteFriendRequest`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ friendID }),
				});

				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				//console.log(data);
				setRequests(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		deleteFriendRequests();
	},[setRequests]);

	return { loading, requests };
};
export default useDeleteFriendRequests;