export default function getCommit() {
  const { execSync } = require("child_process");
  try {
    const commitHash = execSync("git rev-parse HEAD").toString().trim();
    return commitHash;
  } catch (error) {
    console.error("Error getting commit hash:", error);
  }
}
