import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useGetFriendRequests from "../../hooks/useGetFriendRequests";
import useDeleteFriendRequests from "../../hooks/useDeleteFriendReq";
import useAcceptFriendRequests from "../../hooks/useAcceptFriendReq";
import useListenFriendRequests from "../../hooks/useListenFriendRequests";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

const FriendRequests = () => {
    
    const { loading, requests } = useGetFriendRequests();
	useListenFriendRequests();

    useEffect(() => {
    }, [requests]); // Add friendRequests as a dependency

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {!loading && requests && requests.map((user, idx) => (
				
                // Add a null check for the user object
                user.user && (
                <div key={user.user._id}>
                    <User
                        user={user.user}
                        lastIdx={idx === requests.length - 1}
                    />
                </div>
                )
            ))}

            {loading && <span className='loading loading-spinner mx-auto'></span>}
        </div>
    );
};
export default FriendRequests;


const User = ({ user, lastIdx }) => {
    const { deleteFriendRequests } = useDeleteFriendRequests();
    const { acceptFriendRequests } = useAcceptFriendRequests();
    
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);

	const handleDeleteFriend = async () => { // Make the function asynchronous if needed
        try {
            // Call the sendFriendRequest function with the user ID
            
            await deleteFriendRequests(user._id); // Await if sendFriendRequest returns a promise
            console.log('Friend request deleted for user:', user._id);
            // Optionally, you can handle success here (e.g., show a success toast)
        } catch (error) {
            console.error('Error deleting friend request:', error.message);
        }
    };
    
    const handleAcceptFriend = async () => { // Make the function asynchronous if needed
        try {
            // Call the sendFriendRequest function with the user ID
            await acceptFriendRequests(user._id); // Await if sendFriendRequest returns a promise
            console.log('Friend request accepted for user:', user._id);
            // Optionally, you can handle success here (e.g., show a success toast)
        } catch (error) {
            console.error('Error adding friend request:', error.message);
        }
    };
    
    return (
        <div className="flex items-center justify-between py-4 hover:bg-pink-200">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className='w-12 rounded-full ml-7'>
                    <img src={user.profilePic} alt='user avatar' />
                </div>
            </div>

            <div className="flex flex-1 items-center justify-between ml-10">
                <p className="font-bold text-black-200">{user.fullName}</p>
                <div className="flex">
                    <MdCancel className="mr-3 w-7 h-7 text-black cursor-pointer transition duration-300 ease-in-out transform hover:scale-110" onClick={handleDeleteFriend}/>
                    <IoIosCheckmarkCircle className="mr-7 w-7 h-7 text-black cursor-pointer transition duration-300 ease-in-out transform hover:scale-110" onClick={handleAcceptFriend}/>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </div>
    );
};
