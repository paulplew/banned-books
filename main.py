from json import load

from aiohttp import web

from backend import run


def subjects(request):
    with open("./data/subjects.txt", "r") as subjects_file:
        subjects_list = load(subjects_file)

    return web.json_response(
        subjects_list, headers={"Access-Control-Allow-Origin": "http://localhost:3000"}
    )


app = web.Application()
app.add_routes([web.get("/books/{ascii_width}", run)])
app.add_routes([web.get("/subjects", subjects)])

if __name__ == "__main__":
    web.run_app(app)
