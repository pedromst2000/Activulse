import { LoggedUser } from '../context/user/types';
import Onboarding from '../screens/Onboarding';
import Home from '../screens/Home';
import { useEffect } from 'react';
import AssessmentRiskStack from './AssessmentRisk';

/**
 * A utility function that acts as a guard clause for navigation.
 * It checks if a user must be logged in and if they are currently logged in,
 * and returns the appropriate destination component based on the conditions.
 *
 * @param mustBeLogged - A boolean indicating whether the user must be logged in.
 * @param destiny - The destination component to be returned if the conditions are met.
 * @param loggedUser - The currently logged in user or null if no user is logged in.
 * @returns The destination component or fallback component based on the conditions.
 */

const guardClause = (
	mustBeLogged: boolean,
	destiny: React.FC<any>,
	loggedUser: LoggedUser | null,
): React.FC => {
	useEffect(() => {
		console.log('loggedUser guardClause:', loggedUser);
	}, []);

	if (mustBeLogged && !loggedUser) {
		return Onboarding; // FallBack if not logged
	}

	if (!mustBeLogged && loggedUser && loggedUser.isNewUser === true) {
        return AssessmentRiskStack; // FallBack if logged
    }

    if (!mustBeLogged && loggedUser && loggedUser.isNewUser === false && loggedUser.isAssessmentDone === false) {
        
    }

	return destiny;
};

export default guardClause;
