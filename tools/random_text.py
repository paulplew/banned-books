#! /usr/bin/env python

from random import choice
from string import ascii_letters

from pyperclip import copy

letters = ascii_letters[0:26]
width = int(input("witdh: "))
height = int(input("height: "))

result = []
for i in range(width * height):
    if i > 0 and i % width == 0:
        result.append("\n")

    result.append(choice(letters))

copy("".join(result))
print(f"Copied random text with dimensions {width}x{height} to clipboard")
