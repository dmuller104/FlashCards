from flask import Flask, send_from_directory, request, jsonify
import os
import json

app = Flask(__name__, static_url_path='')

@app.route('/', methods=['GET'])
def index():
    return send_from_directory('static', 'file1.html')

@app.route('/sets', methods=['GET'])
def sets():
    sets_lst = [f for f in os.listdir('res/sets') if f.endswith('.json')]
    return jsonify({'length':len(sets_lst), 'sets':sets_lst})

@app.route('/<filename>', methods=['GET'])
def base_file(filename):
    filepath = os.path.join('static', filename)
    if os.path.exists(filepath):# and os.path.isfile(filepath):
        return send_from_directory('static', filename)
    else:
        return jsonify({'error': f'{filename} not found'}), 404

@app.route('/sets/<filename>', methods=['GET', 'PUT', 'DELETE'])
def set_file(filename):
    filepath = os.path.join('res/sets', filename)

    # Handle GET request
    if request.method == 'GET':
        if os.path.exists(filepath):
            return send_from_directory('res/sets', filename)
        else:
            return jsonify({'error': f'{filename} not found'}), 404
    
    # Handle DELETE request
    elif request.method == 'DELETE':
        if os.path.exists(filepath):
            os.remove(filepath)
            return jsonify({'status':'deleted'}), 200
        else:
            return jsonify({'error': f'{filename} not found'}), 404
    
    # Handle PUT request (to update or create a file)
    elif request.method == 'PUT':
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        fileExisted = os.path.exists(filepath)
        with open(filepath, 'w') as file:
            file.write(json.dumps(data))
        if fileExisted:
            return jsonify({'status':'updated'}), 200
        else:
            return jsonify({'status':'created'}), 201

    else:
        return jsonify({'error': 'Invalid method'}), 405

if __name__ == '__main__':
    app.run(debug=True)
