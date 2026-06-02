import os
import re

directory = r"d:\Git\ampstowatts\Ampstowatt"

# Matches <script ... data-auto-seo-schema>...</script> across multiple lines
schema_regex = re.compile(r'<script\s+type="application/ld\+json"\s+data-auto-seo-schema\s*>.*?</script>\s*', re.IGNORECASE | re.DOTALL)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        try:
            content = f.read()
        except UnicodeDecodeError:
            return False

    original = content
    content = schema_regex.sub('', content)

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
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            if process_file(filepath):
                modified_count += 1
                # print(f"Modified: {filepath}")

print(f"Removed redundant schema from {modified_count} files.")
