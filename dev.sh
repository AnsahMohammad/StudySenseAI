#!/bin/bash

python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt

cd study_sense
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver &

cd ../studySenseClient
npm install react-router-dom
npm install
npm run dev -- --port 5173
