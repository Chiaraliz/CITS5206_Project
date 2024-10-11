from flask import Blueprint, request, jsonify
from app.models import User, Admin
from app.extensions import db
import datetime
import jwt


api = Blueprint('api', __name__)

# Secret key for signing JWT
SECRET_KEY = 'your_secret_key'  # Change this to your secret key


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
        date_of_birth = datetime.datetime.strptime(data['date_of_birth'], "%Y-%m-%d").date()


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
        description: Login successful with JWT token
      400:
        description: Login failed, invalid email or password
    """
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    # Check if user exists and password matches
    if user and user.check_password(data['password']):
        # Generate JWT token
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
        }, SECRET_KEY, algorithm='HS256')
        
        return jsonify({"message": "Login successful", "user_id": user.id, "token": token}), 200
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
        "preferred_name": user.preferred_name,
        "email": user.email,
        "date_of_birth": user.date_of_birth.strftime("%Y-%m-%d") if user.date_of_birth else None
    }
    return jsonify(user_data), 200

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
    user.preferred_name = data.get('preferred_name', user.preferred_name)
    user.email = data.get('email', user.email)
    user.date_of_birth = datetime.datetime.strptime(data.get('date_of_birth'), "%Y-%m-%d") if data.get('date_of_birth') else user.date_of_birth

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


# Admin Registration
@api.route('/admin/register', methods=['POST'])
def register_admin():
    """
    Admin registration
    ---
    tags:
      - Admin
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
            password:
              type: string
    responses:
      201:
        description: Admin registered successfully
      400:
        description: Registration failed, incomplete input
    """
    data = request.get_json()

    # Check if all required fields are present
    if not all(key in data for key in ['username', 'password']):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if the admin username already exists
    existing_admin = Admin.query.filter_by(username=data['username']).first()
    if existing_admin:
        return jsonify({"error": "Admin already exists"}), 400

    # Create new admin
    new_admin = Admin(username=data['username'], password=data['password'])
    db.session.add(new_admin)
    db.session.commit()
    return jsonify({"message": "Admin registered successfully", "id": new_admin.id}), 201

# Admin Login
@api.route('/admin/login', methods=['POST'])
def login_admin():
    """
    Admin login
    ---
    tags:
      - Admin
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
            password:
              type: string
    responses:
      200:
        description: Admin login successful
      400:
        description: Login failed, invalid username or password
    """
    data = request.get_json()

    # Check if the admin exists and the password is correct
    admin = Admin.query.filter_by(username=data['username']).first()
    if admin and admin.check_password(data['password']):
        return jsonify({"message": "Admin login successful", "admin_id": admin.id}), 200

    return jsonify({"error": "Invalid username or password"}), 400

# Root Login (Special Route)
@api.route('/root/login', methods=['POST'])
def login_root():
    """
    Root login (Special)
    ---
    tags:
      - Root
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            root_username:
              type: string
            root_password:
              type: string
    responses:
      200:
        description: Root login successful
      400:
        description: Login failed, invalid root credentials
    """
    data = request.get_json()

    # Check if the provided root credentials are correct
    root_username = "root"
    root_password = "supersecretpassword"  # This should be stored securely in a real system

    if data.get('root_username') == root_username and data.get('root_password') == root_password:
        return jsonify({"message": "Root login successful"}), 200

    return jsonify({"error": "Invalid root credentials"}), 400

# Manage Admins (e.g., List all admins, delete an admin)
@api.route('/admin/manage', methods=['GET'])
def list_admins():
    """
    List all admins
    ---
    tags:
      - Admin
    responses:
      200:
        description: Admin list retrieved successfully
      400:
        description: Error occurred during operation
    """
    # List all admins
    admins = Admin.query.all()
    admin_list = [{
        "id": admin.id,
        "username": admin.username
    } for admin in admins]
    return jsonify(admin_list), 200

@api.route('/admin/manage/<int:admin_id>', methods=['DELETE', 'POST'])
def manage_admin(admin_id):
    """
    Manage Admin (Delete or Update)
    ---
    tags:
      - Admin
    parameters:
      - name: admin_id
        in: path
        required: true
        type: integer
        description: Admin ID to delete or update
      - name: body
        in: body
        required: true for POST
        schema:
          type: object
          properties:
            username:
              type: string
              description: New username for the admin
            password:
              type: string
              description: New password for the admin
    responses:
      200:
        description: Admin updated or deleted successfully
      404:
        description: Admin not found
    """
    if request.method == 'DELETE':
        # 删除管理员
        admin = Admin.query.get_or_404(admin_id)
        db.session.delete(admin)
        db.session.commit()
        return jsonify({"message": "Admin deleted successfully"}), 200

    elif request.method == 'POST':
        # 更新管理员信息
        data = request.get_json()

        # 获取管理员实例
        admin = Admin.query.get_or_404(admin_id)

        # 更新用户名
        if 'username' in data:
            admin.username = data['username']

        # 更新密码
        if 'password' in data:
            admin.set_password(data['password'])  # 确保使用哈希保存密码

        db.session.commit()

        return jsonify({"message": "Admin updated successfully"}), 200


# # 统计 Chargebee 中的全部会员数量
# @api.route('/members/count', methods=['GET'])
# def count_all_members():
#     try:
#         # 从 Chargebee 获取会员列表
#         result = chargebee.Customer.list({"limit": 100})
#         total_members = len(result)
#         return jsonify({"total_count": total_members}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

# # 统计活跃会员数量（有有效订阅的会员）
# @api.route('/members/active/count', methods=['GET'])
# def count_active_members():
#     try:
#         result = chargebee.Customer.list({"limit": 100})
#         active_members = 0
#         for customer in result:
#             subscription_result = chargebee.Subscription.list({"customer_id[is]": customer.customer.id})
#             if subscription_result and subscription_result[0].subscription.status == 'active':
#                 active_members += 1

#         return jsonify({"active_count": active_members}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400


# #### 下面是chargebee相关

# app = Flask(__name__)

# # Chargebee 配置
# chargebee.configure(site="aasyp-test", api_key="test_xE1cVWaHbs6UMqorlDHoyOGH8AU6aJhG")

# # 查询所有 Chargebee 会员信息
# chargebee.configure(site="aasyp-test", api_key="test_xE1cVWaHbs6UMqorlDHoyOGH8AU6aJhG")

# # 查询所有 Chargebee 会员信息
# @api.route('/list_customers', methods=['GET'])
# def list_customers():
#     try:
#         result = chargebee.Customer.list({"limit": 100})
#         customers = [{
#             'id': customer.customer.id,
#             'first_name': customer.customer.first_name,
#             'last_name': customer.customer.last_name,
#             'email': customer.customer.email
#         } for customer in result]
#         return jsonify(customers)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400

# # 获取某个用户的订阅信息
# @api.route('/user/<string:user_id>/subscription', methods=['GET'])
# def get_subscription(user_id):
#     try:
#         # 查询该用户的所有订阅
#         result = chargebee.Subscription.list({"customer_id[is]": user_id})

#         # 取出订阅列表的第一个结果
#         subscription = result[0].subscription

#         subscription_data = {
#             'subscription_id': subscription.id,
#             'start_date': subscription.start_date,
#             'end_date': subscription.current_term_end
#         }
#         return jsonify(subscription_data), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400
    
# if __name__ == '__main__':
#     app.run(debug=True)