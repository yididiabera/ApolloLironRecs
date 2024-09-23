#!/usr/bin/python3
'''Users routes'''
from api.v1.views import app_view
from flask import request, jsonify
from models import storage
from models.user import User


# Get all users route
@app_view.route("/users", methods=["GET"])
def users():
    all_users = storage.all("User")
    users_list = []

    for user in all_users.values():
        users_list.append(user.to_dict())
    
    return jsonify(users_list)

# Get user by id route
@app_view.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    user = storage.get("User", user_id, None)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.to_dict())

# Get user by email route
@app_view.route("/users/find_by_email/<email>", methods=["GET"])
def get_user_by_email(email):
    user = storage.get("User", None, email)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.to_dict())

# Create user route
@app_view.route("/users/sign_up", methods=["POST"])
def create_user():
    data = request.get_json()

    email = data.get("email")
    full_name = data.get("fullName")
    image = data.get("image")

    if not email or not full_name:
        return jsonify({"error": "Missing data"}), 400
    
    user = storage.get("User", None ,email)
    if user:
        return jsonify(user.to_dict()), 200

    new_user = User(email=email, full_name=full_name, image=image)
    dic = new_user.to_dict()

    try:
        new_user.save_db()
    except:
        return jsonify({"error": "Could not create user"}), 400
    
    return jsonify(dic), 201

# Delete user route
@app_view.route("/users/delete_user/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    data = request.get_json()

    email = data.get("email")

    if not email:
        return jsonify({"error": "Missing data"}), 400

    user = storage.get("User", user_id, None)

    try:
        user.delete()
    except:
        return jsonify({"error": "Could not delete user"}), 400
    
    return jsonify({"message": "User Deleted!"}), 200

