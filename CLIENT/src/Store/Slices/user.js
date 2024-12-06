import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: "",
	email:"",
	isLogged: false,
	msg: "",
	role: "user",
	authError: null,
	id: null, 
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login(state, action) { 
			state.username = action.payload.user.username;
			state.isLogged = action.payload.isLogged;
			state.email = action.payload.user.email,
			state.role = action.payload.user.role || "user";
			state.authError = null;
			state.id = action.payload.user.id;
		},
		loginFailed(state, action) {
			state.authError = action.payload.error;
		},
		logout(state, action) {
			state.username = "";
			state.isLogged = action.payload.isLogged;
			state.role = "user";
		},
		setLoading(state, action) {
			state.isLoading = action.payload;
		},
		setMsg(state, action) {
			state.msg = action.payload;
		},
		updateField(state, action) {
			state.username = action.payload.user.username;
			state.email = action.payload.user.email;

		},
		deleteUser(state, action) { 
			state.username = "";
			state.email = "";
			state.isLogged = false;
			state.role = "user";
			state.msg = action.payload.msg || "Votre compte a été supprimé.";
		},
		
	},
});

export const {
	login,
	loginFailed,
	logout,
	updateField,
	setMsg,
	setLoading,
	deleteUser,
} = userSlice.actions;


export default userSlice.reducer;