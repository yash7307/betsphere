export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BN4yKFEd.js",app:"_app/immutable/entry/app.D4uYvAWW.js",imports:["_app/immutable/entry/start.BN4yKFEd.js","_app/immutable/chunks/DWk2YDOh.js","_app/immutable/chunks/Ce0mKzmf.js","_app/immutable/chunks/ByzQFigZ.js","_app/immutable/entry/app.D4uYvAWW.js","_app/immutable/chunks/Ce0mKzmf.js","_app/immutable/chunks/D36yUUK9.js","_app/immutable/chunks/ByzQFigZ.js","_app/immutable/chunks/BE6PreZr.js","_app/immutable/chunks/Cv60vv5O.js","_app/immutable/chunks/DnrwSsvx.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/in-play",
				pattern: /^\/in-play\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/in-play/[matchId]",
				pattern: /^\/in-play\/([^/]+?)\/?$/,
				params: [{"name":"matchId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/my-bets",
				pattern: /^\/my-bets\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
