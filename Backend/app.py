from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy user (temporary testing)
USER_DATA = {
    "email": "doctor@gmail.com",
    "password": "1234"
}

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if email == USER_DATA["email"] and password == USER_DATA["password"]:
        return jsonify({
            "message": "Login successful"
        }), 200
    else:
        return jsonify({
            "error": "Invalid email or password"
        }), 401


if __name__ == "__main__":
    app.run(debug=True, port=5000)