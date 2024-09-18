from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event, select, func, or_
from sqlalchemy.orm import scoped_session, sessionmaker

db = SQLAlchemy()