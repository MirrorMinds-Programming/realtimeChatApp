import { BiLogOut } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import { MdNotificationAdd } from "react-icons/md";
import useLogout from "../../hooks/useLogout.js";

const LogoutButton = ({ handleAddButtonClick, handleInboxClick}) => {
	const { loading, logout } = useLogout();

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
						<MdNotificationAdd  className='w-6 h-6 text-white cursor-pointer mr-3' onClick={handleInboxClickInternal}/>
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