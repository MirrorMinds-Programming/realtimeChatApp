import { BiLogOut } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
import useLogout from "../../hooks/useLogout.js";

const LogoutButton = ({ handleAddButtonClick }) => {
	const { loading, logout } = useLogout();

	const handleAddButtonClickInternal  = () => {
		handleAddButtonClick(); // Call the parent function to handle the click event
	};

	return (
		<div className='mt-auto'>
			{!loading ? (
				<div className="flex justify-between">	
					<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
					<MdAddCircleOutline className='w-6 h-6 text-white cursor-pointer' onClick={handleAddButtonClickInternal} />
				</div>
				) : (
				<span className='loading loading-spinner'></span>
			)}			
		</div>
	);
};
export default LogoutButton;