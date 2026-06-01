import os
import glob

replacements = {
    "Ã—": "×",
    "âˆš": "√",
    "Ã·": "÷",
    "â€“": "–",
    "â‰ˆ": "≈",
    "Â²": "²",
    "Ã©": "é",
    "Ã¨": "è",
    "â »Â¹â ¹": "⁻¹⁹",
    "Â°": "°",
    "Â¹": "¹",
    "Â³": "³",
    "Â": " ",  # Sometimes non-breaking space gets mangled as just A-circumflex
    "â€™": "’",
    "â€œ": "“",
    "â€": "”"
}

def fix_mojibake(directory):
    count = 0
    patterns = ['**/*.html', '**/*.js']
    files_to_check = []
    
    for pattern in patterns:
        files_to_check.extend(glob.glob(os.path.join(directory, pattern), recursive=True))

    for filepath in files_to_check:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old_str, new_str in replacements.items():
                new_content = new_content.replace(old_str, new_str)
                
            # Extra sweep for lingering lone Â that might have been skipped or used as nbsp
            new_content = new_content.replace('Â ', ' ')

            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f"Fixed: {filepath}")
        except Exception as e:
            print(f"Error processing {filepath}: {e}")

    print(f"Finished. Fixed {count} files.")

if __name__ == "__main__":
    fix_mojibake(r"d:\Git\ampstowatts\Ampstowatt")
