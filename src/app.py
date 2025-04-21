from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allows all origins

# Initialize chat history
def init_chat_history():
    if 'chat_history' not in session:
        session['chat_history'] = []

@app.route("./app/(screens)/chat", methods=["POST"])

def index():
    init_chat_history()
    chat_history = session.get('chat_history', [])

@app.route("/chat", methods=["POST"])
def chat():
    init_chat_history()
    user_message = request.form.get("message", "").strip()
    bot_response = ""
    lower_msg = user_message.lower()
    
    # Crisis detection
    if any(keyword in lower_msg for keyword in ["suicide", "self-harm", "kill myself", "crisis"]):
        bot_response = ("It sounds like you're in distress. Please know that help is available. "
                        "If you are in immediate danger, please call your local emergency services immediately. "
                        "Consider reaching out to a trusted friend, family member, or mental health professional. "
                        "JOIN U-REPORT! TEXT the word JOIN to 876-838-4897 on WhatsApp or SMS (FREE FOR FLOW USERS) OR MESSAGE @UREPORTJAMAICA ON FB MESSENGER")
    else:
        # Basic rule‑based responses
        if "hello" in lower_msg or "hi" in lower_msg:
            bot_response = "Hello, I'm here to listen. How are you feeling today?"
        elif "sad" in lower_msg or "depressed" in lower_msg:
            bot_response = ("I'm sorry to hear that you're feeling this way. Sometimes talking about it can help. "
                            "Would you like to share more about what you're experiencing?")
        elif "anxious" in lower_msg or "nervous" in lower_msg:
            bot_response = ("It sounds like you're feeling anxious. It might help to take a few deep breaths. "
                            "What's on your mind?")
        elif "advice" in lower_msg:
            bot_response = "I'm really sorry that you're feeling this way, and I want you to know that you're not alone in this struggle. When dealing with depression, it can be incredibly helpful to reach out for support, whether that's by talking to a trusted friend, family member, or mental health professional who can offer guidance tailored to your needs. Sometimes, simply sharing what you're going through can lighten the burden, even if just a little. It might also be beneficial to establish a daily routine that includes regular meals, sufficient sleep, and some form of physical activity—small steps like taking a walk or practicing mindfulness can gradually make a positive difference. Additionally, setting manageable goals can help create a sense of accomplishment, even on days when everything feels overwhelming. Remember that these suggestions are not a substitute for professional care, and if your feelings ever become too intense or you feel unsafe, please don't hesitate to seek immediate help by reaching out to someone you trust or contacting emergency services. Your well-being matters, and there are resources available to support you through this difficult time."
        elif "thank" in lower_msg:
            bot_response = "You're welcome. I'm glad I could be here for you."
        else:
            bot_response = "I'm here to listen. Can you tell me more about what you're experiencing?"

    # Update the chat history
    chat_history = session['chat_history']
    chat_history.append({'user': user_message, 'bot': bot_response})
    session['chat_history'] = chat_history

    return redirect(url_for('index'))

@app.route("/reset", methods=["POST"])
def reset():
    session.pop('chat_history', None)
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)