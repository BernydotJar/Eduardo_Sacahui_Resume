import re, unicodedata

def norm(s: str) -> str:
    s = unicodedata.normalize("NFKC", s).strip()
    return re.sub(r"\s+", " ", s)

def scope_from(text: str) -> str:
    t = text.lower()
    if any(k in t for k in ["google", "auth", "login", "user", "password", "pw"]):
        return "auth"
    if any(k in t for k in ["dummy data", "seed", "sample", "categories", "utilities", "groceries"]):
        return "data"
    if any(k in t for k in ["nextjs", "server", "render", "api", "html error"]):
        return "api"
    if any(k in t for k in ["screen", "navigate", "ui", "button", "layout", "main screen"]):
        return "ui"
    if any(k in t for k in ["config", "git", "script", "npm", "setup"]):
        return "config"
    if any(k in t for k in ["doc", "readme"]):
        return "docs"
    return "misc"

def type_from(text: str) -> str:
    t = text.lower()
    if re.search(r"\bfix|bug|error|issue|broken\b", t):
        return "fix"
    if re.search(r"\brefactor|restructure|cleanup\b", t):
        return "refactor"
    if re.search(r"\bfeat|add|implement|enable|seed|navigate\b", t):
        return "feat"
    if re.search(r"\bdocs?|readme\b", t):
        return "docs"
    if re.search(r"\bstyle|css|theme|layout\b", t):
        return "style"
    if re.search(r"\btest(s)?\b", t):
        return "test"
    return "chore"

CRED_PAT = re.compile(
    r"(?is)(api[\s_-]*key|token|secret|password|bearer|pw|pass)\b|[A-Za-z0-9_\-]{24,}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
)

def rewrite_message(orig_bytes: bytes) -> bytes:
    orig = orig_bytes.decode("utf-8", "ignore")
    raw  = norm(orig)
    low  = raw.lower()

    # Security first
    if CRED_PAT.search(orig):
        subject = "chore(security): remove sensitive credential from history"
        body = "Original message redacted for security."
        return f"{subject}\n\n{body}\n".encode("utf-8")

    # De-chatify
    low = re.sub(r"(?i)\bplease\b|\bkindly\b|\bcan you\b|\bjust\b|\bthanks?\b", "", low)
    low = re.sub(r"(?i)\blet\'?s\b|\bok\b|\bnow\b", "", low)
    low = re.sub(r"(?i)\bmake the following changes:? ?", "", low)
    low = re.sub(r"\s+", " ", low).strip()

    # Count bullets
    bullets = [ln for ln in orig.splitlines()
               if ln.strip().startswith(("-", "•", "*")) or re.match(r"^\d+\.", ln.strip())]
    n = len(bullets)

    # Rule hints
    rules = [
        (r"(?i)\bpush all to main\b", ("chore", "config", "push changes to main")),
        (r"(?i)\bcommit to upload\b", ("chore", "misc", "upload commit")),
        (r"(?i)\bamend(ing)? readme\b|\breadme\b", ("docs", "readme", "amend content")),
        (r"(?i)\bdummy data|seed\b", ("feat", "data", "seed app with sample data")),
        (r"(?i)\bafter clicking login.*navigate\b|\bnavigate to the main screen\b", ("feat", "auth", "navigate to main screen after login")),
        (r"(?i)\bdummy user\b|\buser and pw\b", ("feat", "auth", "add dummy user for local flow")),
        (r"(?i)\bpredefined categories|utilities|groceries|insurance|health care|transportation|savings|entertainment|personal care|property taxes|child", ("feat", "data", "add default expense categories")),
        (r"(?i)\bnextjs\b.*\berror\b", ("fix", "api", "resolve Next.js rendering error")),
        (r"(?i)\bgoogle\b.*\bauth\b", ("feat", "auth", "enable Google sign-in")),
        (r"(?i)\bupdate app\b", ("chore", "app", "general update")),
        (r"(?i)\binitial scaffold\b|\binitial commit\b", ("chore", "init", "initial scaffold")),
    ]

    subject = None
    for pat, (typ, scope, title) in rules:
        if re.search(pat, low):
            subject = f"{typ}({scope}): {title}"
            break

    if subject is None:
        typ = type_from(low)
        scope = scope_from(low)
        # Generic fallback with bullet count
        title = "apply change set" if n else (re.sub(r"[^a-z0-9 /:-]", "", low)[:72] or "update")
        if title == "apply change set" and n:
            title = f"apply {n}-item change set"
        subject = f"{typ}({scope}): {title}"

    if len(subject) > 72:
        subject = subject[:72]

    body = orig.strip()
    if len(body) > 4000:
        body = body[:4000] + "\n…(truncated)"
    return f"{subject}\n\nOriginal message:\n{body}\n".encode("utf-8")
