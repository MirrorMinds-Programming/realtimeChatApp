import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sounds/notification.mp3";
import zustandFriendRequests from "../zustand/zustandFriendRequests";


const useListenFriendRequests = () => {
	const { socket } = useSocketContext();
	const { requests, setRequests } = zustandFriendRequests();

	useEffect(() => {
		socket?.on("newFriendRequest", (newRequest) => {
			const sound = new Audio(notificationSound);
			sound.play();
            setRequests([...requests, newRequest]);
		});

		return () => socket?.off("newFriendRequest"); // !!! it is important, you are not listening this event more than once, bunu kyomazsan kullanıcı sayısı kadar ses duyarsın
	}, [socket,requests,setRequests]);
};
export default useListenFriendRequests; 