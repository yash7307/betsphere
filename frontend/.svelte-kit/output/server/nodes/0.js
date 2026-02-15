

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": false
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CWSLvwal.js","_app/immutable/chunks/C9wfIlVV.js","_app/immutable/chunks/DnFH8SKn.js","_app/immutable/chunks/CtwXb_Tf.js","_app/immutable/chunks/Ioco7Mp_.js","_app/immutable/chunks/BALKUtmy.js","_app/immutable/chunks/CJhbeq3V.js","_app/immutable/chunks/CCxuo0ZM.js","_app/immutable/chunks/Dhn5PuYk.js","_app/immutable/chunks/OEWW7EkX.js","_app/immutable/chunks/CVe3KNbn.js","_app/immutable/chunks/BU0SJ94d.js","_app/immutable/chunks/D3qfxYzN.js","_app/immutable/chunks/FDVeO_LD.js"];
export const stylesheets = ["_app/immutable/assets/0.Ch4197iP.css"];
export const fonts = [];
