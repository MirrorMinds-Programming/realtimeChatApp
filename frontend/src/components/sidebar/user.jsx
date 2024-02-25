import { IoMdPersonAdd } from 'react-icons/io';
import { useSocketContext } from "../../context/SocketContext";

const User = ({ user, lastIdx }) => {
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);

    return (
        <div className="flex items-center justify-between py-4 hover:bg-pink-200">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className='w-12 rounded-full ml-7'>
                    <img src={user.profilePic} alt='user avatar' />
                </div>
            </div>

            <div className="flex flex-1 items-center justify-between ml-10">
                <p className="font-bold text-black-200">{user.fullName}</p>
                <div>
                    <IoMdPersonAdd className="mr-7 w-5 h-5 text-black cursor-pointer transition duration-300 ease-in-out transform hover:scale-110" />
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </div>
    );
};

export default User;