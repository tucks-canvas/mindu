from . import db
from werkzeug.security import generate_password_hash

class UserProfile(db.Model):
    __tablename__ = 'user_profiles'

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(100), nullable = False)
    last_name = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(256), nullable = False)

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = generate_password_hash(password, method = 'pbkdf2:sha256:600000')
    
    def is_authenticated(self):
        return True
    
    def is_active(self):
        return False
    
    def is_anonymous(self):
        return False
    
    def get_id(self):
        try:
            return unicode(self.id)
        except NameError:
            return str(self.id)
    
    def __repr__(self):
        return f"<User {self.email}>"

class Post(db.Model):
    __tablename__ = 'post'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    content = db.Column(db.Text, nullable = False)
    timestamp = db.Column(db.DateTime , server_default=db.func_current_timestamp())

    user = db.relationship('UserProfile', backref = db.backref('posts', lazy=True))

    def __repr__(self):
        return f"<Post{self.id} by UserProfile {self.user_id}>"
    
class Like(db.Model):
    __tablename__ = 'like'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))

    user = db.relationship('UserProfile', backref = db.backref('likes', lazy=True))
    post = db.relationship('Post', backref = db.backref('likes', lazy=True, cascade="all, delete-orphan"))

    def __repr__(self):
        return f"<Like by UserProfile {self.user_id} on Post {self.post_id}>"

class Comment(db.Model):
    __tablename__ = 'comment'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    content = db.Column(db.Text, nullable = False)
    timestamp = db.Column(db.DateTime , server_default=db.func_current_timestamp())

    user = db.relationship('UserProfile', backref = db.backref('comments', lazy=True))
    post = db.relationship('Post', backref = db.backref('comments', lazy=True, cascade="all, delete-orphan"))

    def __repr__(self):
        return f"<Comment {self.id} by UserProfile {self.user_id} on Post {self.post_id}>"
