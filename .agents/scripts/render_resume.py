from pathlib import Path

import fitz


source = Path("attached_assets/0_Ajay_Gaur_Resume_1790710987933.pdf")
output_dir = Path(".agents/outputs/resume-pages")
output_dir.mkdir(parents=True, exist_ok=True)

document = fitz.open(source)
print(f"pages={document.page_count}")
print(f"metadata={document.metadata}")

for index, page in enumerate(document):
    pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    output_path = output_dir / f"page-{index + 1}.png"
    pixmap.save(output_path)
    print(f"rendered={output_path} size={page.rect.width}x{page.rect.height}")

    text = page.get_text("text")
    text_path = output_dir / f"page-{index + 1}.txt"
    text_path.write_text(text, encoding="utf-8")
    print(f"text={text_path} chars={len(text)}")