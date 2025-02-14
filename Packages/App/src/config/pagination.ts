interface FeedConfig {
	defaultPage: number;
	defaultLimit: number;
	maxLimit: number;
}

interface PaginationConfig {
	challenges: {
		feed: FeedConfig;
	};
	activities: {
		feed: FeedConfig;
	};
	recipes: {
		feed: FeedConfig;
	};
	premium: {
		activities: {
			feed: FeedConfig;
		};
		recipes: {
			feed: FeedConfig;
		};
	};
	favorites: {
		feed: FeedConfig;
	};
	badges: {
		feed: FeedConfig;
	};
	banners: {
		feed: FeedConfig;
	};
}

const paginationConfig: PaginationConfig = {
	challenges: {
		feed: {
			defaultPage: 1,
			defaultLimit: 6,
			maxLimit: 10,
		},
	},
	activities: {
		feed: {
			defaultPage: 1,
			defaultLimit: 6,
			maxLimit: 10,
		},
	},
	recipes: {
		feed: {
			defaultPage: 1,
			defaultLimit: 6,
			maxLimit: 10,
		},
	},
	premium: {
		activities: {
			feed: {
				defaultPage: 1,
				defaultLimit: 3,
				maxLimit: 6,
			},
		},
		recipes: {
			feed: {
				defaultPage: 1,
				defaultLimit: 3,
				maxLimit: 6,
			},
		},
	},
	favorites: {
		feed: {
			defaultPage: 1,
			defaultLimit: 4,
			maxLimit: 10,
		},
	},
	badges: {
		feed: {
			defaultPage: 1,
			defaultLimit: 4,
			maxLimit: 10,
		},
	},
	banners: {
		feed: {
			defaultPage: 1,
			defaultLimit: 2,
			maxLimit: 3,
		},
	},
};

export default paginationConfig;
