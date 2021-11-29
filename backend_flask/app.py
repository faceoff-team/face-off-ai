import tensorflow as tf
import flask
from flask import request
import base64
import cv2
import numpy as np
from PIL import Image
from io import BytesIO
import transform


# print('Downloading CUM...')
# url = 'https://face-off-ai.s3.amazonaws.com/CUMv6.h5'
# r = requests.get(url)
# with open('CUMv6.h5', 'wb') as mod:
#     mod.write(r.content)
# r = request.get('https://face-off-ai.s3.amazonaws.com/shape_predictor_68_face_landmarks.dat')
# with open('shape_predictor_68_face_landmarks.dat') as pred:
#     pred.write(r.content)
# print('Downloads Complete')


app = flask.Flask(__name__)
print('Server running...')

emotions = {
        0: 'Fear',
        1: 'Happy',
        2: 'Neutral',
        3: 'Sad'
}
print('loading model...')
model = tf.keras.models.load_model('CUMv6.h5')
print('model loaded, good to go!')

@app.route("/predict", methods=["GET","POST"])
def predict():
    data = {'success': 'false'}
    req = request.get_json()
    image = req['image']
    print(image)
    if (image != None):
        transformed = transform.transformIndividual(image)
        if (type(transformed) != None):
            transformed = cv2.cvtColor(transformed, cv2.COLOR_GRAY2RGB)
            transformed = transformed/255.
            transformed = np.expand_dims(transformed, axis=0)
            prob = model.predict(transformed)
            label = prob.argmax(axis=1)
            data['prediction'] = str(emotions[label[0]])
            data['success'] = 'true'
            data['confidence'] = str(prob[label[0]])
            print(type(prob[label[0]]))
        else:
            print("No faces detected")
            data['success'] = False
            data['reason'] = 'No faces detected'
            return flask.jsonify(data)
        
    return flask.jsonify(data)

if __name__ == "__main__":
    app.run(host='0.0.0.0')

        
    
    