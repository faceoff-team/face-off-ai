import dlib
import numpy as np
from os import path, walk
import cv2
import matplotlib.pyplot as plt
from PIL import Image, ImageOps
import argparse
import base64

face_detect = dlib.get_frontal_face_detector()
landmark_predict = dlib.shape_predictor('/Users/dommiller88/Documents/GitHub/face-off-ai/model/scripts/shape_predictor_68_face_landmarks.dat')

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

def find_nth(haystack, needle, n):
    start = haystack.find(needle)
    while start >= 0 and n > 1:
        start = haystack.find(needle, start+len(needle))
        n -= 1
    return start

def transformIndividual(im_b64):
    im_bytes = base64.b64decode(im_b64)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8) 
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    face = face_detect(img, 1)
    for i, face_rect in enumerate(face):
        crop_area = (face_rect.left(), face_rect.top(), face_rect.right(), face_rect.bottom())
        crop_image = img[face_rect.bottom():face_rect.top(), face_rect.left():face_rect.right()]
        image,landmarks = get_landmarks(crop_image)
        if image is not None:
            image_copy = image_landmarks(image, landmarks)
            image_copy = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
            image_copy = cv2.resize(image_copy, (128, 128))
            image_copy = image_copy/255.
            image_copy = np.expand_dims(image_copy, axis=0)
            im_arr = cv2.imencode('.jpg', image_copy)
            im_bytes = im_arr.tobytes()
            im_b64 = base64.b64encode(im_bytes)
            return im_b64
        else:
            return None
        
        



if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--src', required=True)
    parser.add_argument('--dst', required=True)
    args = parser.parse_args()
    print(args.src)
    for subdir, dirs, files in walk(args.src):
        for file in files:
            print(file)
            if (file.endswith('.jpg')):
                prefix = subdir[:(find_nth(subdir, '/', 7))]
                suffix = subdir[find_nth(subdir, '/', 8) + 1:]
                full_path = path.join(prefix, 'modified_data', suffix, file)
                image = cv2.imread(path.join(subdir, file))
                face = face_detect(image, 1)
                crop_image = Image.open(path.join(subdir, file))
                for i, face_rect in enumerate(face):
                    crop_area = (face_rect.left(), face_rect.top(), face_rect.right(), face_rect.bottom())
                    cropped = crop_image.crop(crop_area)
                    cropped = cropped.resize((128,128))
                    dest_true = path.join(args.dst, file)
                    cropped.save(dest_true)
                    image = cv2.imread(dest_true)
                    image, landmarks = get_landmarks(image)
                    if image is not None:
                        image_copy = image_landmarks(image, landmarks)
                        cv2.imwrite(dest_true, image_copy)
                    else:
                        pass
    

            
    
        
    
        
    