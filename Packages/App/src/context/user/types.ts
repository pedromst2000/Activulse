export type LoggedUser = {
	id: number;
	isNewUser: boolean;
	isAssessmentDone: boolean;
	fastFoodStatus: string;
	stressStatus: string;
	username: string;
	points: number;
	avatar: string;
};

export type UserContextProps = {
	loggedUser: LoggedUser | null;
	setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser | null>>;
};
