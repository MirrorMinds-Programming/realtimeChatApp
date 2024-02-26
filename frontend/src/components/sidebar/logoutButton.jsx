import { BiLogOut } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import useLogout from "../../hooks/useLogout.js";
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useSocketContext } from "../../context/SocketContext.jsx";

const LogoutButton = ({ handleAddButtonClick, handleInboxClick}) => {
	const { loading, logout } = useLogout();
	const [number, setNumber] = useState(0);
	const { socket } = useSocketContext();

    useEffect(() => {
		const getNumFriendRequests = async () => {
			try {
				const res = await fetch("/api/users/getNumFriendRequests");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				//console.log(data);
				setNumber(data);
			} catch (error) {
				toast.error(error.message);
			}
		};
	
		getNumFriendRequests();

	}, []); // Empty dependency array because this effect doesn't depend on any props or state
	

	useEffect(() => {
		socket?.on("getNumFriendRequests", (newRequest) => {
			setNumber(newRequest);
		});

		return () => socket?.off("getNumFriendRequests"); 
	}, [socket, number, setNumber]);




	const handleAddButtonClickInternal  = () => {
		handleAddButtonClick(); // Call the parent function to handle the click event
	};

	const handleInboxClickInternal  = () => {
		handleInboxClick(); // Call the parent function to handle the click event
	};

	return (
		<div className='mt-auto'>
			{!loading ? (
				<div className="flex justify-between">	
					<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
					<div className="flex ">
						
					{number !== 0 && (
						<p className="absolute transform translate-x-3 -translate-y-1/4 bg-red-500 bg-opacity-90 text-white w-5 h-5 font-bold text-xs rounded-full flex items-center justify-center">
							+{number}
						</p>
					)}
						<IoIosNotifications className='w-6 h-6 text-white cursor-pointer mr-3' onClick={handleInboxClickInternal}/>
						<MdAddCircleOutline className='w-6 h-6 text-white cursor-pointer' onClick={handleAddButtonClickInternal} />
					</div>
				</div>
				) : (
				<span className='loading loading-spinner'></span>
			)}			
		</div>
	);
};
export default LogoutButton;