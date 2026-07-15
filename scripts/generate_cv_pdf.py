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
            "AI product and platform engineering leader who turns ambiguous workflows into governed, "
            "customer-facing AI systems. Combines product discovery, hands-on architecture, evaluation, "
            "secure delivery, operations, and human-centered adoption—connecting AI behavior and platform "
            "decisions to measurable business outcomes.",
            styles["BodySmall"],
        )
    )

    story += section("Selected AI product evidence", styles)
    evidence = [
        "<b>Executive AI Assistant Pilot:</b> 0→1 delivery across web, PWA, browser extension, and API surfaces with approval-gated actions.",
        "<b>LA Muni RAG:</b> public evidence-first Procedure Workflow Advisor MVP with citations, confidence, document checklists, gaps, and feedback controls.",
        "<b>AI Recruiting Copilot:</b> interactive product demo that exposes candidate evidence and preserves recruiter-controlled review.",
    ]
    story.extend(bullet(item, styles) for item in evidence)

    story += section("Experience", styles)
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
