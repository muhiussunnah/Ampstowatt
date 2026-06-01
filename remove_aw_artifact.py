import os
import re

root_dir = 'd:/ampstowatts'

count = 0
for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except UnicodeDecodeError:
                with open(filepath, 'r', encoding='latin1') as f:
                    content = f.read()
            
            original = content
            
            # The A/W artifact is usually inside <div class="section-divider"> or <div class="topic-icon">A/W</div>
            # Let's remove the whole section divider that contains A/W
            # And also remove <div class="topic-icon">A/W</div> anywhere it exists
            
            # Remove section divider containing A/W
            content = re.sub(r'<div class="section-divider"[^>]*>\s*<div class="icon-circle"[^>]*>A/W</div>.*?</div>', '', content, flags=re.DOTALL)
            
            # Remove isolated topic icons
            content = re.sub(r'<div class="topic-icon">A/W</div>', '', content)
            
            if original != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f"Removed A/W artifact from {count} files.")
