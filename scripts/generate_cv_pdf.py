import json
import textwrap
import unicodedata
from pathlib import Path

PAGE_WIDTH = 612
PAGE_HEIGHT = 792
MARGIN_X = 72
MARGIN_TOP = 72
MARGIN_BOTTOM = 72

FONT_BODY = "F1"
FONT_BOLD = "F2"

MAX_CHARS_BY_SIZE = {
    10: 100,
    11: 90,
    12: 82,
    14: 72,
    16: 64,
    18: 58,
}


def normalize_text(text: str) -> str:
    text = (
        text.replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2019", "'")
        .replace("\u201c", "\"")
        .replace("\u201d", "\"")
        .replace("\u2026", "...")
    )
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    return text


def escape_pdf(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


class PDFBuilder:
    def __init__(self) -> None:
        self.pages = []
        self._start_page()

    def _start_page(self) -> None:
        self.current_y = PAGE_HEIGHT - MARGIN_TOP
        self.current_page_lines = []

    def _commit_page(self) -> None:
        self.pages.append("\n".join(self.current_page_lines))
        self._start_page()

    def _ensure_space(self, line_height: float) -> None:
        if self.current_y - line_height < MARGIN_BOTTOM:
            self._commit_page()

    def add_line(self, text: str, size: int = 11, bold: bool = False, spacing: int = 4) -> None:
        text = normalize_text(text)
        if not text:
            self.current_y -= size + spacing
            return
        font = FONT_BOLD if bold else FONT_BODY
        max_chars = MAX_CHARS_BY_SIZE.get(size, 90)
        for line in textwrap.wrap(text, width=max_chars):
            self._ensure_space(size + spacing)
            escaped = escape_pdf(line)
            self.current_page_lines.append(
                f"BT /{font} {size} Tf 1 0 0 1 {MARGIN_X} {self.current_y:.2f} Tm ({escaped}) Tj ET"
            )
            self.current_y -= size + spacing

    def add_heading(self, text: str) -> None:
        self.add_line(text, size=14, bold=True, spacing=8)

    def add_subheading(self, text: str) -> None:
        self.add_line(text, size=12, bold=True, spacing=6)

    def add_bullets(self, items, size: int = 11) -> None:
        for item in items:
            bullet_text = f"- {item}"
            self.add_line(bullet_text, size=size, bold=False, spacing=3)

    def finalize(self) -> list:
        if self.current_page_lines:
            self.pages.append("\n".join(self.current_page_lines))
        return self.pages


class PDFWriter:
    def __init__(self) -> None:
        self.objects = []

    def add_object(self, content: str) -> int:
        self.objects.append(content)
        return len(self.objects)

    def write(self, output_path: Path, pages_content: list) -> None:
        font_body = self.add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
        font_bold = self.add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

        page_objects = []
        content_objects = []

        for content in pages_content:
            stream_data = content.encode("utf-8")
            stream_obj = (
                f"<< /Length {len(stream_data)} >>\nstream\n{content}\nendstream"
            )
            content_obj_id = self.add_object(stream_obj)
            content_objects.append(content_obj_id)

        pages_kids = []
        for content_obj_id in content_objects:
            page_obj = (
                f"<< /Type /Page /Parent 3 0 R /MediaBox [0 0 {PAGE_WIDTH} {PAGE_HEIGHT}] "
                f"/Resources << /Font << /{FONT_BODY} {font_body} 0 R /{FONT_BOLD} {font_bold} 0 R >> >> "
                f"/Contents {content_obj_id} 0 R >>"
            )
            page_obj_id = self.add_object(page_obj)
            page_objects.append(page_obj_id)
            pages_kids.append(f"{page_obj_id} 0 R")

        pages_obj = f"<< /Type /Pages /Kids [{' '.join(pages_kids)}] /Count {len(page_objects)} >>"
        pages_id = self.add_object(pages_obj)

        catalog_obj = f"<< /Type /Catalog /Pages {pages_id} 0 R >>"
        catalog_id = self.add_object(catalog_obj)

        # Reorder objects to keep Catalog as object 1 and Pages as object 2
        # We built fonts/contents/pages first, so rebuild in correct order.
        objects = [
            self.objects[catalog_id - 1],
            self.objects[pages_id - 1],
        ]

        # Add remaining objects excluding those already added
        for i, obj in enumerate(self.objects, start=1):
            if i in (catalog_id, pages_id):
                continue
            objects.append(obj)

        # Write PDF
        offsets = []
        with output_path.open("wb") as f:
            f.write(b"%PDF-1.4\n")
            for idx, obj in enumerate(objects, start=1):
                offsets.append(f.tell())
                f.write(f"{idx} 0 obj\n".encode("utf-8"))
                f.write(obj.encode("utf-8"))
                f.write(b"\nendobj\n")

            xref_start = f.tell()
            f.write(f"xref\n0 {len(objects) + 1}\n".encode("utf-8"))
            f.write(b"0000000000 65535 f \n")
            for offset in offsets:
                f.write(f"{offset:010d} 00000 n \n".encode("utf-8"))

            f.write(
                (
                    "trailer\n"
                    f"<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
                    "startxref\n"
                    f"{xref_start}\n"
                    "%%EOF\n"
                ).encode("utf-8")
            )


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    data_dir = root / "src" / "data"

    experience = json.loads((data_dir / "experience.json").read_text())
    education = json.loads((data_dir / "education.json").read_text())
    certifications = json.loads((data_dir / "certifications.json").read_text())
    awards = json.loads((data_dir / "awards.json").read_text())

    builder = PDFBuilder()

    name = "Eduardo Sacahui"
    title = "AI Solution Architect & Technical Product Owner (Hands-on)"
    location = "Remote - Colombia / Guatemala (AMER)"
    email = "eduardo.sacahui@gmail.com"

    builder.add_line(name, size=18, bold=True, spacing=8)
    builder.add_line(title, size=12, bold=False, spacing=6)
    builder.add_line(f"{location} | {email}", size=10, bold=False, spacing=10)

    builder.add_heading("Professional Summary")
    summary = (
        "AI Solution Architect and Technical Product Owner focused on secure LLM systems, "
        "governed orchestration, and production-grade AI delivery. Lead cross-functional "
        "execution for executive decision-support platforms, translating stakeholder feedback "
        "into reliable product increments, structured AI workflows, and measurable business outcomes."
    )
    builder.add_line(summary, size=11, bold=False, spacing=8)

    builder.add_heading("Experience")
    for exp in experience[:6]:
        role_line = f"{exp['role']} - {exp['company']} | {exp['when']}"
        builder.add_subheading(role_line)
        highlights = exp.get("highlights", [])[:3]
        builder.add_bullets(highlights, size=11)
        builder.add_line("", size=11, spacing=6)

    builder.add_heading("Education")
    for edu in education:
        edu_line = f"{edu['title']} - {edu['school']} ({edu['status']})"
        builder.add_line(edu_line, size=11, bold=False, spacing=4)

    builder.add_heading("Certifications")
    builder.add_line(", ".join(certifications[:10]), size=10, bold=False, spacing=6)

    if awards:
        builder.add_heading("Awards")
        for award in awards:
            builder.add_line(f"{award['title']} ({award['date']})", size=11, bold=False, spacing=4)

    pages = builder.finalize()
    writer = PDFWriter()
    output_path = root / "public" / "Eduardo_Sacahui_Resume.pdf"
    writer.write(output_path, pages)


if __name__ == "__main__":
    main()
