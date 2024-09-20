from flask import Flask, render_template, request, redirect, url_for, flash, current_app, g, jsonify
from app.extensions import db
from flask_migrate import Migrate
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from app.models import User, Admin
from app.setting import DevelopmentConfig
from app.routes import api
from flasgger import Swagger

import click

def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    
    app.config['SECRET_KEY'] = 'admin'
    app.register_blueprint(api, url_prefix='/api')
    swagger = Swagger(app)
  



    login_manager = LoginManager(app)
    login_manager.login_view = 'auth.login'
    login_manager.login_message_category = 'info'



    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    def register_extensions(app):
        db.init_app(app)
        migrate = Migrate(app, db)  # 初始化迁移工具

    # 初始化扩展
    register_extensions(app)

    # 确保数据库表被创建
    with app.app_context():
        db.create_all()

    return app