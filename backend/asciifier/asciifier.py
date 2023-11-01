from colors import color
from numpy import empty, interp


def image_to_ascii(img, new_width, height_scale=0.8):
    chars = " .,-~:;!=*#$@"

    _, _, width, height = img.getbbox()

    new_height = int((width / height) * new_width * height_scale)

    img = img.resize((new_width, int(new_height)))
    pixels = img.getdata()

    new_pixels = []
    for pixel in pixels:
        # luminance values from wikipedia greyscale conversion page
        luminance = 0.2126 * pixel[0] + 0.7152 * pixel[1] + 0.0722 * pixel[2]

        # clip the pixel from 255 values to the number of possible values in the chars string
        char = chars[int(interp(luminance, [0, 256], [0, len(chars)]))]

        new_pixels.append(char)

    colors = pixel_colors(pixels, new_width, new_height)
    new_pixels_count = len(new_pixels)
    new_pixels = "".join(new_pixels)
    ascii_picture = [
        new_pixels[index : index + new_width]
        for index in range(0, new_pixels_count, new_width)
    ]
    ascii_picture = "\n".join(ascii_picture)

    return ascii_picture, colors


def rgb_to_hex(r, g, b):
    numerals = "0123456789ABCDEF"

    def _base_sixteen(num):
        if num < len(numerals):
            return numerals[num]
        else:
            return numerals[num // 16] + _base_sixteen(num % 16)

    assert not any([x > 255 for x in [r, g, b]])

    r = _base_sixteen(r)
    g = _base_sixteen(g)
    b = _base_sixteen(b)
    return f"#{r:02}{g:02}{b:02}"


def pixel_colors(pixels, width, height):
    colors = empty((width * height, 1), dtype=str).flatten()
    for index, pixel in enumerate(pixels):
        colors[index] = rgb_to_hex(pixel[0], pixel[1], pixel[2])

    colors = colors.reshape((height, width))
    return colors
