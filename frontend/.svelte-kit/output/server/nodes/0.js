

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.B-9H2-qB.js","_app/immutable/chunks/D36yUUK9.js","_app/immutable/chunks/Ce0mKzmf.js","_app/immutable/chunks/ByzQFigZ.js","_app/immutable/chunks/BE6PreZr.js","_app/immutable/chunks/DQAhVZKP.js","_app/immutable/chunks/DnrwSsvx.js","_app/immutable/chunks/DrwrpQH_.js","_app/immutable/chunks/BwdfllTw.js","_app/immutable/chunks/DWk2YDOh.js","_app/immutable/chunks/CYf0WGSw.js","_app/immutable/chunks/DQ9eD4W2.js","_app/immutable/chunks/FvBwHM7c.js","_app/immutable/chunks/BZrj67Xi.js"];
export const stylesheets = ["_app/immutable/assets/0.Ch4197iP.css"];
export const fonts = [];
