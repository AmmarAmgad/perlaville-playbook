// Publishes the static build in out/ to the gh-pages branch, which GitHub Pages
// serves ("Deploy from a branch"). Used by `npm run deploy` after the build.
//
// Clones gh-pages into a temporary folder, replaces its contents with out/,
// commits and pushes. History is kept; nothing is force-pushed.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "out");
const git = (args, cwd = root) =>
  execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();

if (!fs.existsSync(path.join(outDir, "index.html"))) {
  console.error("publish: out/index.html not found — run `npm run build` first.");
  process.exit(1);
}

const remote = git(["remote", "get-url", "origin"]);
const source = git(["rev-parse", "--short", "HEAD"]);
const dirty = git(["status", "--porcelain"]) !== "";
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "perlaville-gh-pages-"));

try {
  git(["clone", "--quiet", "--depth", "1", "--branch", "gh-pages", remote, tmp]);

  for (const entry of fs.readdirSync(tmp)) {
    if (entry !== ".git") fs.rmSync(path.join(tmp, entry), { recursive: true, force: true });
  }
  fs.cpSync(outDir, tmp, { recursive: true });
  // Without this, GitHub's Jekyll step drops folders starting with "_" (like _next).
  fs.writeFileSync(path.join(tmp, ".nojekyll"), "");

  git(["config", "core.autocrlf", "false"], tmp);
  git(["add", "--all"], tmp);
  if (git(["status", "--porcelain"], tmp) === "") {
    console.log("publish: live site already matches this build — nothing to push.");
  } else {
    const message = `Publish site build from main @ ${source}${dirty ? " (with uncommitted changes)" : ""}`;
    git(["commit", "--quiet", "-m", message], tmp);
    git(["push", "--quiet", "origin", "gh-pages"], tmp);
    console.log(`publish: pushed to gh-pages (${message}). The live site updates in about a minute.`);
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
