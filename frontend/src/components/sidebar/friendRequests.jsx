import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useGetFriendRequests from "../../hooks/useGetFriendRequests";
import useDeleteFriendRequests from "../../hooks/useDeleteFriendReq";
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
				
				<div key={user.user._id}>
                <User
                    user={user.user}
                    lastIdx={idx === requests.length - 1}
                />
				</div>
            ))}

            {loading && <span className='loading loading-spinner mx-auto'></span>}
        </div>
    );
};
export default FriendRequests;


const User = ({ user, lastIdx }) => {
    const { deleteFriendReqs } = useDeleteFriendRequests();
    
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);

	const HandleDeleteFriend = async () => { // Make the function asynchronous if needed
        try {
            // Call the sendFriendRequest function with the user ID
            console.log(user._id);
            await deleteFriendReqs(user._id); // Await if sendFriendRequest returns a promise
            // Optionally, you can handle success here (e.g., show a success toast)
        } catch (error) {
            // Handle errors here (e.g., show an error toast)
        }
    };
    
    const HandleAcceptFriend = async () => { // Make the function asynchronous if needed
        try {
            // Call the sendFriendRequest function with the user ID
            await deleteFriendReqs(user._id); // Await if sendFriendRequest returns a promise
            // Optionally, you can handle success here (e.g., show a success toast)
        } catch (error) {
            // Handle errors here (e.g., show an error toast)
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
                    <MdCancel className="mr-3 w-7 h-7 text-black cursor-pointer transition duration-300 ease-in-out transform hover:scale-110" onClick={HandleDeleteFriend}/>
                    <IoIosCheckmarkCircle className="mr-7 w-7 h-7 text-black cursor-pointer transition duration-300 ease-in-out transform hover:scale-110" onClick={HandleAcceptFriend}/>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </div>
    );
};
