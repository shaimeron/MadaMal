module.exports = {
  apps : [{
    name: "MADAMAL SERVER",
    script: "./dist/src/server.js",
    env_production: {
    NODE_ENV: "production"
  }
  }]
};
