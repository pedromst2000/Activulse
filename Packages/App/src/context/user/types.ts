export type LoggedUser = {
	id: number;
	isNewUser: boolean;
	isAssessmentDone: boolean;
	fastFoodStatus: string;
	stressStatus: string;
	diet: string;
	username: string;
	points: number;
	avatar: string;
} | null;

export type UserContextProps = {
	loggedUser: LoggedUser | null;
	setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>;
	updateUser: (user: LoggedUser) => void;
	signOutExpired: () => void;
	signOut: () => void;
	exitApp: () => void;
};
