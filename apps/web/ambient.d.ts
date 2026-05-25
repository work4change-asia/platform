// @payloadcms/next exports ./css as a bare CSS file with no `types` entry in its
// package.json exports map. moduleResolution:NodeNext requires a types entry, so
// we declare the module here as an ambient side-effect-only import.
declare module "@payloadcms/next/css";
