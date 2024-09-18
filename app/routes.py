from flask import Blueprint, request, jsonify
from app.models import User
from app.extensions import db
import datetime

api = Blueprint('api', __name__)

@api.route('/members', methods=['GET'])
def get_members():
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
    member = User.query.get_or_404(id)
    db.session.delete(member)
    db.session.commit()
    return jsonify({"message": "Member deleted successfully"}), 200
