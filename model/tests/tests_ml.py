import tensorflow
import os
import cv2
import numpy as np

model = tensorflow.keras.models.load_model('/Users/dommiller88/Documents/GitHub/face-off-ai/model/binaries/modelv6.h5')
global_path = '/Users/dommiller88/Documents/GitHub/face-off-ai/model/tests/testing_data/ML'
emotions = {
    0: 'fear',
    1: 'happy',
    2: 'neutral',
    3: 'sad'
}

def test_1():
    print('Test 1: General Accuracy...\n\n')
    total = 0
    for i in range(4):
        path = f'/Users/dommiller88/Documents/GitHub/face-off-ai/model/tests/testing_data/ML/test_1/{emotions[i]}'
        cur_score = 0
        print(f'Testing {emotions[i]}...\n\n')
        for filename in os.listdir(path):
            image = cv2.imread(os.path.join(path, filename))
            image = image/255.
            image = np.expand_dims(image, axis=0)
            pred = model.predict(image)
            label = pred.argmax(axis=1)
            if (label[0] == i):
                cur_score += 1
        print(f'{emotions[i]} Score: {cur_score}/25\n\n')
        total += cur_score
    print(f'Total Score: {total}/100\n\n')

def test_2():
    print('Test 2: Inanimate Object...\n\n')
    print('Expected Result: Fail')
    image = cv2.imread(os.path.join(global_path, "test_2/test2.jpg"))
    image = cv2.resize(image, (128,128))
    image = image/255.
    image = np.expand_dims(image, axis=0)
    pred = model.predict(image)
    label = pred.argmax(axis=1)
    if (pred[0][label] < 0.60):
        print('Actual: Fail')
    else:
        print('Actual: Pass\n\n')
    
    print('Expected Result: Pass')
    image = cv2.imread(os.path.join(global_path, "test_2/test_2_pass.jpg"))
    image = image/255.
    image = np.expand_dims(image, axis=0)
    pred = model.predict(image)
    label = pred.argmax(axis=1)
    if (pred[0][label] < 0.60):
        print('Actual: Fail')
    else:
        print('Actual: Pass\n\n')

def test_3():
    print("Test 3: Diversity testing 1 (acc. criteria 3-4)...\n\n")
    path = os.path.join(global_path, 'test_3')
    score = 0
    for filename in os.listdir(path):
        image = cv2.imread(os.path.join(path, filename))
        image = image/255.
        image = np.expand_dims(image, axis=0)
        pred = model.predict(image)
        label = pred.argmax(axis=1)
        if (emotions[label[0]] == 'happy'):
            score += 1
    if (score < 7):
        print(f'Fail. Score = {score}/7\n\n')
    else:
        print(f"Pass. Score = {score}/7\n\n")

def test_4():
    print('Test 4: Diversity testing 2 (acc. criteria 5)\n')
    path = os.path.join(global_path, 'test_4')
    score = 0
    for filename in os.listdir(path):
        image = cv2.imread(os.path.join(path, filename))
        image = image/255.
        image = np.expand_dims(image, axis=0)
        pred = model.predict(image)
        label = pred.argmax(axis=1)
        if (emotions[label[0]] in filename):
            score += 1
    if (score < 4):
        print(f'Fail. Score: {score}/4\n\n')
    else:
        print(f'Pass. Score: {score}/4\n')
    
    
    
        
    
    

if __name__ == "__main__":
    test_1()
    test_2()
    test_3()
    test_4()
    
        
    