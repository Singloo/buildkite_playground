module.exports = function ({ env }) {
  return {
    babel: {
      plugins: ["babel-plugin-transform-typescript-metadata"],
    },
  };
};
