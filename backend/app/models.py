import datetime
from sqlalchemy.ext.hybrid import hybrid_property
from app.extensions import *
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # 自动生成的序号
    first_name = db.Column(db.String(50), nullable=False)  # 必填
    last_name = db.Column(db.String(50), nullable=False)  # 必填
    preferred_name = db.Column(db.String(50), nullable=False)  # 必填
    email = db.Column(db.String(120), nullable=False, unique=True, index=True)  # 必填
    password_hash = db.Column(db.String(128), nullable=False)  # 存储加密后的密码
    date_of_birth = db.Column(db.Date, nullable=False)  # 必填
    comment = db.Column(db.Text, nullable=True)  # 可选字段
    hear = db.Column(db.Integer, nullable=False)  # 必填，1-7之间的数字
    membership_type = db.Column(db.Integer, nullable=False)  # 必填，1-4之间的数字
    membership_start_time = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)  # 必填
    membership_expired_time = db.Column(db.DateTime, nullable=False)  # 必填

    # 设置密码时自动加密
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # 检查密码是否正确
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __init__(self, first_name, last_name, preferred_name, email, password, date_of_birth, comment, hear, membership_type, membership_start_time, membership_expired_time):
        self.first_name = first_name
        self.last_name = last_name
        self.preferred_name = preferred_name
        self.email = email
        self.set_password(password)  # 设置并加密密码

        # 判断 date_of_birth 是否是字符串
        if isinstance(date_of_birth, str):
            self.date_of_birth = datetime.datetime.strptime(date_of_birth, "%d-%m-%Y").date()
        else:
            self.date_of_birth = date_of_birth

        self.comment = comment
        self.hear = hear
        self.membership_type = membership_type
        self.membership_start_time = membership_start_time
        self.membership_expired_time = membership_expired_time


class Admin(db.Model):
    __tablename__ = 'admin'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # 自动生成的序号
    username = db.Column(db.String(50), nullable=False, unique=True, index=True)  # 管理员账号，唯一
    password_hash = db.Column(db.String(128), nullable=False)  # 存储加密后的密码

    # 设置密码时自动加密
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # 检查密码是否正确
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __init__(self, username, password):
        self.username = username
        self.set_password(password)  # 设置并加密密码

class Root(db.Model):
    __tablename__ = 'root'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # 自动生成的序号
    name = db.Column(db.String(50), nullable=False, unique=True, index=True)  # root 名称，唯一
    password = db.Column(db.String(128), nullable=False)  # 直接存储密码，不加密

    def __init__(self, name, password):
        self.name = name
        self.password = password  # 直接存储密码，无需加密
