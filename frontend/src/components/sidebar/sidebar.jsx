import Conversations from "./conversations.jsx";
import LogoutButton from "./logoutButton.jsx";
import SearchInput from "./searchInput.jsx";
import { useState,useEffect } from "react";

import useGetConversations from "../../hooks/useGetConversations";

const Sidebar = ({handleAddButtonClick,handleInboxClick}) => {

	const { conversations } = useGetConversations();
	const [filteredConversationsList, setFilteredConversationsList] = useState(conversations);

	useEffect(() => {
		setFilteredConversationsList(conversations);
	},[conversations])

	const handleSearch = (searchTerm) => {
        const filteredConversations = conversations.filter((conversation) =>
            conversation.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredConversationsList(filteredConversations);
    };

	return (
		<div className='w-[280px] border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput onSearch={handleSearch}/>
			<div className='divider px-3 '></div>
			<Conversations conversations={filteredConversationsList}/>
			<LogoutButton handleAddButtonClick={handleAddButtonClick} handleInboxClick={handleInboxClick}/>
		</div>
	);
};
export default Sidebar;
