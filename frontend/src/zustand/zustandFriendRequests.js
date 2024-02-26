import { create } from "zustand";

const zustandFriendRequests = create((set) => ({
	requests: [],
	setRequests: (requests) => set({ requests }),
	sentRequests: [],
	setSentRequests: (sentRequests) => set({ sentRequests }),
}));

export default zustandFriendRequests;