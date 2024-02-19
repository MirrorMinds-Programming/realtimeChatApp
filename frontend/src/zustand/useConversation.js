import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;



/*
Zustand is a state management library for React applications. 
It provides a simple and straightforward way to manage 
state in React components using a minimalistic API. 
Zustand is designed to be easy to understand and use 
while offering powerful features for managing application state.
*/