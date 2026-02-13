import re

def check_closed(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    matches = re.findall(r'<path\s+([^>]+)>', content, re.DOTALL)

    for attrs in matches:
        id_match = re.search(r'id="([^"]+)"', attrs)
        pid = id_match.group(1) if id_match else "unknown"

        d_match = re.search(r'\bd="([^"]+)"', attrs, re.DOTALL) or re.search(r'd="([^"]+)"', attrs, re.DOTALL)
        if d_match:
            d = d_match.group(1).strip()
            is_closed = d.lower().endswith('z')
            print(f"ID: {pid}, Closed: {is_closed}")

check_closed('turkey_regions.svg')
