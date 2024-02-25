import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import zustandFriendRequests from "../zustand/zustandFriendRequests";

const useGetFriendRequests = () => {
	const [loading, setLoading] = useState(false);
	const {requests, setRequests} = zustandFriendRequests();

	useEffect(() => {
		const getFriendRequests = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users/getFriendRequest");
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
		getFriendRequests();
	}, []);

	return { loading, requests };
};
export default useGetFriendRequests;