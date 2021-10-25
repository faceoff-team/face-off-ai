import tensorflow as tf
import flask
import '../model/scripts/transform' as transform
import base64
import numpy
import cv2

app = flask.Flask(__name__)

emotions = {
        0: 'Fear',
        1: 'Happy',
        2: 'Neutral',
        3: 'Sad'
}

model = tf.keras.models.load_model('/Users/dommiller88/Documents/Github/face-off-ai/model/binaries/modelv6.h5')

@app.route("/predict", methods=["GET","POST"])
def predict():
    data = {'success': False}
    params = flask.request.json
    if (params != None):
        transformed = transform.transformIndividual(params.image)
        im_bytes = base64.b64decode(transformed)
        im_arr = np.frombuffer(im_bytes, dtype=np.uint8) 
        img = cv2.imdecode(im_arr, flags=cv2.IMREAD_GRAYSCALE)
        prob = model.predict(image_copy)
        label = prob.argmax(axis=1)
        data['prediction'] = str(emotions[label[0]])
        data['success'] = True
    return flask.jsonify(data)

app.run(host='0.0.0.0', port=50)
        
    
    