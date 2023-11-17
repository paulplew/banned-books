from colors import color
from numpy import empty, interp


def image_to_ascii(img, new_width):
    chars = " .,-~:;!=*#$@"

    _, _, width, height = img.getbbox()

    scale_ratio = new_width / width
    new_height = int(scale_ratio * height)

    img = img.resize((new_width, new_height))
    pixels = list(img.getdata())

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


def pixel_colors(pixels, width, height):
    colors = empty((width * height, 1), dtype=object).flatten()
    for index, pixel in enumerate(pixels):
        colors[index] = pixel

    colors = colors.reshape((height, width))
    return colors
