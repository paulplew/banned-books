import logging
import os
from logging.handlers import RotatingFileHandler

import pandas as pd
from aiohttp import web

from backend.asciifier import image_to_ascii
from backend.books import *
from definitions import BACKEND_LOG, DATA_DIR

logger = logging.getLogger("global_logger")


def setup_logger(log_level=logging.WARNING):
    logger.handlers.clear()

    logger.setLevel(log_level)
    log_format = f"BACKEND: %(asctime)s - %(levelname)s - Message: %(message)s"
    formatter = logging.Formatter(log_format)
    handler = RotatingFileHandler(
        BACKEND_LOG,
        mode="a",
        maxBytes=5 * 1024 * 1024,
        backupCount=2,
        encoding=None,
        delay=0,
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)


def rand_book(ascii_width=90):
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

        assert len(colors) == len(json_image) and all(
            [len(c_row) == len(p_row) for c_row, p_row in zip(colors, json_image)]
        ), "image and colors do not share dimensionality"

        json_data = {"colors": colors.tolist(), "image": json_image}
        return json_data


def run(request):
    width = request.match_info.get("ascii_width", 90)
    setup_logger(log_level=logging.DEBUG)
    logger.info(" STARTING BACKEND ".center(100, "#"))

    rand_book(width)
    data = run(width)

    return web.json_response(data)
