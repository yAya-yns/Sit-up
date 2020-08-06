import argparse
import logging
import time

import cv2
import numpy as np
import os


from tf_pose.estimator import TfPoseEstimator
from tf_pose.networks import get_graph_path, model_wh
from sit_analysis import analysis_tool, front_analysis_tool, side_analysis_tool

logger = logging.getLogger('TfPoseEstimator-WebCam')
logger.setLevel(logging.DEBUG)
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('[%(asctime)s] [%(name)s] [%(levelname)s] %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

fps_time = 0

def str2bool(v):
    return v.lower() in ("yes", "true", "t", "1")


def analysis(resize = '432x638', model='mobilenet_thin', resize_out_ratio=4, tensorrt=False, os='windows', direction='front', display=True, w=432, h=368, camera=0):
    if w > 0 and h > 0:
        if os == "macos":
            e = TfPoseEstimator(get_graph_path(model), target_size=(w, h), trt_bool=str2bool(tensorrt))
        else:
            e = TfPoseEstimator(get_graph_path(model), target_size=(w, h))
    else:
        if os == "macos":
            e = TfPoseEstimator(get_graph_path(model), target_size=(432, 368), trt_bool=str2bool(tensorrt))
        else:
            e = TfPoseEstimator(get_graph_path(model), target_size=(432, 368))
    logger.debug('cam read+')
    cam = cv2.VideoCapture(camera)
    ret_val, image = cam.read()
    logger.info('cam image=%dx%d' % (image.shape[1], image.shape[0]))

    i=0
    while True:
        ret_val, image = cam.read()
        humans = e.inference(image, resize_to_default=(w > 0 and h > 0), upsample_size=args.resize_out_ratio)
        image = TfPoseEstimator.draw_humans(image, humans, imgcopy=False)

        # Analysis
        if i % 20 == 0:
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

            # Display messages
            y_value = 60
            for message in messages:
                cv2.putText(image, message, (10, y_value),  cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                y_value += 30
            messages = []
        if display:
            cv2.imshow('tf-pose-estimation result', image)
        else:
            path = r'../result'
            cv2.imwrite(os.path.join(path, 'result'+str(i)+'.png'), image)
        i += 1
        if cv2.waitKey(1) == 27:
            break
    cv2.destroyAllWindows()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='tf-pose-estimation realtime webcam')
    parser.add_argument('--camera', type=int, default=0)

    parser.add_argument('--resize', type=str, default='432x368',
                        help='if provided, resize images before they are processed. default=0x0, Recommends : 432x368 or 656x368 or 1312x736 ')
    parser.add_argument('--resize-out-ratio', type=float, default=4.0,
                        help='if provided, resize heatmaps before they are post-processed. default=1.0')

    parser.add_argument('--model', type=str, default='mobilenet_thin', help='cmu / mobilenet_thin / mobilenet_v2_large / mobilenet_v2_small')
    parser.add_argument('--show-process', type=bool, default=False,
                        help='for debug purpose, if enabled, speed for inference is dropped.')

    parser.add_argument('--tensorrt', type=str, default="False",
                        help='for tensorrt process.')
    parser.add_argument('--os', type=str, default='windows', help='please enter windows or mac, windows as default')
    parser.add_argument('--direction', type=str, default='front', help='please specify your direction, front, side45, or side90')
    parser.add_argument('--display', type=str, default='True', help='set to be True if you want to display your result, else False')
    args = parser.parse_args()

    logger.debug('initialization %s : %s' % (args.model, get_graph_path(args.model)))
    w, h = model_wh(args.resize)
    display = args.display == "True"

    analysis(args.resize, args.resize_out_ratio, args.tensorrt, args.os, args.direction, display, w, h, args.camera)
