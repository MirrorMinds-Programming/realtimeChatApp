import { IoMdPersonAdd } from 'react-icons/io';
import { useSocketContext } from "../../context/SocketContext";
import useSendFriendRequest from "../../hooks/useSendFriendRequest.js";
import { useEffect ,useState} from 'react';
import { HiDotsHorizontal } from "react-icons/hi";

const User = ({ user, Me,lastIdx }) => {
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);

    // Initialize the useSendFriendRequest hook
    const { sendFriendRequest } = useSendFriendRequest(); // Destructure the function from the hook

    const [isRequested , setIsRequested ] = useState(false);


    useEffect(() => {
        console.log("Me       :  ",Me);
		setIsRequested(Me.sentRequests.includes(user._id));
	},[user._id,Me.sentRequests,Me]);


    // Function to handle the click event of the person add button
    const handleAddFriend = async () => { // Make the function asynchronous if needed
        try {
            // Call the sendFriendRequest function with the user ID
            await sendFriendRequest(user._id); // Await if sendFriendRequest returns a promise
            // Optionally, you can handle success here (e.g., show a success toast)
        } catch (error) {
            // Handle errors here (e.g., show an error toast)
        }
    };
    return (
        <div className={`flex items-center justify-between py-4  ${!isRequested ? 'hover:bg-pink-200' : ''}`}>
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className='w-12 rounded-full ml-7'>
                    <img src={user.profilePic} alt='user avatar' />
                </div>
            </div>

            <div className="flex flex-1 items-center justify-between ml-10">
                <p className="font-bold text-black-200">{user.fullName}</p>

                <div>
                    {isRequested ? (
                        <HiDotsHorizontal className="mr-7 w-5 h-5 text-black" />
                    ) : (
                        <IoMdPersonAdd className="mr-7 w-5 h-5 text-black cursor-pointer transition duration-300 ease-in-out transform hover:scale-110" onClick={handleAddFriend}/>
                    )}
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </div>
    );
};

export default User;
