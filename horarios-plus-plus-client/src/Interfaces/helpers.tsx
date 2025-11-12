export const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const reachableApiUrl =
	typeof process !== "undefined" && process.env.REACT_APP_API_URL
		? process.env.REACT_APP_API_URL
		: import.meta.env?.VITE_API_URL ??
			internal_env?.REACT_APP_API_URL ??
			"HARD_FALLBACK";

declare const process: {
	env?: Record<string, string | undefined>;
};

declare const internal_env:
	| Record<string, string | undefined>
	| undefined;

export const apiBaseUrl =
	reachableApiUrl !== "HARD_FALLBACK"
		? reachableApiUrl
		: window.location.origin.replace(/\/$/, "").replace(
				/^(https?:\/\/[^/]+)(.*)$/i,
				(_, origin) => origin,
			);
