import re

def parse_svg_paths(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    chunks = content.split('<path')
    paths = []

    print(f"Total chunks: {len(chunks)}")

    for i, chunk in enumerate(chunks[1:]): # Skip preamble
        # Find end of tag
        end_idx = chunk.find('>')
        if end_idx == -1:
            continue

        tag_content = chunk[:end_idx]

        # Extract ID
        # id attribute usually starts with space or is at start
        id_match = re.search(r'\sid="([^"]+)"', tag_content)
        if not id_match:
            # Try start of string if needed, though split makes it weird
            id_match = re.search(r'^id="([^"]+)"', tag_content.strip())

        pid = id_match.group(1) if id_match else "unknown"

        # Extract d
        # d attribute must be preceded by space or newline
        d_match = re.search(r'\sd="([^"]+)"', tag_content, re.DOTALL)
        if not d_match:
             # Try without space if it's the first attribute (unlikely after <path)
             # But <path d="..." is possible
             d_match = re.search(r'd="([^"]+)"', tag_content, re.DOTALL)
             # Wait, if I use \b it's safer
             d_match = re.search(r'\bd="([^"]+)"', tag_content, re.DOTALL)

        if not d_match:
            print(f"Chunk {i}, ID {pid}: No d attribute found")
            continue

        d = d_match.group(1).replace('\n', ' ').strip()

        # Extract all numbers
        floats = re.findall(r'[-+]?\d*\.\d+|[-+]?\d+', d)
        nums = [float(x) for x in floats]

        if not nums or len(nums) < 2:
            print(f"Chunk {i}, ID {pid}: No numbers in d (len={len(nums)})")
            continue

        xs = nums[0::2]
        ys = nums[1::2]

        if not xs or not ys:
             continue

        min_x, max_x = min(xs), max(xs)
        min_y, max_y = min(ys), max(ys)

        cx = (min_x + max_x) / 2
        cy = (min_y + max_y) / 2

        paths.append({
            'id': pid,
            'cx': cx,
            'cy': cy,
            'bbox': (min_x, min_y, max_x, max_y),
            'd': d
        })

    return paths

print("Processing SVG...")
paths = parse_svg_paths('turkey_regions.svg')
for p in paths:
    print(f"ID: {p['id']}, Center: ({p['cx']:.1f}, {p['cy']:.1f}), BBox: ({p['bbox'][0]:.1f}, {p['bbox'][1]:.1f}, {p['bbox'][2]:.1f}, {p['bbox'][3]:.1f})")
