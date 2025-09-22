from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)

# 配置DeepSeek API信息
DEEPSEEK_API_URL = "https://api.modelarts-maas.com/v1/chat/completions"
DEEPSEEK_MODEL = "DeepSeek-V3"
DEEPSEEK_API_KEY = "1Ln0bc9O-x7NQ45jc_Jmmpl4QoEWvZIFN6_MFLAeArz9XvJUTV6X63HmRBmkXPG-q4VWCogCaZDvogWhkV_YMA"

# 忽略SSL验证警告（仅用于开发环境）
requests.packages.urllib3.disable_warnings()

@app.route('/chat', methods=['POST'])
def chat():
    try:
        # 获取前端发送的消息
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({"error": "请输入问题内容"}), 400
        
        # 准备调用DeepSeek API的参数
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {DEEPSEEK_API_KEY}'
        }
        
        payload = {
            "model": DEEPSEEK_MODEL,
            "messages": [
                {"role": "system", "content": "你是一个茶叶专家助手，精通各种茶叶知识，可以回答关于茶叶的种类、冲泡方法、功效、历史文化等相关问题，回答要友好、专业且易懂。"},
                {"role": "user", "content": user_message}
            ]
        }
        
        # 调用DeepSeek API
        response = requests.post(
            DEEPSEEK_API_URL,
            headers=headers,
            data=json.dumps(payload),
            verify=False  # 开发环境下关闭SSL验证
        )
        
        # 处理API响应
        if response.status_code == 200:
            result = response.json()
            # 提取AI的回答
            ai_response = result.get('choices', [{}])[0].get('message', {}).get('content', '抱歉，我无法理解你的问题。')
            return jsonify({"response": ai_response})
        else:
            return jsonify({
                "error": f"API请求失败，状态码: {response.status_code}", 
                "details": response.text
            }), response.status_code
            
    except Exception as e:
        return jsonify({"error": f"服务器错误: {str(e)}"}), 500

# 解决跨域问题
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
