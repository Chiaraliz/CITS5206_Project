from flask import Blueprint, request, jsonify
from app.models import User, Admin
from app.extensions import db
import datetime

api = Blueprint('api', __name__)

# Get all members
@api.route('/members', methods=['GET'])
def get_members():
    """
    Get a list of all members
    ---
    tags:
      - Members
    responses:
      200:
        description: A list of all members
        schema:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
              first_name:
                type: string
              last_name:
                type: string
              preferred_name:
                type: string
              email:
                type: string
              date_of_birth:
                type: string
                format: date
              comment:
                type: string
              hear:
                type: integer
              membership_type:
                type: integer
              membership_start_time:
                type: string
                format: date-time
              membership_expired_time:
                type: string
                format: date-time
    """
    members = User.query.all()
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
    return jsonify(members_list), 200

# Create a new member
@api.route('/members', methods=['POST'])
def create_member():
    """
    Create a new member
    ---
    tags:
      - Members
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            first_name:
              type: string
            last_name:
              type: string
            preferred_name:
              type: string
            email:
              type: string
            password:
              type: string
            date_of_birth:
              type: string
              format: date
            comment:
              type: string
            hear:
              type: integer
            membership_type:
              type: integer
            membership_expired_time:
              type: string
              format: date-time
    responses:
      201:
        description: Member created successfully
      400:
        description: Invalid input
    """
    data = request.get_json()

    date_of_birth = data.get('date_of_birth')
    if isinstance(date_of_birth, str):
        date_of_birth = datetime.datetime.strptime(date_of_birth, "%d-%m-%Y").date()

    membership_expired_time = data.get('membership_expired_time')
    if isinstance(membership_expired_time, str):
        membership_expired_time = datetime.datetime.strptime(membership_expired_time, "%Y-%m-%d %H:%M:%S")

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
    db.session.add(new_member)
    db.session.commit()
    return jsonify({"message": "Member created successfully", "id": new_member.id}), 201

# Update a member's information
@api.route('/members/<int:id>', methods=['PUT'])
def update_member(id):
    """
    Update a member's information
    ---
    tags:
      - Members
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: The member ID
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            first_name:
              type: string
            last_name:
              type: string
            preferred_name:
              type: string
            email:
              type: string
            date_of_birth:
              type: string
              format: date
            comment:
              type: string
            hear:
              type: integer
            membership_type:
              type: integer
            membership_expired_time:
              type: string
              format: date-time
    responses:
      200:
        description: Member updated successfully
      404:
        description: Member not found
    """
    data = request.get_json()
    member = User.query.get_or_404(id)

    date_of_birth = data.get('date_of_birth', None)
    if date_of_birth and isinstance(date_of_birth, str):
        date_of_birth = datetime.datetime.strptime(date_of_birth, "%d-%m-%Y").date()
    membership_expired_time = data.get('membership_expired_time', None)
    if membership_expired_time and isinstance(membership_expired_time, str):
        membership_expired_time = datetime.datetime.strptime(membership_expired_time, "%Y-%m-%d %H:%M:%S")

    member.first_name = data.get('first_name', member.first_name)
    member.last_name = data.get('last_name', member.last_name)
    member.preferred_name = data.get('preferred_name', member.preferred_name)
    member.email = data.get('email', member.email)
    member.date_of_birth = date_of_birth or member.date_of_birth
    member.comment = data.get('comment', member.comment)
    member.hear = data.get('hear', member.hear)
    member.membership_type = data.get('membership_type', member.membership_type)
    member.membership_expired_time = membership_expired_time or member.membership_expired_time

    db.session.commit()
    return jsonify({"message": "Member updated successfully"}), 200

# Delete a member
@api.route('/members/<int:id>', methods=['DELETE'])
def delete_member(id):
    """
    Delete a member
    ---
    tags:
      - Members
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: The member ID
    responses:
      200:
        description: Member deleted successfully
      404:
        description: Member not found
    """
    member = User.query.get_or_404(id)
    db.session.delete(member)
    db.session.commit()
    return jsonify({"message": "Member deleted successfully"}), 200

