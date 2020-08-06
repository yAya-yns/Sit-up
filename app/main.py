from flask import (Flask,json, request, Response)
from flask_cors import CORS, cross_origin
from flask import send_file
from api import tfpose

import multiprocessing

app = Flask(__name__)
cors = CORS(app)

thread = None


@app.route('/calltfpose')
@cross_origin()
def call_tfpose():
    global thread
    thread = multiprocessing.Process(target=sit_up.analysis, args=())
    thread.start()
    status, msg = tfpose.call_tfpose()
    # place-holder return
    return Response(json.dumps({'msg': msg}), status)

@app.route('/close')
def close():
    if thread:
        thread.terminate()
        thread.join()
        return Response(json.dumps({'msg': "closed"}), 200)
    else:
        return Response(json.dumps({'msg': "nothing to close"}), 200)

@app.route('/img')
def img():
    filename = sit_up.get_path()
    return send_file(filename, mimetype='image/gif')

if __name__ == '__main__':
    app.run(debug=True)