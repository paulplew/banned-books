from aiohttp import web

from backend import run

app = web.Application()
app.add_routes([web.get("/", run), web.get("/{ascii_width}", run)])

if __name__ == "__main__":
    web.run_app(app)
