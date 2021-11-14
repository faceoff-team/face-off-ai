import dlib
import numpy as np
from os import path, walk
import cv2
from PIL import Image, ImageOps
import argparse
import base64
import io

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
    im_b64.replace(" ", "+")
    base64_decoded = base64.b64decode(im_b64)
    image = Image.open(io.BytesIO(base64_decoded))
    img = np.array(image)
    # img = img.astype(np.uint32)
    print(f'shape = {img.shape}')
    img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    cv2.imshow('picture', img)
    face = face_detect(img, 1)
    for i, face_rect in enumerate(face):
        crop_area = (face_rect.left(), face_rect.top(), face_rect.right(), face_rect.bottom())
        print(crop_area)
        crop_image = img[face_rect.top():face_rect.bottom(), face_rect.left():face_rect.right()]
        crop_image = cv2.resize(crop_image, (128, 128))
        cv2.imshow('image', crop_image)
        cv2.waitKey(0)
        image,landmarks = get_landmarks(crop_image)
        if image is not None:
            image_copy = image_landmarks(image, landmarks)
            # image_copy = image_copy/255.
            # image_copy = np.expand_dims(image_copy, axis=0)
            # pil_img = Image.fromarray(image_copy)
            # pil_img.show()
            # buff = io.BytesIO()
            # new_image_string = base64.b64encode(buff.getvalue()).decode("utf-8")
            return image_copy
        else:
            return None
        
        



if __name__ == "__main__":
    
    parser = argparse.ArgumentParser()
    parser.add_argument('--img')
    # parser.add_argument('--src', required=True)
    # parser.add_argument('--dst', required=True)
    args = parser.parse_args()
    image_copy = transformIndividual(args.img)
    pil_img = Image.fromarray(image_copy)
    pil_img.show()
    # print(args.src)
    # for subdir, dirs, files in walk(args.src):
    #     for file in files:
    #         print(file)
    #         if (file.endswith('.jpg')):
    #             prefix = subdir[:(find_nth(subdir, '/', 7))]
    #             suffix = subdir[find_nth(subdir, '/', 8) + 1:]
    #             full_path = path.join(prefix, 'modified_data', suffix, file)
    #             image = cv2.imread(path.join(subdir, file))
    #             face = face_detect(image, 1)
    #             crop_image = Image.open(path.join(subdir, file))
    #             for i, face_rect in enumerate(face):
    #                 crop_area = (face_rect.left(), face_rect.top(), face_rect.right(), face_rect.bottom())
    #                 cropped = crop_image.crop(crop_area)
    #                 cropped = cropped.resize((128,128))
    #                 dest_true = path.join(args.dst, file)
    #                 cropped.save(dest_true)
    #                 image = cv2.imread(dest_true)
    #                 image, landmarks = get_landmarks(image)
    #                 if image is not None:
    #                     image_copy = image_landmarks(image, landmarks)
    #                     cv2.imwrite(dest_true, image_copy)
    #                 else:
    #                     pass
    

            
    
        
    
        
    