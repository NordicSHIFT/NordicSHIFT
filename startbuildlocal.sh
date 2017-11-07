#!/bin/bash

(cd app/static; npm run build)
source '.env'
python3 ./app/server/app.py
