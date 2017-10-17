#!/bin/bash

(cd app/static; npm run build)
python3 ./app/server/app.py