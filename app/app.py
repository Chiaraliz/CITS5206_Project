from flask import Flask, request, jsonify

app = Flask(__name__)

# 假设我们有一个简单的用户数据库字典，存储用户的邮箱和密码
# 你可以根据实际情况将这个部分替换成数据库（例如SQLite）
users_db = {}
user_info_db = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'status': '注册失败，缺少必要信息'}), 400

    if email in users_db:
        return jsonify({'status': '注册失败，用户已存在'}), 400

    users_db[email] = password
    return jsonify({'status': '注册成功'}), 201

@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.json
    subscription_info = data.get('subscription_info')
    payment_info = data.get('payment_info')

    if not subscription_info or not payment_info:
        return jsonify({'status': '订阅失败，缺少信息'}), 400

    return jsonify({'status': '订阅成功'}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'status': '登录失败，缺少邮箱或密码'}), 400

    if email not in users_db or users_db[email] != password:
        return jsonify({'status': '登录失败，邮箱或密码不正确'}), 401

    return jsonify({'status': '登录成功'}), 200

@app.route('/get_user_info', methods=['GET'])
def get_user_info():
    user_id = request.args.get('user_id')

    if not user_id or user_id not in user_info_db:
        return jsonify({'status': '用户信息获取失败，用户不存在'}), 404

    return jsonify({'user_info': user_info_db.get(user_id)}), 200

@app.route('/update_user_info', methods=['POST'])
def update_user_info():
    data = request.json
    user_id = data.get('user_id')
    user_info = data.get('user_info')

    if not user_id or user_id not in user_info_db:
        return jsonify({'status': '修改失败，用户不存在'}), 404

    user_info_db[user_id] = user_info
    return jsonify({'status': '修改成功'}), 200

if __name__ == '__main__':
    app.run(debug=True)
