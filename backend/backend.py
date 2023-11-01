import logging
import os
from json import dumps
from pathlib import Path

import pandas as pd

from backend.asciifier import image_to_ascii
from backend.books import *
from definitions import BACKEND_LOG, DATA_DIR

logger = logging.getLogger("global_logger")


def setup_logger(log_level=logging.WARNING):
    logger.handlers.clear()

    logger.setLevel(log_level)
    log_format = f"BACKEND: %(asctime)s - %(levelname)s - Message: %(message)s"
    formatter = logging.Formatter(log_format)
    handler = logging.FileHandler(BACKEND_LOG)
    handler.setFormatter(formatter)
    logger.addHandler(handler)


def rand_book(ascii_width=90, colorize=True):
    data_file = os.path.join(DATA_DIR, "banned_books_clean.pickle")
    data = pd.read_pickle(data_file)

    banned_books = data.loc[data["library_type"] == "Public"]

    while True:
        book = banned_books.sample(n=1).iloc[0]
        logger.info(f"Starting search for {book['title']}")

        try:
            assert isinstance(book["author"], str)
            info = get_book_info_and_cover(book["author"], book["title"])
        except Exception as error:
            logger.exception(repr(error))
            continue

        ascii_image, colors = image_to_ascii(info["cover"], new_width=ascii_width)

        json_image = [[]]
        for i in ascii_image:
            if i == "\n":
                json_image.append([])
            else:
                json_image[-1].append(i)

        json_data = {"colors": colors.tolist(), "image": json_image}

        logger.info("Writing to file 'data.json'")
        with open(Path("data/data.json"), "w") as f:
            f.write(dumps(json_data, indent=4))

        assert len(colors) == len(json_image) and all(
            [len(c_row) == len(p_row) for c_row, p_row in zip(colors, json_image)]
        ), "image and colors do not share dimensionality"

        logger.info(f"Printing search info {book['title']}")
        print(f" {info['author']} ".center(ascii_width, "#"))
        print(f" {info['title']} ".center(ascii_width, "#"))
        print(ascii_image)
        break


def run(ascii_width=90, colorize=True):
    setup_logger(log_level=logging.DEBUG)
    logger.info(" STARTING BACKEND ".center(100, "#"))
    rand_book()


def main(ascii_width=90, colorize=True):
    setup_logger(log_level=logging.DEBUG)
    logger.info(" STARTING BACKEND BY MAIN ".center(100, "#"))
    rand_book(ascii_width, colorize)


if __name__ == "__main__":
    colorize = True
    main(colorize=colorize)
