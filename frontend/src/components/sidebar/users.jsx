import useGetContactList from "../../hooks/useGetContactList";
import User from "./user.jsx";
import { useState } from 'react';

const AllUsers = () => {
    const { loading, ContactList, Me } = useGetContactList();
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    // Filter the ContactList based on the search query
    const filteredContactList = ContactList.filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <form className='flex items-center gap-2 ml-7 mt-7'>
                <input
                    type='text'
                    placeholder='Search…'
                    className='input input-bordered rounded-full'
                    value={search}
                    onChange={handleChange}
                />
            </form>

            <div className='py-2 flex flex-col overflow-auto'>
                {filteredContactList.map((user, idx) => (
                    <User
                        key={user._id}
                        user={user}
                        Me={Me[0]}
                        lastIdx={idx === filteredContactList.length - 1}
                    />
                ))}
                {loading && <span className='loading loading-spinner mx-auto'></span>}
            </div>
        </div>
    );
};

export default AllUsers;
