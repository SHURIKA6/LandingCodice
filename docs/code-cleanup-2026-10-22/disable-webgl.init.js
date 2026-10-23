// QA only: exercise the complete HTML fallback without an available WebGL context.
const originalGetContext = HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext = function (contextType, ...options) {
  if (['webgl', 'webgl2', 'experimental-webgl'].includes(contextType)) return null;
  return originalGetContext.call(this, contextType, ...options);
};
