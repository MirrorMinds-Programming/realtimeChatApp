//import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
//import Home from "./pages/home/home";
import Login from "./pages/login/login";
//import SignUp from "./pages/signup/signup";
//import { Toaster } from "react-hot-toast";
//import { useAuthContext } from "./context/AuthContext";

function App() {
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Login />
		</div>
	);
}

export default App;
