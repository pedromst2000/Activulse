interface Tokens {
	refreshExpiresIn: number;
	refreshExpiresInRememberMe: number;
}

const tokenSession: Tokens = {
	refreshExpiresIn: 1 * 60, // 1 minute in seconds
	refreshExpiresInRememberMe: 30 * 24 * 60 * 60, // 30 days in seconds
};

export default tokenSession;
