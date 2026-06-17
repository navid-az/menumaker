FROM python:3.13

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["daphne", "core.asgi:application", "-b", "0.0.0.0", "-p", "8000"]