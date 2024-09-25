from flask import Blueprint, request, jsonify
from app.models import User, Admin
from app.extensions import db
import datetime

api = Blueprint('api', __name__)

# 获取所有成员信息
@api.route('/members', methods=['GET'])
def get_members():
    # 查询所有用户数据
    members = User.query.all()
    # 将数据格式化为 JSON 格式
    members_list = [{
        "id": member.id,
        "first_name": member.first_name,
        "last_name": member.last_name,
        "preferred_name": member.preferred_name,
        "email": member.email,
        "date_of_birth": member.date_of_birth.strftime("%Y-%m-%d") if member.date_of_birth else None,
        "comment": member.comment,
        "hear": member.hear,
        "membership_type": member.membership_type,
        "membership_start_time": member.membership_start_time.strftime("%Y-%m-%d %H:%M:%S") if member.membership_start_time else None,
        "membership_expired_time": member.membership_expired_time.strftime("%Y-%m-%d %H:%M:%S") if member.membership_expired_time else None
    } for member in members]
    # 返回 JSON 数据
    return jsonify(members_list), 200

# 创建新成员
@api.route('/members', methods=['POST'])
def create_member():
    # 获取请求中的 JSON 数据
    data = request.get_json()

    # 检查日期是否为字符串并转换
    date_of_birth = data.get('date_of_birth')
    if isinstance(date_of_birth, str):
        date_of_birth = datetime.datetime.strptime(date_of_birth, "%d-%m-%Y").date()

    membership_expired_time = data.get('membership_expired_time')
    if isinstance(membership_expired_time, str):
        membership_expired_time = datetime.datetime.strptime(membership_expired_time, "%Y-%m-%d %H:%M:%S")

    # 创建新用户对象
    new_member = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        preferred_name=data['preferred_name'],
        email=data['email'],
        password=data['password'],
        date_of_birth=date_of_birth,
        comment=data.get('comment'),
        hear=data['hear'],
        membership_type=data['membership_type'],
        membership_start_time=datetime.datetime.now(),
        membership_expired_time=membership_expired_time
    )
    # 添加到数据库
    db.session.add(new_member)
    db.session.commit()
    # 返回成功消息
    return jsonify({"message": "Member created successfully", "id": new_member.id}), 201

# 更新成员信息
@api.route('/members/<int:id>', methods=['PUT'])
def update_member(id):
    # 获取请求中的 JSON 数据
    data = request.get_json()
    # 根据 ID 查找成员
    member = User.query.get_or_404(id)

    # 检查日期字段
    date_of_birth = data.get('date_of_birth', None)
    if date_of_birth and isinstance(date_of_birth, str):
        date_of_birth = datetime.datetime.strptime(date_of_birth, "%d-%m-%Y").date()
    membership_expired_time = data.get('membership_expired_time', None)
    if membership_expired_time and isinstance(membership_expired_time, str):
        membership_expired_time = datetime.datetime.strptime(membership_expired_time, "%Y-%m-%d %H:%M:%S")

    # 更新成员信息
    member.first_name = data.get('first_name', member.first_name)
    member.last_name = data.get('last_name', member.last_name)
    member.preferred_name = data.get('preferred_name', member.preferred_name)
    member.email = data.get('email', member.email)
    member.date_of_birth = date_of_birth or member.date_of_birth
    member.comment = data.get('comment', member.comment)
    member.hear = data.get('hear', member.hear)
    member.membership_type = data.get('membership_type', member.membership_type)
    member.membership_expired_time = membership_expired_time or member.membership_expired_time

    # 提交修改到数据库
    db.session.commit()
    # 返回成功消息
    return jsonify({"message": "Member updated successfully"}), 200

# 删除成员
@api.route('/members/<int:id>', methods=['DELETE'])
def delete_member(id):
    # 根据 ID 查找成员
    member = User.query.get_or_404(id)
    # 删除成员
    db.session.delete(member)
    db.session.commit()
    # 返回删除成功消息
    return jsonify({"message": "Member deleted successfully"}), 200

# 用户注册
@api.route('/register', methods=['POST'])
def register():
    # 获取请求中的 JSON 数据
    data = request.get_json()

    # 检查必需字段
    if not all(key in data for key in ['first_name', 'last_name', 'email', 'password']):
        return jsonify({"error": "Missing required fields"}), 400

    # 日期处理
    date_of_birth = data.get('date_of_birth')
    if isinstance(date_of_birth, str):
        date_of_birth = datetime.datetime.strptime(date_of_birth, "%d-%m-%Y").date()

    # 创建新用户对象
    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=data['password'],
        date_of_birth=date_of_birth,
        membership_start_time=datetime.datetime.now(),
        membership_expired_time=datetime.datetime.now() + datetime.timedelta(days=365)  # 默认1年
    )
    # 添加到数据库
    db.session.add(new_user)
    db.session.commit()
    # 返回注册成功消息
    return jsonify({"message": "User registered successfully", "id": new_user.id}), 201

# 用户登录
@api.route('/login', methods=['POST'])
def login():
    # 获取请求中的 JSON 数据
    data = request.get_json()
    # 根据邮箱查找用户
    user = User.query.filter_by(email=data['email']).first()
    # 验证密码
    if user and user.check_password(data['password']):
        return jsonify({"message": "Login successful", "user_id": user.id}), 200
    return jsonify({"error": "Invalid email or password"}), 400

# 获取用户信息
@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    # 根据用户 ID 查找用户
    user = User.query.get_or_404(user_id)
    # 返回用户数据
    user_data = {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "membership_type": user.membership_type
    }
    return jsonify(user_data), 200

# 修改用户信息
@api.route('/user/<int:user_id>', methods=['POST'])
def update_user(user_id):
    # 获取请求中的 JSON 数据
    data = request.get_json()
    # 根据用户 ID 查找用户
    user = User.query.get_or_404(user_id)

    # 更新用户信息
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)
    user.membership_type = data.get('membership_type', user.membership_type)

    # 提交修改到数据库
    db.session.commit()
    # 返回成功消息
    return jsonify({"message": "User updated successfully"}), 200

# 用户订阅
@api.route('/subscribe', methods=['POST'])
def subscribe():
    # 获取请求中的 JSON 数据
    data = request.get_json()
    # 根据用户 ID 查找用户
    user = User.query.get_or_404(data['user_id'])
    # 更新会员类型
    user.membership_type = data['subscription_type']
    # 提交修改到数据库
    db.session.commit()
    # 返回订阅成功消息
    return jsonify({"message": "Subscription successful"}), 200
