from flask_migrate import Migrate
from app import create_app
from app.extensions import db
from app.setting import DevelopmentConfig
from flask_cors import CORS  # 导入 CORS

app = create_app(DevelopmentConfig)

# 启用 CORS 支持，允许所有来源访问
CORS(app)  # 或者 CORS(app, resources={r"/api/*": {"origins": "*"}}) 指定具体路由

migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(port=5000)
