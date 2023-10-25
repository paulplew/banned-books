from colors import color
from numpy import interp


def image_to_ascii(img, new_width, colorize=True, height_scale=0.8):
    chars = " .,-~:;!=*#$@"

    _, _, width, height = img.getbbox()

    new_height = int((width / height) * new_width) * height_scale

    img = img.resize((new_width, int(new_height)))
    pixels = img.getdata()

    new_pixels = []
    for pixel in pixels:
        # luminance values from wikipedia greyscale conversion page
        luminance = 0.2126 * pixel[0] + 0.7152 * pixel[1] + 0.0722 * pixel[2]

        # clip the pixel from 255 values to the number of possible values in the chars string
        char = chars[int(interp(luminance, [0, 256], [0, len(chars)]))]

        if colorize:
            new_pixels.append(color(char, pixel))
        else:
            new_pixels.append(char)

    new_pixels_count = len(new_pixels)
    if not colorize:
        new_pixels = "".join(new_pixels)
        ascii_picture = [
            new_pixels[index : index + new_width]
            for index in range(0, new_pixels_count, new_width)
        ]
        ascii_picture = "\n".join(ascii_picture)
    else:
        new_pixels = [
            new_pixels[index : index + new_width]
            for index in range(0, new_pixels_count, new_width)
        ]
        ascii_picture = ""
        for line in new_pixels:
            for char in line:
                ascii_picture = ascii_picture + char
            ascii_picture = ascii_picture + "\n"

    return ascii_picture
