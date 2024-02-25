import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import { useState } from "react";
import UsersContainer  from "../../components/sidebar/usersContainer.jsx";

const Home = () => {

	const [showAllUsers, setShowAllUsers] = useState(false);

	const handleAddButtonClick = () => {
		setShowAllUsers(true);
	};

	return (
		<>
			{showAllUsers ? (
				<div  className='rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0' >
					<UsersContainer  />
				</div>
			):(
				<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
					<Sidebar handleAddButtonClick={handleAddButtonClick}/> 
					<MessageContainer />
				</div>
				
				)}
		</>
	);
};
export default Home;