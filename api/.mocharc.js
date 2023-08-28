// # https://mochajs.org/#configuring-mocha-nodejs

module.exports = {
  "check-leaks": true,
  "enable-source-maps": true,
  exit: true,
  recursive: true,
  require: ["ts-node/register", "test/mocha-hooks.ts"],
  spec: ["test/**/*.spec.ts"],
  timeout: "10s",
  ui: "bdd",
};
