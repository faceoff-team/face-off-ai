import dlib
import numpy as np
from os import path, walk
import cv2
from PIL import Image, ImageOps
import argparse
import base64
import pandas as pd

face_detect = dlib.get_frontal_face_detector()
landmark_predict = dlib.shape_predictor('/Users/dommiller88/Documents/GitHub/face-off-ai/model/scripts/shape_predictor_68_face_landmarks.dat')

def get_landmarks(image, df):
    print(len(df.columns))
    JAWLINE_X = []
    JAWLINE_Y = []
    R_EYEBROW_X = []
    R_EYEBROW_Y = []
    L_EYEBROW_X = []
    L_EYEBROW_Y = []
    NOSE_BR_X = []
    NOSE_BR_Y = []
    NOSE_LOW_X = []
    NOSE_LOW_Y = []
    R_EYE_X = []
    R_EYE_Y = []
    L_EYE_X = []
    L_EYE_Y = []
    MOUTH_INNER_X = []
    MOUTH_INNER_Y = []
    MOUTH_OUTER_X = []
    MOUTH_OUTER_Y = []
    if len(face):
        x = landmark_predict(image, face[0])
        for i in range(0,68):
            print(i)
            p = x.part(i)
            print(f'current part: ({p.x}, {p.y})')
            if i <= 16:
                JAWLINE_X.append(p.x)
                JAWLINE_Y.append(p.y)
            elif i <= 21:
                R_EYEBROW_X.append(p.x)
                R_EYEBROW_Y.append(p.y)
            elif i <= 26:
                L_EYEBROW_X.append(p.x)
                L_EYEBROW_Y.append(p.y)
            elif i <= 30:
                NOSE_BR_X.append(p.x)
                NOSE_BR_Y.append(p.y)
            elif i <= 35:
                NOSE_LOW_X.append(p.x)
                NOSE_LOW_Y.append(p.y)
            elif i <= 41:
                R_EYE_X.append(p.x)
                R_EYE_Y.append(p.y)
            elif i <= 47:
                L_EYE_X.append(p.x)
                L_EYE_Y.append(p.y)
            elif i <= 59:
                MOUTH_OUTER_X.append(p.x)
                MOUTH_OUTER_Y.append(p.y)
            else:
                MOUTH_INNER_X.append(p.x)
                MOUTH_INNER_Y.append(p.y)
        new_row = [JAWLINE_X, JAWLINE_Y, R_EYEBROW_X, R_EYEBROW_Y, L_EYEBROW_X, L_EYEBROW_Y, NOSE_BR_X, NOSE_BR_Y, NOSE_LOW_X, NOSE_LOW_Y, R_EYE_X, R_EYE_Y, L_EYE_X, L_EYE_Y, MOUTH_INNER_X, MOUTH_INNER_Y, MOUTH_OUTER_X, MOUTH_OUTER_Y]
        for l in new_row:
            print(f'check it out: {l}')
        new_row = pd.Series(new_row, index=df.columns)
        df = df.append(new_row, ignore_index=True)
        print(df)
        # landmarks = [(p.x, p.y) for p in landmark_predict(image, face[0]).parts()]
    return df

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
        print(landmarks)
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
    parser.add_argument('--file', required=True)
    args = parser.parse_args()
    print(args.src)
    df = pd.DataFrame(columns=['JAWLINE_X','JAWLINE_Y', 'R_EYEBROW_X','R_EYEBROW_Y', 'L_EYEBROW_X', 'L_EYEBROW_Y', 'NOSE_BR_X', 'NOSE_BR_Y', 'NOSE_LOW_X', 'NOSE_LOW_Y', 'R_EYE_X', 'R_EYE_Y', 'L_EYE_X', 'L_EYE_Y', 'MOUTH_INNER_X', 'MOUTH_INNER_Y', 'MOUTH_OUTER_X', 'MOUTH_OUTER_Y'])
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
                    df = get_landmarks(image, df)
                    # if image is not None:
                    #     image_copy = image_landmarks(image, landmarks)
                    #     cv2.imwrite(dest_true, image_copy)
                    # else:
                    #     pass
    df.to_csv(f'{args.file}')
    

            
    
        
    
        
    