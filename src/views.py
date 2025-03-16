import os
from src import db, login_manager
from flask_login import login_user, logout_user, current_user, login_required
from src.models import Post, Like, Comment
from flask import Blueprint,request, jsonify
from werkzeug.security import check_password_hash


views = Blueprint('views', __name__)

@views.route('/posts', methods = ['GET'])
@login_required
def get_posts():
    posts = Post.query.all()
    return jsonify([{
        "id" : post.id,
        "user_id" : post.user_id,
        "content" : post.content,
        "timestamp" : post.timestamp,
        "likes" : len(post.likes),
        "comments" : len(post.comments)
    } for post in posts
    ])

@views.route('/post', methods=['POST'])
def create_post():
    data = request.get_json()
    user = UserProfile.query.filter_by(first_name=data['first_name']).first()

    if not user:
       return jsonify({"error": "User not found"}), 404
    
    post = Post(user_id=user.id, content=data['content'])
    db.session.add(post)
    db.session.commit()
    return jsonify({"message": "Post created", "post_id": post.id}), 201

@views.route('/post/<int:post_id>/like', methods=['POST'])
def like_post(post_id):
    data = request.get_json()
    user = UserProfile.query.filter_by(first_name=data['first_name']).first()
    post = Post.query.get(post_id)

    if not user or not post:
        return jsonify({"error": "User or Post not found"}), 404
    
    existing_like = Like.query.filter_by(user_id=user.id, post_id=post_id).first()
    
    if existing_like:
        return jsonify({"error": "User already liked this post"}), 400

    like = Like(user_id=user.id, post_id=post_id)
    db.session.add(like)
    db.session.commit()

    return jsonify({"message": "Post liked successfully"}), 201

@views.route('/post/<int:post_id>/like', methods=['DELETE'])
def unlike_post(post_id):
    data = request.get_json()
    user = UserProfile.query.filter_by(username=data['username']).first()
    like = Like.query.filter_by(user_id=user.id, post_id=post_id).first()

    if not user or not like:
        return jsonify({"error": "User or Like not found"}), 404

    db.session.delete(like)
    db.session.commit()
    
    return jsonify({"message": "Post unliked successfully"}), 200

@views.route('/post/<int:post_id>/comment', methods=['POST'])
def comment_on_post(post_id):
    data = request.get_json()
    user = UserProfile.query.filter_by(username=data['username']).first()
    post = Post.query.get(post_id)

    if not user or not post:
        return jsonify({"error": "User or Post not found"}), 404
    
    comment = Comment(user_id=user.id, post_id=post_id, content=data['content'])
    db.session.add(comment)
    db.session.commit()

    return jsonify({"message": "Comment added successfully"}), 201

@views.route('/post/<int:post_id>/comments', methods=['GET'])
def get_comments(post_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify({"error": "Post not found"}), 404

    return jsonify([
        {
            "id": comment.id,
            "user_id": comment.user_id,
            "content": comment.content,
            "timestamp": comment.timestamp
        } for comment in post.comments
    ])
