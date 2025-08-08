// Wrapper to expose jweixin 1.0.0 as proper CommonJS/ESM default export
const g = (typeof globalThis !== 'undefined' ? globalThis : (typeof global !== 'undefined' ? global : this));
if (typeof g.window === 'undefined') g.window = g;
require('./index.js');
const wx = g.wx || g.jWeixin || {};
module.exports = wx;
Object.defineProperty(module.exports, '__esModule', { value: true });
Object.defineProperty(module.exports, 'default', { enumerable: false, value: wx });
