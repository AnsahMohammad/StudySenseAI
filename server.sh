#!/bin/bash

python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt

cd StudySense
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver