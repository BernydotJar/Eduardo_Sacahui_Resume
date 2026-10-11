"""Generate the downloadable résumé PDF from the portfolio data files."""

import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
)


INK = colors.HexColor("#10231A")
MUTED = colors.HexColor("#50655B")
ACCENT = colors.HexColor("#137A4A")
RULE = colors.HexColor("#CDE5D6")
PAPER = colors.HexColor("#FBFDFB")


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def page_chrome(canvas, doc) -> None:
    width, height = LETTER
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, height - 0.12 * inch, width, 0.12 * inch, fill=1, stroke=0)
    canvas.setStrokeColor(RULE)
    canvas.line(doc.leftMargin, 0.46 * inch, width - doc.rightMargin, 0.46 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 0.27 * inch, "EDUARDO SACAHUI · AI PRODUCT & PLATFORM ENGINEERING")
    canvas.drawRightString(width - doc.rightMargin, 0.27 * inch, f"PAGE {doc.page}")
    canvas.restoreState()


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            "Name",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=27,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            "Role",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=13,
            textColor=ACCENT,
            alignment=TA_CENTER,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            "Contact",
            parent=styles["Normal"],
            fontSize=8.5,
            leading=11,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=12,
        )
    )
    styles.add(
        ParagraphStyle(
            "Section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12,
            textColor=ACCENT,
            spaceBefore=7,
            spaceAfter=5,
            borderColor=RULE,
            borderWidth=0,
            borderPadding=(0, 0, 3, 0),
        )
    )
    styles.add(
        ParagraphStyle(
            "BodySmall",
            parent=styles["BodyText"],
            fontSize=8.5,
            leading=11.6,
            textColor=INK,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            "Job",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11.5,
            textColor=INK,
            spaceBefore=4,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            "BulletSmall",
            parent=styles["BodyText"],
            fontSize=8.15,
            leading=10.7,
            leftIndent=11,
            firstLineIndent=-7,
            bulletIndent=2,
            textColor=INK,
            spaceAfter=2.5,
        )
    )
    styles.add(
        ParagraphStyle(
            "Compact",
            parent=styles["BodyText"],
            fontSize=7.8,
            leading=10.2,
            textColor=INK,
            spaceAfter=2.5,
        )
    )
    return styles


def section(title: str, styles) -> list:
    return [Paragraph(title.upper(), styles["Section"])]


def bullet(text: str, styles) -> Paragraph:
    return Paragraph(f"• {text}", styles["BulletSmall"])


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    data_dir = root / "src" / "data"
    output_path = root / "public" / "Eduardo_Sacahui_Resume.pdf"

    experience = load_json(data_dir / "experience.json")
    education = load_json(data_dir / "education.json")
    certifications = load_json(data_dir / "certifications.json")
    awards = load_json(data_dir / "awards.json")
    projects = {p["id"]: p for p in load_json(data_dir / "projects.json")}
    styles = build_styles()

    doc = BaseDocTemplate(
        str(output_path),
        pagesize=LETTER,
        title="Eduardo Sacahui — AI Product & Platform Engineering Leader",
        author="Eduardo Sacahui",
        subject="AI product, agentic platform, and engineering leadership résumé",
        leftMargin=0.58 * inch,
        rightMargin=0.58 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.58 * inch,
    )
    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        id="resume",
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    doc.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=page_chrome)])

    story = [
        Spacer(1, 0.06 * inch),
        Paragraph("Eduardo Sacahui", styles["Name"]),
        Paragraph("AI PRODUCT &amp; PLATFORM ENGINEERING LEADER", styles["Role"]),
        Paragraph(
            "Remote · Colombia / Guatemala (AMER) &nbsp;|&nbsp; "
            "eduardo.sacahui@gmail.com &nbsp;|&nbsp; linkedin.com/in/eduardosacahui &nbsp;|&nbsp; github.com/BernydotJar",
            styles["Contact"],
        ),
    ]

    story += section("Leadership profile", styles)
    story.append(
        Paragraph(
            "Client-facing AI product architect and hands-on engineer who turns ambiguous stakeholder needs into governed, "
            "AI products and automation platforms. Combines stakeholder discovery, problem framing, solution trade-offs, pilot evaluation, "
            "hands-on engineering, secure delivery, operations, and adoption—connecting technical and product "
            "decisions to concrete business outcomes.",
            styles["BodySmall"],
        )
    )

    story += section("Client discovery to delivery", styles)
    story.extend(
        bullet(item, styles) for item in [
            "<b>Frame:</b> Facilitate discovery with business and technical stakeholders; clarify workflows, constraints, and success criteria before choosing a solution.",
            "<b>Build and evaluate:</b> Translate needs into product scope, architecture, working pilots, human approval boundaries, tests, and release decisions.",
            "<b>Operate and improve:</b> Connect reliability, observability, costs, feedback, and adoption to business value; distinguish proven production operations from pilots.",
        ]
    )

    story += section("Selected AI product evidence", styles)
    evidence = [
        "<b>Executive AI Assistant Pilot:</b> Executive/EA workflow discovery and 0-to-1 product delivery across web, PWA, browser extension, and API surfaces with approval-gated actions.",
        "<b>LA Muni RAG:</b> Public evidence-first procedure workflow MVP; user guidance, cited sources, document checklists, and feedback controls.",
        "<b>Agentic engineering:</b> Controlled orchestration and evaluation patterns with schema contracts, deterministic checks, and independent review; not claimed as high-concurrency production scale.",
    ]
    story.extend(bullet(item, styles) for item in evidence)

    story += section("Selected product and transformation stories", styles)
    for project_id, label in [
        ("luma-learning-intelligence", "LUMA"),
        ("meridian-talent-intelligence", "Meridian"),
        ("argos-dotacion-operations", "ARGOS Dotacion"),
        ("lch-app-cloud-delivery", "LCH App Cloud"),
        ("graph-harness-engineering", "Graph Harness SDLC"),
        ("avianca-redispatch", "Avianca"),
        ("pepsi-finance-rpa", "Pepsi"),
        ("pentaho-to-powerbi", "Pentaho to Power BI"),
        ("microsoft-fabric-modernization", "Microsoft Fabric"),
    ]:
        p = projects[project_id]
        story.append(bullet(f"<b>{label}:</b> {p['summary']}", styles))

    story += section("Experience", styles)
    priority = ["Rice AI Center", "Onelink BPO — Colombia & Guatemala", "UiPath (United States)", "Haceb (via LCH Consulting)", "Fragomen", "Team International"]
    experience = sorted(experience, key=lambda exp: (exp['company'] not in priority, priority.index(exp['company']) if exp['company'] in priority else len(priority)))
    for exp in experience:
        job = Paragraph(
            f"{exp['role']} · {exp['company']} <font color='#50655B'>| {exp['when']}</font>",
            styles["Job"],
        )
        highlights = [bullet(item, styles) for item in exp.get("highlights", [])[:2]]
        story.append(KeepTogether([job, *highlights]))

    story += section("Education", styles)
    for item in education:
        story.append(
            Paragraph(
                f"<b>{item['title']}</b> · {item['school']} · {item['status']}",
                styles["Compact"],
            )
        )

    story += section("Credentials & recognition", styles)
    story.append(Paragraph(" · ".join(certifications), styles["Compact"]))
    for award in awards:
        story.append(Paragraph(f"<b>{award['title']}</b> · {award['date']}", styles["Compact"]))

    doc.build(story)
    print(f"Generated {output_path}")


if __name__ == "__main__":
    main()
