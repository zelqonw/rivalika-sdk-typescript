import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const workflows = join(root, ".github", "workflows");
const forkGuard =
  "github.event_name != 'pull_request' || github.event.pull_request.head.repo.full_name == github.repository";

describe("workflow runner security", () => {
  it("uses a hosted signing runner only for registry publication", () => {
    for (const name of readdirSync(workflows).filter((entry) =>
      entry.endsWith(".yml"),
    )) {
      const source = readFileSync(join(workflows, name), "utf8");
      let job = "";
      for (const line of source.split("\n")) {
        const match = line.match(/^  ([a-z-]+):$/);
        if (match) job = match[1];
        if (!line.trimStart().startsWith("runs-on:")) continue;
        if (name === "publish.yml" && job === "publish") {
          expect(line.trim()).toBe("runs-on: ubuntu-latest");
        } else {
          expect(line, `${name}: ${line.trim()}`).toContain("self-hosted");
        }
      }
    }
  });

  it("protects publication and resolves an immutable matching tag", () => {
    const source = readFileSync(join(workflows, "publish.yml"), "utf8");
    expect(source).toContain("environment: npm");
    expect(source).toContain("id-token: write");
    expect(source).toContain("ref: refs/tags/");
    expect(source).toContain("startsWith(github.ref, 'refs/tags/v')");
    expect(source).toContain('TAG="${RELEASE_TAG#v}"');
    expect(source).toContain('if [ "$TAG" != "$MANIFEST" ]');
  });

  it("does not execute fork pull request code", () => {
    const verify = readFileSync(join(workflows, "verify.yml"), "utf8");
    const contract = readFileSync(
      join(workflows, "discord-contract.yml"),
      "utf8",
    );
    expect(verify.split(forkGuard)).toHaveLength(3);
    expect(contract).toContain(forkGuard);
  });
});
