FROM python:3

ENV PYTHONUNBUFFERED 1

RUN apt-get update \ 
    && apt-get -y install libpq-dev \
    && apt-get -y install libreadline-dev

WORKDIR /app
ADD    ./backend/django/requirements.txt   /app/
RUN    pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0:8000"]
