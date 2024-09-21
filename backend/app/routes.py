from flask import Blueprint, request, jsonify
from app.models import User,Admin
from app.extensions import db
import datetime

api = Blueprint('api', __name__)

@api.route('/members', methods=['GET'])
def get_members():
    """
    Get list of all members
    ---
    tags:
      - Members
    responses:
      200:
        description: A list of members
        schema:
          type: array
          items:
            type: object
            properties:
              id:
                type: integer
                description: The member ID
              first_name:
                type: string
                description: The member's first name
              last_name:
                type: string
                description: The member's last name
              preferred_name:
                type: string
                description: The member's preferred name
              email:
                type: string
                description: The member's email
              date_of_birth:
                type: string
                format: date
                description: The member's date of birth
              comment:
                type: string
                description: Optional comment about the member
              hear:
                type: integer
                description: Member's hearing condition (1-7 scale)
              membership_type:
                type: integer
                description: Type of membership
              membership_start_time:
                type: string
                format: date-time
                description: The time the membership started
              membership_expired_time:
                type: string
                format: date-time
                description: The time the membership expires
    """
    members = User.query.all()
    members_list = [{
        "id": member.id,
        "first_name": member.first_name,
        "last_name": member.last_name,
        "preferred_name": member.preferred_name,
        "email": member.email,
        "date_of_birth": member.date_of_birth.strftime("%d-%m-%Y"),
        "comment": member.comment,
        "hear": member.hear,
        "membership_type": member.membership_type,
        "membership_start_time": member.membership_start_time,
        "membership_expired_time": member.membership_expired_time
    } for member in members]
    return jsonify(members_list), 200

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
    new_member = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        preferred_name=data['preferred_name'],
        email=data['email'],
        password=data['password'],
        date_of_birth=datetime.datetime.strptime(data['date_of_birth'], "%d-%m-%Y").date(),
        comment=data.get('comment'),
        hear=data['hear'],
        membership_type=data['membership_type'],
        membership_start_time=datetime.datetime.now(),
        membership_expired_time=data['membership_expired_time']
    )
    db.session.add(new_member)
    db.session.commit()
    return jsonify({"message": "Member created successfully", "id": new_member.id}), 201

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
    member.first_name = data.get('first_name', member.first_name)
    member.last_name = data.get('last_name', member.last_name)
    member.preferred_name = data.get('preferred_name', member.preferred_name)
    member.email = data.get('email', member.email)
    member.date_of_birth = datetime.datetime.strptime(data['date_of_birth'], "%d-%m-%Y").date()
    member.comment = data.get('comment', member.comment)
    member.hear = data['hear']
    member.membership_type = data['membership_type']
    member.membership_expired_time = data['membership_expired_time']
    db.session.commit()
    return jsonify({"message": "Member updated successfully"}), 200

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
    用户注册
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
    responses:
      201:
        description: 注册成功
      400:
        description: 注册失败，输入不完整
    """
    data = request.get_json()
    if not all(key in data for key in ['first_name', 'last_name', 'email', 'password']):
        return jsonify({"error": "Missing required fields"}), 400

    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        password=data['password'],
        date_of_birth=datetime.datetime.strptime(data['date_of_birth'], "%d-%m-%Y").date(),
        membership_start_time=datetime.datetime.now(),
        membership_expired_time=datetime.datetime.now() + datetime.timedelta(days=365)  # 默认1年
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully", "id": new_user.id}), 201

# 用户登录
@api.route('/login', methods=['POST'])
def login():
    """
    用户登录
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
        description: 登录成功
      400:
        description: 登录失败，用户名或密码错误
    """
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        return jsonify({"message": "Login successful", "user_id": user.id}), 200
    return jsonify({"error": "Invalid email or password"}), 400

# 获取用户信息
@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """
    获取用户信息
    ---
    tags:
      - Users
    parameters:
      - name: user_id
        in: path
        required: true
        type: integer
        description: 用户ID
    responses:
      200:
        description: 返回用户信息
      404:
        description: 用户未找到
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

# 修改用户信息
@api.route('/user/<int:user_id>', methods=['POST'])
def update_user(user_id):
    """
    修改用户信息
    ---
    tags:
      - Users
    parameters:
      - name: user_id
        in: path
        required: true
        type: integer
        description: 用户ID
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
        description: 修改成功
      400:
        description: 修改失败，输入不完整
    """
    data = request.get_json()
    user = User.query.get_or_404(user_id)

    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)
    user.membership_type = data.get('membership_type', user.membership_type)
    
    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

# 用户订阅
@api.route('/subscribe', methods=['POST'])
def subscribe():
    """
    用户订阅
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
        description: 订阅成功
      400:
        description: 订阅失败
    """
    data = request.get_json()
    user = User.query.get_or_404(data['user_id'])
    user.membership_type = data['subscription_type']
    db.session.commit()
    return jsonify({"message": "Subscription successful"}), 200