export const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const apiBaseUrl =
	process.env.REACT_APP_API_URL ?? "http://localhost:4000";
