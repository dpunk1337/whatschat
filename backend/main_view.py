from flask import Blueprint, redirect, url_for
from flask_login import login_required
import os

bp = Blueprint('main',__name__, static_folder=os.path.abspath(r'frontend/dist/frontend/'), static_url_path='/')

@login_required
@bp.route('/')
def home():
    return bp.send_static_file('index.html')


@bp.route('/<path:path>')
def catch_all(path):
    return redirect(url_for('bp.home'))
