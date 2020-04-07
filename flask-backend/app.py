from flask import Flask, render_template, request
import json
app = Flask(__name__)


DATA_PATH = 'data.json' 


@app.route('/data.json', methods=['GET'])
def get_data():
    if DATA_PATH:
        with open(DATA_PATH, 'r') as f:
            datastore = json.load(f)
    return json.dumps(datastore)

def write_json(data):
    with open(DATA_PATH, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/data.json', methods=['PUT'])
def edit_data():
    file_data = json.loads(get_data())

    new_data = request.get_json()
    print('new data:', new_data)
    for i in range(len(file_data['data'])):
        if file_data['data'][i]['id'] == new_data['id']:
            file_data['data'][i] = new_data

    write_json(file_data)
    return file_data

@app.route('/data.json', methods=['POST'])
def add_data():
    # import pudb; pudb.set_trace()
    file_data = json.loads(get_data())

    # python object to be appended
    new_data = request.get_json()

    # append data to file
    file_data['data'].append(new_data)

    write_json(file_data)
    return request.get_json()

@app.route('/data.json', methods=['DELETE'])
def delete_data():
    # gets the id from query string in flask
    args = request.args
    if 'id' in args:
        delete_id = int(args['id'])
    
    # original file data
    file_data = json.loads(get_data())
    for i in range(len(file_data['data'])):
        if file_data['data'][i]['id'] == delete_id:
            file_data['data'].pop(i) # how to delete element
            break

    write_json(file_data)   # write updated data
    return file_data


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3100)
