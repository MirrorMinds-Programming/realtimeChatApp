import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetContactList = () => {
	const [loading, setLoading] = useState(false);
	const [ContactList, setContactList] = useState([]);
	const [Me, setMe] = useState([]);

	useEffect(() => {
		const getContactList = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users/getContactList");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setContactList(data.usersNotInFriendList);
				setMe(data.Me);

			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getContactList();
	}, []);

	return { loading, ContactList, Me };
};
export default useGetContactList;