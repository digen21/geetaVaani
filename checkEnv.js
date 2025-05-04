const { engines } = require("./package.json");
const semver = require("semver");

if (!semver.satisfies(process.version, engines.node)) {
  console.error(
    `❌ Invalid Node.js version. Required: ${engines.node}, Found: ${process.version}`
  );
  process.exit(1);
}
