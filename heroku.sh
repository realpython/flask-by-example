#!/bin/bash
gunicorn app:app --daemon
python worker.py