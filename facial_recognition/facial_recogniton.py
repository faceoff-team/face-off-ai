import cv2
import face_recognition
import tensorflow
from PIL import Image
import os
import numpy as np
from time import sleep


dimension = 128

def convert(image):
    image = Image.fromarray(image).convert('L')
    image = image.resize((dimension,dimension))
    img = np.array(image)
    img = img/255.0
    img = np.expand_dims()
    return img

if __name__ == "__main__":
    video = cv2.VideoCapture(0)
    face_locations = []
    model = tensorflow.keras.models.load_model('/Users/dommiller88/Documents/GitHub/face-off-ai/model/modelv4.h5')
    emotions = {
        0: 'Fear',
        1: 'Happy',
        2: 'Neutral',
        3: 'Sad'
    }

    while video.isOpened():
        sleep(3)
        ret, frame = video.read()
        rgb_frame = frame[:, :, ::-1]
        face_locations = face_recognition.face_locations(rgb_frame)
        for top, right, bottom, left in face_locations:
            image = cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
            height, width, channels = image.shape
            print(f'initial shape: ({height},{width},{channels})')
            #img = convert(image)
            image = cv2.resize(image, (dimension, dimension))
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            image = image/255.
            image = np.expand_dims(image, axis=0)
            image = np.expand_dims(image, axis=3)
            batch,height,width,channels = image.shape
            print(f'current shape= {batch},{height},{width},{channels}')
            prob = model.predict(image)
            print(prob)
            label = prob.argmax(axis=1)
            print(emotions[label[0]])
        cv2.imshow('Video', frame)
        if cv2.waitKey(1) % 0xFF == ord('q'):
            break

    video.release()
    cv2.destroyAllWindows()