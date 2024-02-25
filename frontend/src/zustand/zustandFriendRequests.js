import { create } from "zustand";

const zustandFriendRequests = create((set) => ({
	requests: [],
	setRequests: (requests) => set({ requests }),
}));

export default zustandFriendRequests;