# 用户注册
@api.route('/register', methods=['POST'])
def register():
    """
    User registration
    ---
    tags:
      - Users
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            first_name:
              type: string
            last_name:
              type: string
            email:
              type: string
            password:
              type: string
            preferred_name:
              type: string
            comment:
              type: string
            hear:
              type: integer
            membership_type:
              type: integer
            date_of_birth:
              type: string
              format: date
    responses:
      201:
        description: Registration successful
      400:
        description: Registration failed, incomplete input
    """
    data = request.get_json()

    # 检查所有必需字段
    if not all(key in data for key in ['first_name', 'last_name', 'email', 'password', 'preferred_name', 'hear', 'membership_type', 'date_of_birth']):
        return jsonify({"error": "Missing required fields"}), 400

    # 日期处理
    date_of_birth = data.get('date_of_birth')
    if isinstance(date_of_birth, str):
        date_of_birth = datetime.datetime.strptime(date_of_birth, "%d-%m-%Y").date()

    # 创建新用户对象
    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        preferred_name=data['preferred_name'],
        email=data['email'],
        password=data['password'],
        date_of_birth=date_of_birth,
        comment=data.get('comment', ''),  # 可选字段
        hear=data['hear'],
        membership_type=data['membership_type'],
        membership_start_time=datetime.datetime.now(),
        membership_expired_time=datetime.datetime.now() + datetime.timedelta(days=365)  # 默认1年
    )
    # 添加到数据库
    db.session.add(new_user)
    db.session.commit()
    # 返回注册成功消息
    return jsonify({"message": "User registered successfully", "id": new_user.id}), 201

# User login
@api.route('/login', methods=['POST'])
def login():
    """
    User login
    ---
    tags:
      - Users
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            email:
              type: string
            password:
              type: string
    responses:
      200:
        description: Login successful
      400:
        description: Login failed, invalid email or password
    """
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        return jsonify({"message": "Login successful", "user_id": user.id}), 200
    return jsonify({"error": "Invalid email or password"}), 400

# Get user information
@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """
    Get user information
    ---
    tags:
      - Users
    parameters:
      - name: user_id
        in: path
        required: true
        type: integer
        description: User ID
    responses:
      200:
        description: Returns user information
      404:
        description: User not found
    """
    user = User.query.get_or_404(user_id)
    user_data = {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "membership_type": user.membership_type
    }
    return jsonify(user_data), 200

# Update user information
@api.route('/user/<int:user_id>', methods=['POST'])
def update_user(user_id):
    """
    Update user information
    ---
    tags:
      - Users
    parameters:
      - name: user_id
        in: path
        required: true
        type: integer
        description: User ID
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            first_name:
              type: string
            last_name:
              type: string
            email:
              type: string
            membership_type:
              type: integer
    responses:
      200:
        description: Update successful
      400:
        description: Update failed, incomplete input
    """
    data = request.get_json()
    user = User.query.get_or_404(user_id)

    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)
    user.membership_type = data.get('membership_type', user.membership_type)

    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

# User subscription
@api.route('/subscribe', methods=['POST'])
def subscribe():
    """
    User subscription
    ---
    tags:
      - Users
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            user_id:
              type: integer
            subscription_type:
              type: integer
    responses:
      200:
        description: Subscription successful
      400:
        description: Subscription failed
    """
    data = request.get_json()
    user = User.query.get_or_404(data['user_id'])
    user.membership_type = data['subscription_type']
    db.session.commit()
    return jsonify({"message": "Subscription successful"}), 200

# 统计全部用户数量
@api.route('/members/count', methods=['GET'])
def count_all_members():
    """
    Count all members
    ---
    tags:
      - Members
    responses:
      200:
        description: Total number of members
        schema:
          type: object
          properties:
            total_count:
              type: integer
    """
    total_members = User.query.count()
    return jsonify({"total_count": total_members}), 200

# 统计活跃用户数量（会员有效期大于当前时间的）
@api.route('/members/active/count', methods=['GET'])
def count_active_members():
    """
    Count active members
    ---
    tags:
      - Members
    responses:
      200:
        description: Number of active members (membership not expired)
        schema:
          type: object
          properties:
            active_count:
              type: integer
    """
    current_time = datetime.datetime.now()
    active_members = User.query.filter(User.membership_expired_time > current_time).count()
    return jsonify({"active_count": active_members}), 200