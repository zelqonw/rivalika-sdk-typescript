import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const workflows = join(root, ".github", "workflows");
const forkGuard =
  "github.event_name != 'pull_request' || github.event.pull_request.head.repo.full_name == github.repository";

describe("workflow runner security", () => {
  it("uses only the self-hosted runner pool", () => {
    for (const name of readdirSync(workflows).filter((entry) =>
      entry.endsWith(".yml"),
    )) {
      const source = readFileSync(join(workflows, name), "utf8");
      expect(source, name).not.toMatch(/runs-on:\s*ubuntu-/);
      for (const line of source
        .split("\n")
        .filter((entry) => entry.trimStart().startsWith("runs-on:"))) {
        expect(line, `${name}: ${line.trim()}`).toContain("self-hosted");
      }
    }
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
