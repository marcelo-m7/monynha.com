from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
public_dir = root / "public"
public_dir.mkdir(parents=True, exist_ok=True)

sizes = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon-48x48.png": 48,
    "apple-touch-icon.png": 180,
}

background = (5, 7, 10, 255)
border_color = (255, 255, 255, 64)
grad_start = (139, 92, 246, 255)
grad_end = (60, 131, 246, 255)
dot_color = (139, 92, 246, 255)

def lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)

def color_lerp(c1, c2, t: float):
    return (
        lerp(c1[0], c2[0], t),
        lerp(c1[1], c2[1], t),
        lerp(c1[2], c2[2], t),
        lerp(c1[3], c2[3], t),
    )

def draw_gradient_path(draw: ImageDraw.ImageDraw, points, width: int):
    total = sum(((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5 for (x1, y1), (x2, y2) in zip(points, points[1:]))
    if total == 0:
        return
    traveled = 0.0
    for (x1, y1), (x2, y2) in zip(points, points[1:]):
        segment = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
        steps = max(2, int(segment))
        for step in range(steps):
            t0 = step / steps
            t1 = (step + 1) / steps
            sx1 = x1 + (x2 - x1) * t0
            sy1 = y1 + (y2 - y1) * t0
            sx2 = x1 + (x2 - x1) * t1
            sy2 = y1 + (y2 - y1) * t1
            ratio = (traveled + segment * t0) / total
            color = color_lerp(grad_start, grad_end, ratio)
            draw.line([(sx1, sy1), (sx2, sy2)], fill=color, width=width)
        traveled += segment

def render_logo(size: int) -> Image.Image:
    scale = 4
    canvas = size * scale
    img = Image.new("RGBA", (canvas, canvas), background)
    draw = ImageDraw.Draw(img)

    border = max(1, int(2 * scale))
    draw.rectangle([border, border, canvas - border, canvas - border], outline=border_color, width=border)

    def sx(value: float) -> float:
        return value * canvas / 100.0

    stroke_width = max(1, int(10 * scale))
    points = [
        (sx(20), sx(80)),
        (sx(20), sx(25)),
        (sx(50), sx(55)),
        (sx(80), sx(25)),
        (sx(80), sx(80)),
    ]
    draw_gradient_path(draw, points, stroke_width)

    dot_r = sx(5)
    draw.ellipse(
        [sx(50) - dot_r, sx(75) - dot_r, sx(50) + dot_r, sx(75) + dot_r],
        fill=dot_color,
    )

    return img.resize((size, size), Image.Resampling.LANCZOS)

for name, size in sizes.items():
    out_path = public_dir / name
    render_logo(size).save(out_path)

ico_path = public_dir / "favicon.ico"
images = [
    Image.open(public_dir / "favicon-16x16.png"),
    Image.open(public_dir / "favicon-32x32.png"),
    Image.open(public_dir / "favicon-48x48.png"),
]
images[0].save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
