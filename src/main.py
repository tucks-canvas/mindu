from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_socketio import SocketIO, send, join_room, leave_room
import socketio
import random
from string import ascii_uppercase

messages = []
rooms ={}

app = Flask('MindU')
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['DEBUG'] = True
socketio = SocketIO(app)

@app.route('/', methods=['POST', 'GET']) # Allow both GET and POST requests
def home():
    # When the form is submitted
    if request.method == "POST": 
        # Get the user's name from the form
        name = request.form.get("name")
        # Get the room code (if provided)
        code = request.form.get("code")
        # Check if the user wants to join an existing room
        join = request.form.get("join", False)
        # Check if the user wants to create a new room
        create = request.form.get('create', False)

        # Validate user input: Name is required
        if not name:
            return render_template("Home.html", error="Please enter a room.",code=code, name=name)
        
        # Validate: If joining a room, a room code is required
        if join != False and not code:
            return render_template("Home.html", error="Please enter a room code.", code=code, name=name)
        
        # Assign the room code to the variable `room
        room = code

        # If user wants to create a new room with a 4-letter room code, ensuring its unquie and assigned to a room
        if create != False:
            while True:
                code = ""
                for _ in range(4):
                    code += random.choice(ascii_uppercase)
                if code not in rooms:
                    break
            
            room = code
            # Create an entry for the new room
            rooms[room] = {"Patients":0, "messages":[]}

        # If joining an existing room, check if the room exists
        elif code not in rooms:
            return render_template("Home.html", error="Room is not vaild", code=code, name=name)
        
        # Store user data in the session
        session["room"] = room
        session["name"] = name

    # Render the homepage template for GET requests
    return render_template("Home.html")

@app.route("/room")
def room_access():
    # Retrieve the room code from the session
    room = session.get("room")

    # If no room exists in the session or the user’s name is not set, redirect to home
    if room is None or session.get("name") is None or room not in rooms:
        return redirect(url_for("home"))
    
    # Render the room.html template and pass the room code and messages
    return render_template("room.html", code=room, messages=rooms[room]["messages"])

@socketio.on("message")
def listen_message(data):
    # Retrieve the room the user is in from the session
    room = session.get("room")

    # If the room is not valid, exit the function
    if room not in rooms:
        return 
    
    # Create a message content dictionary
    content = {
        "name": session.get("name"),
        "message": data["data"]
    }

    # Send the message to all clients in the room
    send(content, to=room)

    # Append the message to the room's message history
    rooms[room]["messages"].append(content)

    # Print message for debugging/logging
    print(f"{session.get('name')} said: {data['data']}")

@socketio.on("connect")
def connect(auth):

    # Retrieve the room and username from the session
    room = session.get("room")
    name = session.get("name")

    # If the user is not in a valid room or doesn't have a name, return (ignore connection)
    if not room or not name:
        return
    
    # If the room does not exist, remove the user from it
    if room not in rooms:
        leave_room(room)
        return
    # Join the user to the room
    join_room(room)

    # Notify all users in the room that the user has entered
    send({"name": name, "message": "has entered the room"}, to=room)

    # Increase the number of members in the room
    rooms[room]["members"] += 1

    # Print server log to confirm the user joined
    print(f"{name} joined room {room}")

@socketio.on("disconnect")
def disconnect():
    # Retrieve the room and username from the session
    room = session.get("room")
    name = session.get("name")
    
    # Remove the user from the room
    leave_room(room)

    # If the room exists in the dictionary, decrease room member count
    if room in rooms:
        rooms[room]["members"] -= 1

        # If there are no more members left, delete the room
        if rooms[room]["members"] <= 0:
            del rooms[room]

    # Notify all users in the room that the user has left
    send({"name": name, "message": "has left the room"}, to=room)

    # Print server log to confirm the user left
    print(f"{name} has left the room {room}")



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
