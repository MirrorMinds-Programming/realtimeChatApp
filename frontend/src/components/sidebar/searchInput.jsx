import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false); // State to control search bar visibility
    const [isSearchFocused, setIsSearchFocused] = useState(false); // State to track search input focus
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        if (search.length < 3) {
            return toast.error("Search term must be at least 3 characters long");
        }

        const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else toast.error("No such user found!");
    };

    const handleSearchIconClick = () => {
        setIsSearchOpen(true);
    };

    const handleSearchInputBlur = () => {
        setIsSearchFocused(false);
    };

    return (
        <div className="relative">
            {/* Search icon */}
            <button
                className="btn btn-circle bg-sky-500 text-white"
                onClick={handleSearchIconClick}
            >
                <IoSearchSharp className="w-6 h-6 outline-none" />
            </button>
            {/* Search input field */}
            {isSearchOpen && (
                <form onSubmit={handleSubmit} className="absolute top-0 left-0">
                    <input
                        type="text"
                        placeholder="Search…"
                        className="input input-bordered rounded-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onBlur={handleSearchInputBlur}
                        autoFocus={!isSearchFocused} // Automatically focus input field on initial opening
                    />
                    <button type="submit" className="hidden"></button>
                </form>
            )}
        </div>
    );
};

export default SearchInput;
