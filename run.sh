#!/bin/bash

python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt

cd study_sense
export DJANGO_KEY=DJANGO_KEY
gunicorn -c gunicorn_config.py study_sense.wsgi:application
