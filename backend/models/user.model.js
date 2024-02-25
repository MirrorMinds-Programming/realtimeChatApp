import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"], // certain values
		},
		profilePic: {
			type: String,
			default: "",
		},
		friends:[
			{
			   type: mongoose.Schema.Types.ObjectId,
			   default:[],
			}
		],
		friendRequests:[
			{
			   type: mongoose.Schema.Types.ObjectId,
			   default:[],
			}
		],
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema); // User should be singular

export default User;

