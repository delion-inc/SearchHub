from telethon.sync import TelegramClient
import re
from datetime import datetime
import schedule
import time
from flask import Flask, request, jsonify
import os

api_id = '23338812'
api_hash = '7857dd3cf902794034aba032d94fe74a'
bot_token = os.getenv('6388193144:AAGK69RBaJJ2_xXZzQIFE1Wr2-g_PjFAO_E')

names = []

date_to_start = datetime(2024, 5, 1)

limit = 300

def process_channel(client, channel_name, pattern):
    global date_to_start
    new_names = []
    for message in client.iter_messages(channel_name, offset_date=date_to_start, limit=limit):
        if message.text is not None:
            matches = re.findall(pattern, message.text)
            for match in matches:
                new_names.append((match, f"https://t.me/{channel_name}/{message.id}"))
        date_to_start = message.date
    return new_names

def job():
    new_names = []
    with TelegramClient('anon', api_id, api_hash) as client:
        new_names.extend(process_channel(client, 'poschukUA', r'🇺🇦 (.*?) (?:\d{4} р\.н\.|#)'))
        new_names.extend(process_channel(client, 'poshuk_znyklyh', r'ПІБ: (.*?) \nДата народження'))
        new_names.extend(process_channel(client, 'WagnerPlennyeVSU', r'📝 (.*?),'))

    if new_names:
        names.extend(new_names)
        names.sort()
        print(names)
    else:
        print("Нічого нового не знайдено")

job()

schedule.every(1).hours.do(job)

app = Flask(__name__)


@app.route('/api/v1/search/<name>', methods=['GET'])
def search(name):
    for found_name, url in names:
        if name == found_name:
            return jsonify({'message': 'Name found', 'url': url}), 200
    return jsonify({'message': 'Name not found'}), 404


if __name__ == '__main__':
    app.run(port=8081)

while True:
    schedule.run_pending()
    time.sleep(1)
