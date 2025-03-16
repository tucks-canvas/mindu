from src import db, login_manager
from flask_login import login_user, logout_user, current_user, login_required
from src.models import UserProfile
from flask import Blueprint,request, jsonify
from werkzeug.security import check_password_hash

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if UserProfile.query.filter_by(email=data['email']).first():
        return jsonify({"error" : "Email already exists"}), 400
    
    user = UserProfile(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=data['password']
    )

    db.session.add(user)
    db.session.commit()
    return jsonify({"message" : "Registered succesfully"})

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = UserProfile.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        login_user(user)
        return jsonify({"message" : "Logged in"}), 200
    else:
        return jsonify({"error" : "Invalid email or password"})

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"message" : "Logged out"}), 200

@login_manager.user_loader
def load_user(user_id):
    return UserProfile.query.get(int(user_id))