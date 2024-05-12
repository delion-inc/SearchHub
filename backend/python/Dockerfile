# Використовуйте офіційний образ Python з Docker Hub
FROM python:3.8-slim-buster

# Встановіть робочий каталог у контейнері
WORKDIR /app

# Копіюйте файли з поточного каталогу у контейнер
COPY . .

# Встановіть необхідні залежності
RUN pip install --no-cache-dir telethon schedule flask

# Запустіть ваш код
CMD [ "python", "./telegram_scraper.py" ]
