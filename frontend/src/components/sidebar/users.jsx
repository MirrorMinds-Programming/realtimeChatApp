import useGetConversations from "../../hooks/useGetConversations";
import User from "./user.jsx";

const AllUsers = () => {
	const { loading, conversations } = useGetConversations();

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((user, idx) => (
				<User
					key={user._id}
					user={user}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default AllUsers;
