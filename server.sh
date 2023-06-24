#!/bin/bash

python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt

cd study_sense
export DJANGO_KEY="test"
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver