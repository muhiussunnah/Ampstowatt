import os
import re

directory = r"d:\Git\ampstowatts\Ampstowatt"

# 1. Remove redundant header link
link_target = '<a href="/#calculator" class="premium-nav-link">Amps to Watts</a>'

# 2. Hex/RGB replacements
hex_replacements = [
    (re.compile(r'#00e5ff', re.IGNORECASE), '#10b981'),
    (re.compile(r'#33ebff', re.IGNORECASE), '#34d399'),
    (re.compile(r'rgba\(\s*0\s*,\s*229\s*,\s*255', re.IGNORECASE), 'rgba(16, 185, 129')
]

# 3. White background eradication
bg_regex = re.compile(r'background(?:-color)?\s*:\s*(?:#ffffff|#fff|white|#f8f9fa)(?![a-zA-Z0-9])', re.IGNORECASE)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        try:
            content = f.read()
        except UnicodeDecodeError:
            return False

    original = content

    # Apply link removal
    content = content.replace(link_target, '')

    # Apply hex replacements
    for pattern, repl in hex_replacements:
        content = pattern.sub(repl, content)

    # Apply white background eradication
    # e.g., background: #fff -> background: var(--bg-surface)
    # We must preserve any !important or other text that follows
    # Wait, simple substitution is:
    content = bg_regex.sub('background: var(--bg-surface)', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

modified_count = 0
for root, dirs, files in os.walk(directory):
    if '.git' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.css', '.js')):
            filepath = os.path.join(root, file)
            if process_file(filepath):
                modified_count += 1
                print(f"Modified: {filepath}")

print(f"Total files modified: {modified_count}")
