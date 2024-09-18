from flask import Flask, render_template, request, redirect, url_for, flash, current_app, g, jsonify
from app.extensions import db
from flask_migrate import Migrate
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from app.models import User, Admin
from app.setting import DevelopmentConfig
from app.routes import api

import click

def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    
    app.config['SECRET_KEY'] = 'admin'
    app.register_blueprint(api, url_prefix='/api')

  

    @app.context_processor
    def inject_popular_posts():
        popular_posts = Post.query.order_by(Post.score.desc()).limit(5).all()
        return dict(popular_posts=popular_posts)

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