"""Convert pillar-page CTA links (`<a>` styled as bordered buttons) to DLink."""
import re
import sys

FILES = [
    "src/components/AiMarketplaceCreators.tsx",
    "src/components/AiAgentForDevelopers.tsx",
    "src/components/AndroidAutomationPowerUser.tsx",
    "src/components/TerminalOnAndroid.tsx",
    "src/components/EnterpriseAiAgent.tsx",
    "src/components/PrivacyFirstAiAndroid.tsx",
    "src/components/StoryParts4to8.tsx",
    "src/components/SimplifiedLandingPage.tsx",
]

CTA_ATTR = 'className="inline-flex items-center justify-center px-8 py-4 border border-zinc-300 dark:border-zinc-700'
CLASS_RE = re.compile(
    r'className="inline-flex items-center justify-center px-8 py-4 border border-zinc-300 dark:border-zinc-700[^"]*"'
)
ANCHOR_RE = re.compile(r"<a\b(?:(?!</a>).)*?</a>", re.DOTALL)

def transform(match: re.Match) -> str:
    block = match.group(0)
    if CTA_ATTR not in block:
        return block
    block = CLASS_RE.sub('className="d-btn-lg"', block)
    block = re.sub(r"^<a\b", "<DLink", block)
    block = re.sub(r"</a>$", "</DLink>", block)
    return block

for path in FILES:
    with open(path, "r", encoding="utf-8", newline="") as f:
        src = f.read()
    new_src, n = ANCHOR_RE.subn(transform, src)
    if n == 0:
        print(f"{path}: no CTA links found")
        continue
    if "DLink" in new_src and "from \"./ui/drawably\"" not in new_src:
        # insert import after the last import line
        lines = new_src.splitlines(keepends=True)
        last_import = max(
            (i for i, l in enumerate(lines) if l.startswith("import ")),
            default=-1,
        )
        indent = ""
        lines.insert(last_import + 1, f'{indent}import {{ DLink }} from "./ui/drawably";\n')
        new_src = "".join(lines)
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(new_src)
    print(f"{path}: converted {n} CTA link(s)")
