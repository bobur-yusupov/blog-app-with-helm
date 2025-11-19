FROM python:3.14-alpine

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt
RUN python3 manage.py collectstatic

EXPOSE 8000

CMD [ "gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application" ]
