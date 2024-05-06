module.exports = function override(config, env) {
  // Do any customizations to config here

  // Important: return the modified config
  config.resolve = {
    fallback: {
      fs: false, // fs module is not needed in the browser
      path: false, // path module is not needed in the browser
      crypto: false, // crypto might be needed for randomness, consider polyfilling if issues arise
    },
  };
  return config;
};
