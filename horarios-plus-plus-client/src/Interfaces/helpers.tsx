export const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
declare const process: {
	env: {
		REACT_APP_API_URL?: string;
	};
};

const envApiUrl =
	process.env.REACT_APP_API_URL ||
		(import.meta as any)?.env?.VITE_API_URL;

export const apiBaseUrl =
	envApiUrl && envApiUrl.trim().length > 0
		? envApiUrl
		: window.location.origin.replace(/\/$/, "");
