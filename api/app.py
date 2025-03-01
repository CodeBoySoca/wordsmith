from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from apscheduler.schedulers.background import BackgroundScheduler
from dotenv import load_dotenv
from datetime import datetime, timezone
import smtplib
import requests
import random
import os
import json


load_dotenv('.env')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
db = SQLAlchemy(app)
scheduler = BackgroundScheduler()


class Wotd(db.Model):
    word_id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(75), unique=True, nullable=False)
    word_type = db.Column(db.String(35), nullable=False)
    definition = db.Column(db.Text, nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.now(timezone.utc).replace(tzinfo=None))
    expired = db.Column(db.Boolean)

    def send():
       pass

    @staticmethod
    def get_random_word():
        word = []
        word_dictionary = 'data/words_dictionary.json'
        with open(word_dictionary, 'r') as words:
           data = json.load(words)
           for key, value in data.items():
               word.append(key)
        return random.choice(word)

    @staticmethod
    def word_result(word):
        return requests.get(f'https://api.dictionaryapi.dev/api/v2/entries/en/{word}')

    @staticmethod
    def filter_result(word_result):
        data = json.loads(word_result.content.decode('utf-8'))
        if isinstance(data, dict):
            word = Wotd.get_random_word()
            word_search = Wotd.word_result(word)
            return Wotd.filter_result(word_search)
        else:
            return data


class Subscriber(db.Model):
    subscriber_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(75), nullable=False)
    subscribed = db.Column(db.Boolean)
    date_added = db.Column(db.DateTime, default=datetime.now(timezone.utc).replace(tzinfo=None))

#get email of subscriber
@app.route('/api/word_subscription', methods=['POST'])
def word_subscription():
    if request.method == 'POST':
       data = request.get_json(force=True)
       subscriber = Subscriber(**data)
       db.session.add(subscriber)
       db.session.commit()
       print(data)
       return jsonify({'message' : 'Data received'}), 200
    else:
       return jsonify({'error' : 'Request was not JSON'}), 400

#get Word of The Day endpoint
@app.route('/api/wotd')
def wotf():
    pass

#get Random word endpoint
@app.route('/api/random_word')
def random_word():
    word = Wotd.get_random_word()
    word_search = Wotd.word_result(word)
    word_result = Wotd.filter_result(word_search)
    return word_result, 200


if __name__ == '__main__':
    app.run(debug=True)
