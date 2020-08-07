import cv2
import numpy as np
import glob
import os

img_array = []
i = 0
size = 0,0
for file in sorted(glob.glob('./result/*.png'), key=os.path.getmtime):
    img = cv2.imread(file)
    height, width, layers = img.shape
    size = (width, height)
    img_array.append(img)

out = cv2.VideoWriter('../sitUpFrontEnd/src/assets/video/result.mp4', cv2.VideoWriter_fourcc(*'mp4v'), 35.0, size)

for i in range(len(img_array)):
    out.write(img_array[i])
out.release
