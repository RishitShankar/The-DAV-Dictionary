import os
from PIL import Image

def generate_icons(src_img_path, res_dir):
    im = Image.open(src_img_path)
    densities = {
        'mdpi': (48, 48),
        'hdpi': (72, 72),
        'xhdpi': (96, 96),
        'xxhdpi': (144, 144),
        'xxxhdpi': (192, 192)
    }
    for density, size in densities.items():
        mip_dir = os.path.join(res_dir, f'mipmap-{density}')
        os.makedirs(mip_dir, exist_ok=True)
        resized = im.resize(size, Image.Resampling.LANCZOS)
        quant = resized.quantize(colors=256)
        quant.save(os.path.join(mip_dir, 'ic_launcher.png'), optimize=True)
        quant.save(os.path.join(mip_dir, 'ic_launcher_round.png'), optimize=True)
        print(f"[OK] Generated {density} icon ({size[0]}x{size[1]})")

if __name__ == '__main__':
    import sys
    src = sys.argv[1]
    dest = sys.argv[2]
    generate_icons(src, dest)
