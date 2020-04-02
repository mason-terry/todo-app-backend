#!/usr/local/bin/bash

eval "source .env/bin/activate"
eval "pip install -e ."
eval "source set_app_vars.sh"
eval "flask run"
