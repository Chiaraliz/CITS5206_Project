import requests
from requests.auth import HTTPBasicAuth

# 设置 API 访问密钥
api_key = 'test_xE1cVWaHbs6UMqorlDHoyOGH8AU6aJhG'

# Chargebee API 的基础 URL (根据你的地区来选择)
base_url = 'https://aasyp-test.chargebee.com/api/v2/'  # 替换 <your-site> 为你的 Chargebee 站点名称

# 示例：获取客户列表
def get_customers():
    url = f'{base_url}customers'
    response = requests.get(url, auth=HTTPBasicAuth(api_key, ''))
    
    if response.status_code == 200:
        customers = response.json()
        print(customers)
    else:
        print(f"Failed to fetch data: {response.status_code}, {response.text}")

# 调用函数获取客户信息
get_customers()
