import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import { useState } from "react";
import UsersContainer  from "../../components/sidebar/usersContainer.jsx";
import RequestedFriendsPage  from "../requestedFriendsPage.jsx";

const Home = () => {

	const [showAllUsers, setShowAllUsers] = useState(false);
	const [showRequestesFriends, setRequestesFriends] = useState(false);

	const handleShowAllUsers = () => {
		setShowAllUsers(true);
		setRequestesFriends(false);
	};
	
	const handleShowRequestedFriends = () => {
		
		setShowAllUsers(false);
		setRequestesFriends(true);
	};
	
	return (
	<>
		{showAllUsers ? (
		<div className='rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<UsersContainer />
		</div>
		) : showRequestesFriends ? (
		<div className='rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<RequestedFriendsPage />
		</div>
		) : (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar
			handleAddButtonClick={handleShowAllUsers}
			handleInboxClick={handleShowRequestedFriends}
			/>
			<MessageContainer />
		</div>
		)}
	</>
	);
};
export default Home;