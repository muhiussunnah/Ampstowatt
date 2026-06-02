import os
import re
import sys

# Directory to scan
WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_PATH = os.path.join(WORKSPACE_DIR, "index.html")

def extract_block(html_content, tag_name, class_attr=None):
    """
    Naively extract a top-level block from HTML.
    Assumes standard formatting and no nested tags of the exact same name
    unless handled by non-greedy matching.
    """
    if class_attr:
        pattern = re.compile(rf'<{tag_name}\s+class="{class_attr}"[^>]*>.*?</{tag_name}>', re.DOTALL | re.IGNORECASE)
    else:
        pattern = re.compile(rf'<{tag_name}[^>]*>.*?</{tag_name}>', re.DOTALL | re.IGNORECASE)
    
    match = pattern.search(html_content)
    return match.group(0) if match else None

def build_site():
    print("Reading canonical index.html...")
    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        index_html = f.read()

    # Extract Canonical Header and Footer
    canonical_header = extract_block(index_html, 'header', 'site-header premium-header')
    canonical_footer = extract_block(index_html, 'footer', 'site-footer premium-footer')

    if not canonical_header or not canonical_footer:
        print("ERROR: Could not find canonical header or footer in index.html.")
        sys.exit(1)

    print(f"Canonical Header length: {len(canonical_header)} bytes")
    print(f"Canonical Footer length: {len(canonical_footer)} bytes")

    header_regex = re.compile(r'<header\s+class="site-header premium-header"[^>]*>.*?</header>', re.DOTALL | re.IGNORECASE)
    footer_regex = re.compile(r'<footer\s+class="site-footer premium-footer"[^>]*>.*?</footer>', re.DOTALL | re.IGNORECASE)
    schema_regex = re.compile(r'<script\s+type="application/ld\+json"\s+data-auto-seo-schema\s*>.*?</script>\s*', re.DOTALL | re.IGNORECASE)
    generated_calculator_script_regex = re.compile(
        r'\s*<script>\s*// Logic for luxury calculator[^\r\n]*.*?</script>\s*',
        re.DOTALL | re.IGNORECASE
    )

    modified_count = 0

    css_links_regex = re.compile(
        r'(?:\s*<link\s+(?=[^>]*(?:href="/(?:styles|luxury-tools|site-dark-luxury)(?:\.min)?\.css|rel="preload"))'
        r'(?=[^>]*(?:href="/(?:styles|luxury-tools|site-dark-luxury)(?:\.min)?\.css|as="style"))[^>]*>\s*)+',
        re.DOTALL | re.IGNORECASE
    )
    css_asset_link_regex = re.compile(
        r'\s*<link\s+[^>]*href="/(?:styles|luxury-tools|site-dark-luxury)(?:\.min)?\.css(?:\?[^"]*)?"[^>]*>\s*',
        re.IGNORECASE
    )
    homepage_inline_style_regex = re.compile(
        r'\s*<style>\s*:root\{--bg:#020617;.*?</style>\s*',
        re.DOTALL | re.IGNORECASE
    )
    script_src_regex = re.compile(
        r'<script\s+src="/script\.min\.js(?:\?[^"]*)?"\s+defer></script>',
        re.IGNORECASE
    )
    
    asset_version = "electrical-20260602"
    optimized_css = f'''
  <link rel="preload" href="/site-dark-luxury.min.css?v={asset_version}" as="style">
  <link rel="stylesheet" href="/site-dark-luxury.min.css?v={asset_version}">
  <link rel="stylesheet" href="/luxury-tools.min.css?v={asset_version}" media="print" onload="this.media='all'">
  <link rel="stylesheet" href="/styles.min.css?v={asset_version}" media="print" onload="this.media='all'">
'''

    for root, dirs, files in os.walk(WORKSPACE_DIR):
        if '.git' in root or 'node_modules' in root:
            continue

        for filename in files:
            if filename.endswith('.html'):
                filepath = os.path.join(root, filename)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    try:
                        content = f.read()
                    except UnicodeDecodeError:
                        continue

                original_content = content

                # 1. Inject Canonical Header
                content = header_regex.sub(canonical_header.replace('\\', '\\\\'), content)

                # 2. Inject Canonical Footer
                content = footer_regex.sub(canonical_footer.replace('\\', '\\\\'), content)

                # 3. Remove Redundant Schema
                content = schema_regex.sub('', content)
                content = generated_calculator_script_regex.sub('\n', content)
                content = homepage_inline_style_regex.sub('\n', content)

                # 4. Remove Inline Event Handlers (Issue 9 prep)
                content = content.replace(' onclick="window.toggleFaq(this)"', '')
                content = content.replace(" onclick='window.toggleFaq(this)'", '')
                content = re.sub(r'\s*onclick="window\.loadDevice\([^)]+\)"', '', content)
                content = re.sub(r'\s*on(?:click|input|change|keydown)="[^"]*"', '', content)
                content = re.sub(r'<script\s+type="application/ld\+json"[^>]*>\s*{[^{}]*"potentialAction".*?</script>\s*', '', content, flags=re.DOTALL | re.IGNORECASE)

                # 5. Optimize CSS Delivery (Fix Render Blocking)
                content = css_links_regex.sub('\n', content)
                content = css_asset_link_regex.sub('\n', content)
                content = re.sub(r'\s*</head>', optimized_css + '</head>', content, count=1, flags=re.IGNORECASE)
                content = script_src_regex.sub(
                    f'<script src="/script.min.js?v={asset_version}" defer></script>',
                    content
                )

                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    modified_count += 1
                    print(f"Updated: {os.path.relpath(filepath, WORKSPACE_DIR)}")

    print(f"\nBuild complete! {modified_count} HTML files were synchronized.")

def minify_css(file_path, output_path):
    print(f"Minifying {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            css = f.read()
        
        # Remove comments
        css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
        # Remove whitespace around selectors and braces
        css = re.sub(r'\s*([\{\}\:\;\,\>])\s*', r'\1', css)
        # Remove newlines
        css = css.replace('\n', '').replace('\r', '')
        # Remove trailing semicolons before closing brace
        css = css.replace(';}', '}')
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(css)
        print(f"Success! {output_path} generated.")
    except Exception as e:
        print(f"Failed to minify {file_path}: {e}")

def minify_js(file_path, output_path):
    print(f"Minifying {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            js = f.read()

        js = re.sub(r'/\*.*?\*/', '', js, flags=re.DOTALL)
        js = re.sub(r'^\s*//.*$', '', js, flags=re.MULTILINE)
        js = re.sub(r'[ \t]+', ' ', js)
        js = re.sub(r'\n\s*\n+', '\n', js)

        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(js.strip())
        print(f"Success! {output_path} generated.")
    except Exception as e:
        print(f"Failed to minify {file_path}: {e}")

if __name__ == "__main__":
    build_site()
    
    # Minify CSS files
    minify_css(os.path.join(WORKSPACE_DIR, "styles.css"), os.path.join(WORKSPACE_DIR, "styles.min.css"))
    minify_css(os.path.join(WORKSPACE_DIR, "site-dark-luxury.css"), os.path.join(WORKSPACE_DIR, "site-dark-luxury.min.css"))
    minify_css(os.path.join(WORKSPACE_DIR, "luxury-tools.css"), os.path.join(WORKSPACE_DIR, "luxury-tools.min.css"))
    minify_js(os.path.join(WORKSPACE_DIR, "script.js"), os.path.join(WORKSPACE_DIR, "script.min.js"))
