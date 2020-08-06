import argparse
import logging
import time

import cv2
import numpy as np

from tf_pose.estimator import TfPoseEstimator
from tf_pose.networks import get_graph_path, model_wh

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


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='tf-pose-estimation realtime webcam')
    parser.add_argument('--camera', type=int, default=0)

    parser.add_argument('--resize', type=str, default='0x0',
                        help='if provided, resize images before they are processed. default=0x0, Recommends : 432x368 or 656x368 or 1312x736 ')
    parser.add_argument('--resize-out-ratio', type=float, default=4.0,
                        help='if provided, resize heatmaps before they are post-processed. default=1.0')

    parser.add_argument('--model', type=str, default='mobilenet_thin', help='cmu / mobilenet_thin / mobilenet_v2_large / mobilenet_v2_small')
    parser.add_argument('--show-process', type=bool, default=False,
                        help='for debug purpose, if enabled, speed for inference is dropped.')
    
    parser.add_argument('--tensorrt', type=str, default="False",
                        help='for tensorrt process.')
    args = parser.parse_args()

    logger.debug('initialization %s : %s' % (args.model, get_graph_path(args.model)))
    w, h = model_wh(args.resize)
     if w > 0 and h > 0:
        if args.os == "macos":
            e = TfPoseEstimator(get_graph_path(args.model), target_size=(w, h), trt_bool=str2bool(args.tensorrt))
        else:
            e = TfPoseEstimator(get_graph_path(args.model), target_size=(w, h))
    else:
        if args.os == "macos":
            e = TfPoseEstimator(get_graph_path(args.model), target_size=(432, 368), trt_bool=str2bool(args.tensorrt))
        else:
            e = TfPoseEstimator(get_graph_path(args.model), target_size=(432, 368))
    logger.debug('cam read+')
    cam = cv2.VideoCapture(args.camera)
    ret_val, image = cam.read()
    logger.info('cam image=%dx%d' % (image.shape[1], image.shape[0]))

    while True:
        ret_val, image = cam.read()

        #logger.debug('image process+')
        humans = e.inference(image, resize_to_default=(w > 0 and h > 0), upsample_size=args.resize_out_ratio)
        
        #logger.debug('postprocess+')
        image = TfPoseEstimator.draw_humans(image, humans, imgcopy=False)

        #logger.debug('show+')
        for human in humans:
            body_dict = {}
            totalname = ""
            #nose = human.body_parts[0]
            for key in human.body_parts.keys():
                body_dict[str(human.body_parts[key].get_part_name())] = (human.body_parts[key].x, human.body_parts[key].y)
#                totalname += str(human.body_parts[key].get_part_name())
            messages = []
            # Check head orientation
            if "CocoPart.LEar" in body_dict and "CocoPart.REar" in body_dict:
                tan_value = (body_dict["CocoPart.LEar"][1] - body_dict["CocoPart.REar"][1]) / (body_dict["CocoPart.LEar"][0] - body_dict["CocoPart.REar"][0])
                if tan_value > 0.34202 or tan_value < -0.34202:
                    messages.append("Please straight up your head ;)")
            else:
                messages.append("Left ear and right ear are not found")

            
            # Check shoulders are horizontal
            if "CocoPart.LShoulder" in body_dict and "CocoPart.RShoulder" in body_dict:
                tan_value = (body_dict["CocoPart.LShoulder"][1] - body_dict["CocoPart.RShoulder"][1]) / (body_dict["CocoPart.LShoulder"][0] - body_dict["CocoPart.RShoulder"][0])
                if tan_value > 0.17365 or tan_value < -0.17365:
                    messages.append("Please keep your shoulders horizontal ;)")
            else:
                messages.append("Left shoudler and right shoulder are not found")
                    
            # Check arm positions
                # To Do
            # Display messages
            if len(messages) == 0:
                cv2.putText(image, "niCe SIt!!!", (10, 10),  cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            else:
                ver_pos = 10
                for message in messages:
                    cv2.putText(image, "%s" % message, (10, ver_pos),  cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                    ver_pos += 30
                
#            cv2.putText(image, "%s" % totalname, (10, 80),  cv2.FONT_HERSHEY_SIMPLEX, 0.5,
#            (0, 255, 0), 2)
#        cv2.putText(image,
#                    "FPS: %f" % (1.0 / (time.time() - fps_time)),
#                    (10, 10),  cv2.FONT_HERSHEY_SIMPLEX, 0.5,
#                    (0, 255, 0), 2)
        cv2.imshow('tf-pose-estimation result', image)
        fps_time = time.time()
        if cv2.waitKey(1) == 27:
            break
        #logger.debug('finished+')

    cv2.destroyAllWindows()
