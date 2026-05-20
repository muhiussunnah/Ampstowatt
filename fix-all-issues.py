"""
Fix three issues across the Ampstowatt site:
1. Remove 'Contact & Trust' section and DMCA badge from all HTML footers
2. (CSS handled separately)
3. (CSS handled separately)
"""
import os
import re
import glob

ROOT = r'd:\ampstowatts\Ampstowatt'

def remove_footer_trust(html):
    """Remove the entire footer-trust-section block from HTML."""
    # Match the full <section class="footer-trust-section" ...> ... </section> block
    pattern = r'\s*<section\s+class="footer-trust-section"[^>]*>.*?</section>\s*'
    result = re.sub(pattern, '\n', html, flags=re.DOTALL)
    return result

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        original = f.read()

    modified = remove_footer_trust(original)

    if modified != original:
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(modified)
        return True
    return False

# Find all HTML files
html_files = glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True)
html_files += glob.glob(os.path.join(ROOT, '*.html'))
# Deduplicate
html_files = list(set(os.path.normpath(f) for f in html_files))

changed = 0
for fpath in sorted(html_files):
    if process_file(fpath):
        print(f'  FIXED: {os.path.relpath(fpath, ROOT)}')
        changed += 1

print(f'\nDone. Modified {changed} of {len(html_files)} HTML files.')
