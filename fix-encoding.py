# Fix double-encoded UTF-8 in index.html
# Strategy: strip BOM, then encode to cp1252 and decode as UTF-8
import os

filepath = r'd:\ampstowatts\Ampstowatt\index.html'

with open(filepath, 'r', encoding='utf-8-sig') as f:  # utf-8-sig strips BOM
    text = f.read()

print(f"Read {len(text):,} characters")

# Show some of the corrupted patterns for diagnostics
diag_patterns = [
    '\u00c3\u0097',   # Ã— (should be ×)
    '\u00c3\u00a8',   # Ã¨
    '\u00c3\u00a9',   # Ã©
    '\u00c2\u00b2',   # Â² (should be ²)
]
for p in diag_patterns:
    if p in text:
        print(f"  Found mojibake pattern: {repr(p)}")

try:
    # Strip BOM then reverse double-encoding
    fixed = text.encode('cp1252').decode('utf-8')
    
    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        f.write(fixed)
    
    print(f"SUCCESS: Fixed encoding via cp1252 roundtrip")
    print(f"New file size: {os.path.getsize(filepath):,} bytes")
    
    # Verify
    with open(filepath, 'r', encoding='utf-8') as f:
        verify = f.read()
    
    checks = {
        'multiplication': '\u00d7',
        'em dash': '\u2014',
        'lightning': '\u26a1',
        'square root': '\u221a',
        'superscript 2': '\u00b2',
    }
    for name, char in checks.items():
        status = 'OK' if char in verify else 'MISS'
        print(f"  {status}: {name}")

except UnicodeEncodeError as e:
    print(f"cp1252 encode failed at position {e.start}: char {repr(e.object[e.start])}")
    print("Trying chunk-by-chunk approach...")
    
    # Process in chunks, skipping chars that can't map to cp1252
    result = []
    i = 0
    while i < len(text):
        # Try increasingly larger chunks
        chunk_end = min(i + 4096, len(text))
        chunk = text[i:chunk_end]
        try:
            decoded = chunk.encode('cp1252').decode('utf-8')
            result.append(decoded)
            i = chunk_end
        except (UnicodeEncodeError, UnicodeDecodeError):
            # Try char by char
            try:
                decoded = text[i].encode('cp1252').decode('utf-8', errors='replace')
                result.append(decoded)
            except (UnicodeEncodeError, UnicodeDecodeError):
                result.append(text[i])  # Keep as-is
            i += 1
    
    fixed = ''.join(result)
    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        f.write(fixed)
    
    print(f"Done via chunk approach. New size: {os.path.getsize(filepath):,} bytes")
