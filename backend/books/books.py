import logging
import urllib.parse
from io import BytesIO
from logging.handlers import RotatingFileHandler

import requests
from PIL import Image

from definitions import BOOK_LOG, COVER_URL, SEARCH_URL

from .errors import *

book_logger = logging.getLogger("book_logger")


def setup_logger(author, title, log_level=logging.WARNING):
    book_logger.handlers.clear()
    book_logger.setLevel(log_level)

    # set up logger
    log_format = f"BOOK: %(asctime)s - %(levelname)s - Author: {author} - Book: {title} - Message: %(message)s"
    formatter = logging.Formatter(log_format)
    handler = RotatingFileHandler(
        BOOK_LOG,
        mode="a",
        maxBytes=5 * 1024 * 1024,
        backupCount=2,
        encoding=None,
        delay=0,
    )
    handler.setFormatter(formatter)
    book_logger.addHandler(handler)


def get_cover(isbn_list):
    assert len(isbn_list) > 0

    cover = None
    cover_image = None
    for isbn in isbn_list:
        query_url = COVER_URL.format(isbn)

        book_logger.info(f"fetching: '{query_url}'")
        cover = requests.get(query_url)
        cover_image = Image.open(BytesIO(cover.content))

        if cover_image.height > 1 and cover_image.width > 1:
            break
        else:
            book_logger.warning(f"Cover not located for isbn: '{isbn}'")

    if cover_image and cover_image.height == 1 and cover_image.width == 1:
        raise CoverNotFoundException(
            f"No covers found for any isbn in: {','.join(isbn_list)}"
        )

    return cover


def get_book_info(author, title):
    # sanatize author and title
    book_logger.info(author)
    book_logger.info(title)

    safe_author = urllib.parse.quote_plus(author)
    safe_title = urllib.parse.quote_plus(title)

    # build the query url for the search
    query = f"?author={safe_author}&q={safe_title}"
    query_url = SEARCH_URL.format(query)

    # execute request for search url
    book_logger.info(f"fetching: '{query_url}'")
    response = requests.get(query_url)

    # raise if there is a non success code
    if response.status_code != 200:
        raise HTTPCodeException(f"url: {query_url} returned {response.status_code}")

    return response.json()


def get_book_info_and_cover(author, title):
    setup_logger(author, title, log_level=logging.DEBUG)

    matching_books = get_book_info(author, title)

    # if there are no matches
    if matching_books["numFound"] == 0:
        raise BookNotFoundException(
            f"Could not find and matches for author: '{author}', title: '{title}'"
        )

    first_book = matching_books["docs"][0]
    cover = get_cover(first_book["isbn"])

    book_logger.info(f"All info located.")
    return {
        "author": author,
        "title": title,
        "cover": Image.open(BytesIO(cover.content)),
    }
