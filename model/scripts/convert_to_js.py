import tensorflow as tf
from tensorflow import keras
import tensorflowjs as tfjs
from os import path

model = keras.models.load_model('/Users/dommiller88/Documents/GitHub/face-off-ai/model/binaries/modelv6.h5')
model.save('/Users/dommiller88/Documents/GitHub/face-off-ai/model/binaries/modelv6')
model = keras.models.load_model('/Users/dommiller88/Documents/GitHub/face-off-ai/model/binaries/modelv6')

tfjs.converters.save_keras_model(model, '/Users/dommiller88/Documents/GitHub/face-off-ai/model/binaries/modelv6_converted')