# Використовуйте офіційний образ Python як батьківський образ
FROM python:3.8-slim-buster

# Встановіть робочий каталог у контейнері
WORKDIR /app

# Копіюйте поточний каталог в робочий каталог у контейнері
COPY . .

# Встановіть будь-які необхідні пакети, вказані в requirements.txt
RUN pip install telethon schedule flask

# Запустіть app.py, коли контейнер запускається
CMD ["python", "app.py"]


