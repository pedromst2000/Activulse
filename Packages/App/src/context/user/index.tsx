import React, { PropsWithChildren, createContext, useMemo, useState } from 'react';
import { LoggedUser, UserContextProps } from './types';


const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<PropsWithChildren> = ({ children }): React.JSX.Element => {
	const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

	const contextValue: UserContextProps = useMemo(
		() => ({
			loggedUser,
			setLoggedUser,
		}),
		[loggedUser, setLoggedUser],
	);

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

const useUserContext = (): UserContextProps => {
	const context = React.useContext(UserContext);

	if (context === undefined) {
		throw new Error('useUserContext must be used within a UserProvider');
	}

	return context;
};

export { UserProvider, useUserContext };
