export type LoggedUser = {
	// Debugging purposes
	username: string;
	email: string;
	// TODO: Add the rest of the user properties
};

export type UserContextProps = {
	loggedUser: LoggedUser | null;
	setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>;
};
