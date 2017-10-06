# server.py
from flask import Flask, render_template

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
    return render_template("public/index.html")

if __name__ == "__main__":
    app.run()