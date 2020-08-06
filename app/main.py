from flask import (Flask,json, request, Response)
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)


@app.route('/ping')
@cross_origin
def ping():
    return Response(json.dumps({'msg': 'pong'}), 200, mimetype=MIMETYPE['json'])
