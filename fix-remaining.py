# Fix remaining replacement characters in index.html
import os

filepath = r'd:\ampstowatts\Ampstowatt\index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Count replacement chars before
before_count = text.count('\ufffd')
print(f"Found {before_count} replacement characters")

# Line 81: "P = 3 ?? PF ?? I ?? V(L-N)" -> should use multiplication sign
# Line 82: "Amp-hours ?? Voltage", "100 ?? 12", "(mAh ?? 1000) ?? V"
# Line 84: "Voltage ?? Current"
# Line 85: "V??I", "S? = P? + Q?" -> S^2 = P^2 + Q^2
# Line 723: "??? commonly" -> em dash, "10^-19" superscripts
# Line 724: "Andre-Marie Ampere" accented chars
# Line 935: "S? = P? + Q?", "P ?? S"
# Line 936: "30?C (86?F)", "40?C", "75?C", "50?C"

replacements = [
    # Line 81 - three-phase formula: "3 \ufffd\ufffd PF \ufffd\ufffd I \ufffd\ufffd V"
    ('3 \ufffd\ufffd PF \ufffd\ufffd I \ufffd\ufffd V(L-N)', '3 \u00d7 PF \u00d7 I \u00d7 V(L-N)'),
    
    # Line 82 - amp hours: "Amp-hours ?? Voltage"
    ('Amp-hours \ufffd\ufffd Voltage', 'Amp-hours \u00d7 Voltage'),
    ('100 \ufffd\ufffd 12', '100 \u00d7 12'),
    ('mAh \ufffd\ufffd 1000) \ufffd\ufffd V', 'mAh \u00f7 1000) \u00d7 V'),
    
    # Line 84 - voltage x current
    ('Voltage \ufffd\ufffd Current', 'Voltage \u00d7 Current'),
    
    # Line 85 - power triangle
    ('(V\ufffd\ufffdI)', '(V\u00d7I)'),
    ('S\ufffd = P\ufffd + Q\ufffd, and PF = P \ufffd\ufffd S', 'S\u00b2 = P\u00b2 + Q\u00b2, and PF = P \u00f7 S'),
    
    # Line 723 - em dashes and superscript
    ('\ufffd\ufffd\ufffd commonly shortened to amp \ufffd\ufffd\ufffd is', '\u2014 commonly shortened to amp \u2014 is'),
    ('\ufffd\ufffd 10\u207b\ufffd\u2079', '\u00d7 10\u207b\u00b9\u2079'),
    
    # Line 724 - accented characters
    ('Andr\ufffd-Marie Amp\ufffdre', 'Andr\u00e9-Marie Amp\u00e8re'),
    
    # Line 935 - power triangle again
    ('S\ufffd = P\ufffd + Q\ufffd, and PF = P \ufffd\ufffd S', 'S\u00b2 = P\u00b2 + Q\u00b2, and PF = P \u00f7 S'),
    
    # Line 936 - degree symbol
    ('30\ufffdC (86\ufffdF)', '30\u00b0C (86\u00b0F)'),
    ('40\ufffdC', '40\u00b0C'),
    ('75\ufffdC', '75\u00b0C'),
    ('50\ufffdC', '50\u00b0C'),
]

fixed = text
total = 0
for old, new in replacements:
    count = fixed.count(old)
    if count > 0:
        fixed = fixed.replace(old, new)
        total += count
        print(f"  Fixed {count}x: {repr(old[:40])} -> {repr(new[:40])}")
    else:
        print(f"  Not found: {repr(old[:40])}")

with open(filepath, 'w', encoding='utf-8', newline='') as f:
    f.write(fixed)

after_count = fixed.count('\ufffd')
print(f"\nDone! Replacements applied: {total}")
print(f"Remaining replacement chars: {after_count}")
print(f"File size: {os.path.getsize(filepath):,} bytes")
