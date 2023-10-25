import configparser
import os
from pathlib import Path

ROOT_DIR = Path(os.path.dirname(os.path.abspath(__file__)))
CONFIG_PATH = Path(ROOT_DIR, "configuration.conf")

SEARCH_URL = "https://openlibrary.org/search.json{}"
COVER_URL = "https://covers.openlibrary.org/b/isbn/{}-L.jpg"

config = configparser.ConfigParser()
with open(CONFIG_PATH, "r") as cfg:
    config.read_file(cfg)

BACKEND_LOG = config.get("logging", "backend_log").strip('"')
BOOK_LOG = config.get("logging", "book_log").strip('"')
UNIFIED_LOG = config.get("logging", "unified_log").strip('"')

DATA_DIR = os.path.abspath(config.get("data", "data_dir").strip('"'))
