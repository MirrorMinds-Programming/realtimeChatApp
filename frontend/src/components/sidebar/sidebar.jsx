import Conversations from "./conversations.jsx";
import LogoutButton from "./logoutButton.jsx";
import SearchInput from "./searchInput.jsx";

const Sidebar = ({handleAddButtonClick,handleInboxClick}) => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<LogoutButton handleAddButtonClick={handleAddButtonClick} handleInboxClick={handleInboxClick}/>
		</div>
	);
};
export default Sidebar;
