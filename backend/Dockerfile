FROM python:3.13-slim

WORKDIR /app

ENV PIP_INDEX_URL=https://mirror.abrha.net/repository/pypi/simple

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["daphne", "core.asgi:application", "-b", "0.0.0.0", "-p", "8000"]