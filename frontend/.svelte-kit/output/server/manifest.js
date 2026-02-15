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
		client: {start:"_app/immutable/entry/start.DDK8ssrX.js",app:"_app/immutable/entry/app.Cig7Gsil.js",imports:["_app/immutable/entry/start.DDK8ssrX.js","_app/immutable/chunks/CCxuo0ZM.js","_app/immutable/chunks/DnFH8SKn.js","_app/immutable/chunks/CtwXb_Tf.js","_app/immutable/entry/app.Cig7Gsil.js","_app/immutable/chunks/DnFH8SKn.js","_app/immutable/chunks/C9wfIlVV.js","_app/immutable/chunks/CtwXb_Tf.js","_app/immutable/chunks/Ioco7Mp_.js","_app/immutable/chunks/DgSR-UYO.js","_app/immutable/chunks/CJhbeq3V.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
