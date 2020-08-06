from flask import (Flask,json, request, Response)
from flask_cors import CORS, cross_origin
from api import tfpose

app = Flask(__name__)
cors = CORS(app)


@app.route('/ping')
@cross_origin
def ping():
    return Response(json.dumps({'msg': 'pong'}), 200, mimetype=MIMETYPE['json'])

@app.route('/calltfpose')
@cross_origin()
def call_tfpose():
    status, msg = tfpose.call_tfpose()
    # place-holder return 
    return Response(json.dumps({'msg': msg}), status)