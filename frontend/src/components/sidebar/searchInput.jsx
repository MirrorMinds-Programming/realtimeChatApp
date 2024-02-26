import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
// import useConversation from "../../zustand/useConversation"; // to use setSelectedConversation


const SearchInput = ({ onSearch }) => {
    const [search, setSearch] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false); // State to control search bar visibility
    const [isSearchFocused, setIsSearchFocused] = useState(false); // State to track search input focus

    const handleChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        // Call the onSearch function provided by the parent component
        onSearch(searchTerm);
    };


    const handleSearchIconClick = () => {
        setIsSearchOpen(true);
    };

    const handleSearchInputBlur = () => {
        setIsSearchOpen(false);
        setIsSearchFocused(false);
    };

    return (
        <div className="relative">
            {/* Search icon */}
            <button
                className="btn btn-circle bg-sky-500 text-white "
                onClick={handleSearchIconClick}
            >
                <IoSearchSharp className="w-6 h-6 outline-none" />
            </button>
            {/* Search input field */}
            {isSearchOpen && (
                <form className="absolute top-0 left-0">
                    <input
                        type="text"
                        placeholder="Search…"
                        className="input input-bordered rounded-full"
                        value={search}
                        onChange={handleChange} 
                        onBlur={handleSearchInputBlur}
                        autoFocus={!isSearchFocused} // Automatically focus input field on initial opening
                    />
                </form>
            )}
        </div>
    );
};

export default SearchInput;
