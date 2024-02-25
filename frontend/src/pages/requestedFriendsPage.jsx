import FriendRequests from "../components/sidebar/friendRequests.jsx"
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const RequestedFriendsPage  = () => { 
	return (
		<div className='md:min-w-[450px] flex flex-col relative h-[700px] overflow-y-auto'>
            <FriendRequests />
            <Link to='/signup'>
                <IoIosArrowBack className='w-6 h-6 text-black cursor-pointer absolute bottom-0 left-0 m-4' />
            </Link>
            
        </div>
	);
};
export default RequestedFriendsPage;
