import tensorflow as tf
import flask
import 'transform' as transform
import base64
import numpy
import cv2
import boto3

s3 = boto3.client('s3')
s3.download_file('s3://face-off-ai', 'CUMv6.h5', 'CUMv6.h5')

app = flask.Flask(__name__)

emotions = {
        0: 'Fear',
        1: 'Happy',
        2: 'Neutral',
        3: 'Sad'
}

model = tf.keras.models.load_model('CUMv6.h5')

@app.route("/predict", methods=["GET","POST"])
def predict():
    data = {'success': 'false'}
    params = flask.request.json
    if (params != None):
        transformed = transform.transformIndividual(params.image)
        im_bytes = base64.b64decode(transformed)
        im_arr = np.frombuffer(im_bytes, dtype=np.uint8) 
        img = cv2.imdecode(im_arr, flags=cv2.IMREAD_GRAYSCALE)
        prob = model.predict(image_copy)
        label = prob.argmax(axis=1)
        data['prediction'] = str(emotions[label[0]])
        data['success'] = 'true'
    return flask.jsonify(data)

app.run(host='0.0.0.0')
        
    
    