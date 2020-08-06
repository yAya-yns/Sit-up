from flask import (Flask,json, request, Response)
from flask_cors import CORS, cross_origin
from flask import send_file
from api import tfpose
import sit_up
import multiprocessing
import time
import cv2


import argparse
import logging
import time

import cv2
import numpy as np
import os


from tf_pose.estimator import TfPoseEstimator
from tf_pose.networks import get_graph_path, model_wh
from sit_analysis import analysis_tool, front_analysis_tool, side_analysis_tool

app = Flask(__name__)
cors = CORS(app)

thread = None


class VideoCamera(object):
    def __init__(self):
        # 通过opencv获取实时视频流
        self.video = cv2.VideoCapture(0)


    def __del__(self):
        self.video.release()

    def get_frame(self):
        model = 'mobilenet_thin'
        resize_out_ratio = 4
        tensorrt = False
        _os = 'windows'
        direction = 'front'
        display = False
        w = 432
        h = 368
        camera = 0
        frames = 1
        e = TfPoseEstimator(get_graph_path(model), target_size=(w, h))
        # success, image = self.video.read()
        # 因为opencv读取的图片并非jpeg格式，因此要用motion JPEG模式需要先将图片转码成jpg格式图片
        # ret, jpeg = cv2.imencode('.jpg', image)
        # return jpeg.tobytes()
        ret_val, image = self.video.read()
        humans = e.inference(image, resize_to_default=(w > 0 and h > 0), upsample_size=resize_out_ratio)
        image = TfPoseEstimator.draw_humans(image, humans, imgcopy=False)

        # Analysis
        if len(humans) == 0:
            messages = ["Could not find anyone :<"]
        elif len(humans) == 0:
            messages = ["Find more than one people :<"]
        else:
            for human in humans:
                body_dict = {}
                for key in human.body_parts.keys():
                    name = str(human.body_parts[key].get_part_name())
                    name = name[9:]
                    body_dict[name] = (human.body_parts[key].x, human.body_parts[key].y)
                if direction == "front":
                    tool = front_analysis_tool(body_dict)
                elif direction == "side45":
                    tool = side_analysis_tool(body_dict)
                else:
                    tool = analysis_tool(body_dict)
                messages = tool.analysis()
        return cv2.imencode('.jpg', image)[1].tobytes()




def gen(camera):
    while True:
        frame = camera.get_frame()
        # 使用generator函数输出视频流， 每次请求输出的content类型是image/jpeg
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@app.route('/video_feed')  # 这个地址返回视频流响应
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


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