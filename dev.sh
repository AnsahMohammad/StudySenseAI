#!/bin/bash

# Define color variables
GREEN='\033[0;32m'  # Green color
NC='\033[0m'       # No color

echo -e "${GREEN}Clearing the ports 8000 and 5173${NC}"
sudo lsof -ti :8000 | xargs --no-run-if-empty kill
sudo lsof -ti :5173 | xargs --no-run-if-empty kill

echo -e "${GREEN}Starting Django${NC}"
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt

cd study_sense
export DJANGO_KEY="test"
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver &
sleep 5

echo -e "${GREEN}Starting React${NC}"
cd ../studySenseClient
# npm install mdb-react-ui-kit
# npm install react-cookie
# npm install bootstrap
# npm install react-pdf @react-pdf/renderer
npm install
npm run dev -- --port 5173
