import cv2
import face_recognition
import tensorflow
from PIL import Image
import os
import numpy as np
from time import sleep
from os import path, walk
import cv2
import matplotlib.pyplot as plt
import dlib


dimension = 128

def convert(image):
    image = Image.fromarray(image).convert('L')
    image = image.resize((dimension,dimension))
    img = np.array(image)
    img = img/255.0
    img = np.expand_dims()
    return img

def get_landmarks(image):
    face = face_detect(image, 1)
    if len(face):
        landmarks = [(p.x, p.y) for p in landmark_predict(image, face[0]).parts()]
    else:
        return None,None
    return image, landmarks

def image_landmarks(image, landmarks):
    radius = -1
    circle_thickness = 4
    image_copy = image.copy()
    for (x, y) in landmarks:
        cv2.circle(image_copy, (x,y), circle_thickness, (255,0,0))
        # plt.imshow(image_copy, interpolation='nearest')
        # plt.axis('off')
        # plt.show()
    return image_copy

if __name__ == "__main__":
    video = cv2.VideoCapture(0)
    face_locations = []
    model = tensorflow.keras.models.load_model('/Users/dommiller88/Documents/GitHub/face-off-ai/model/binaries/modelv6.h5')
    face_detect = dlib.get_frontal_face_detector()
    landmark_predict = dlib.shape_predictor('/Users/dommiller88/Documents/GitHub/face-off-ai/model/scripts/shape_predictor_68_face_landmarks.dat')
    emotions = {
        0: 'Fear',
        1: 'Happy',
        2: 'Neutral',
        3: 'Sad'
    }

    while video.isOpened():
        ret, frame = video.read()
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
        #rgb_frame = frame[:, :, ::-1]
        face = face_detect(frame, 1)
        # face_locations = face_recognition.face_locations(rgb_frame)
        for i, face_rect in enumerate(face):
            x1 = face_rect.left()
            x2 = face_rect.right()
            y1 = face_rect.bottom()
            y2 = face_rect.top()
            image = cv2.rectangle(frame, (x1, y2), (x2, y1), (0, 0, 255), 2)
            # image = cv2.resize(image, (128, 128))
            # cv2.imshow('Video', frame)
            image, landmarks = get_landmarks(image)
            if image is not None:
                image_copy = image_landmarks(image, landmarks)
                image_copy = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
                image_copy = cv2.resize(image_copy, (128, 128))
                image_copy = image_copy/255.
                #cv2.imshow('Video', image_copy)
                height, width, channels = image_copy.shape
                print(f'{height}, {width}, {channels}\n')
                image_copy = np.expand_dims(image_copy, axis=0)
                prob = model.predict(image_copy)
                print(prob)
                label = prob.argmax(axis=1)
                print(emotions[label[0]])
                frame = cv2.putText(frame, emotions[label[0]], (x1, y2-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
            else:
                print('found nothing\n')
        frame = cv2.cvtColor(frame, cv2.COLOR_GRAY2BGR)
        cv2.imshow('Video', frame)
        if cv2.waitKey(1) % 0xFF == ord('q'):
            break

    video.release()
    cv2.destroyAllWindows()