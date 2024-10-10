from flask import Blueprint, request, jsonify
from app.models import User, Admin
from app.extensions import db
import datetime
from flask import Flask
import chargebee

api = Blueprint('api', __name__)

# Get all members
@api.route('/members', methods=['GET'])
def get_members():
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
    member = User.query.get_or_404(id)
    db.session.delete(member)
    db.session.commit()
    return jsonify({"message": "Member deleted successfully"}), 200

# 用户注册
@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not all(key in data for key in ['first_name', 'last_name', 'email', 'password', 'preferred_name', 'hear', 'membership_type', 'date_of_birth']):
        return jsonify({"error": "Missing required fields"}), 400

    date_of_birth = data.get('date_of_birth')
    if isinstance(date_of_birth, str):
        date_of_birth = datetime.datetime.strptime(date_of_birth, "%d-%m-%Y").date()

    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        preferred_name=data['preferred_name'],
        email=data['email'],
        password=data['password'],
        date_of_birth=date_of_birth,
        comment=data.get('comment', ''),
        hear=data['hear'],
        membership_type=data['membership_type'],
        membership_start_time=datetime.datetime.now(),
        membership_expired_time=datetime.datetime.now() + datetime.timedelta(days=365)
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully", "id": new_user.id}), 201

# User login
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and user.check_password(data['password']):
        return jsonify({"message": "Login successful", "user_id": user.id}), 200
    return jsonify({"error": "Invalid email or password"}), 400

# Get user information
@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
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
    data = request.get_json()
    user = User.query.get_or_404(data['user_id'])
    user.membership_type = data['subscription_type']
    db.session.commit()
    return jsonify({"message": "Subscription successful"}), 200

# 统计 Chargebee 中的全部会员数量
@api.route('/members/count', methods=['GET'])
def count_all_members():
    try:
        # 从 Chargebee 获取会员列表
        result = chargebee.Customer.list({"limit": 100})
        total_members = len(result)
        return jsonify({"total_count": total_members}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# 统计活跃会员数量（有有效订阅的会员）
@api.route('/members/active/count', methods=['GET'])
def count_active_members():
    try:
        result = chargebee.Customer.list({"limit": 100})
        active_members = 0
        for customer in result:
            subscription_result = chargebee.Subscription.list({"customer_id[is]": customer.customer.id})
            if subscription_result and subscription_result[0].subscription.status == 'active':
                active_members += 1

        return jsonify({"active_count": active_members}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


#### 下面是chargebee相关

app = Flask(__name__)

# Chargebee 配置
chargebee.configure(site="aasyp-test", api_key="test_xE1cVWaHbs6UMqorlDHoyOGH8AU6aJhG")

# 查询所有 Chargebee 会员信息
chargebee.configure(site="aasyp-test", api_key="test_xE1cVWaHbs6UMqorlDHoyOGH8AU6aJhG")

# 查询所有 Chargebee 会员信息
@api.route('/list_customers', methods=['GET'])
def list_customers():
    try:
        result = chargebee.Customer.list({"limit": 100})
        customers = [{
            'id': customer.customer.id,
            'first_name': customer.customer.first_name,
            'last_name': customer.customer.last_name,
            'email': customer.customer.email
        } for customer in result]
        return jsonify(customers)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# 获取某个用户的订阅信息
@api.route('/user/<string:user_id>/subscription', methods=['GET'])
def get_subscription(user_id):
    try:
        # 查询该用户的所有订阅
        result = chargebee.Subscription.list({"customer_id[is]": user_id})

        # 取出订阅列表的第一个结果
        subscription = result[0].subscription

        subscription_data = {
            'subscription_id': subscription.id,
            'start_date': subscription.start_date,
            'end_date': subscription.current_term_end
        }
        return jsonify(subscription_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# 更新 Chargebee 会员信息
@api.route('/user/<string:user_id>/update', methods=['POST'])
def update_customer(user_id):
    try:
        data = request.get_json()
        update_params = {}

        # 如果请求中包含这些字段，则添加到更新参数中
        if 'first_name' in data:
            update_params['first_name'] = data['first_name']
        if 'last_name' in data:
            update_params['last_name'] = data['last_name']
        if 'email' in data:
            update_params['email'] = data['email']

        # 调用 Chargebee API 更新会员信息
        customer = chargebee.Customer.update(user_id, update_params).customer

        return jsonify({
            'id': customer.id,
            'first_name': customer.first_name,
            'last_name': customer.last_name,
            'email': customer.email
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
