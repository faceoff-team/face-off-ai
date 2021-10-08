#!/usr/bin/env python
# coding: utf-8

# In[1]:


get_ipython().system('pip install tensorflow')
import matplotlib.pyplot as plt
import numpy as np
import os
import PIL
import tensorflow as tf

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential


# In[3]:


# import zipfile as zf
# files = zf.ZipFile('data.zip', 'r')
# files.extractall('data')
# files.close()


# In[2]:



import pathlib
directory_train = pathlib.Path("data/data/train")
directory_test = pathlib.Path("data/data/test")


# In[10]:


batch_size = 32
dimension = 128


# In[93]:


train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    rescale=1./255,
    rotation_range=15,
    width_shift_range=0.15,
    height_shift_range=0.15,
    shear_range=0.15,
    zoom_range=0.15,
    horizontal_flip=True,
)

test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory('data/data/train',
                                                   target_size=(dimension,dimension),
                                                   batch_size=32,
                                                    class_mode='sparse',
                                                    color_mode='grayscale'
                                                   )
valid_generator = test_datagen.flow_from_directory('data/data/test',
                                                  target_size=(dimension,dimension),
                                                  batch_size=32,
                                                  class_mode='sparse',
                                                   color_mode='grayscale'
                                                  )


# In[94]:


num_classes = 4

model = Sequential([
    layers.Dense(32, activation='relu', input_shape=(dimension, dimension, 1)),
    layers.Conv2D(filters=64, activation='elu', padding='same', kernel_size=(5,5)),
    layers.BatchNormalization(),
    layers.Conv2D(filters=64, activation='elu', padding='same', kernel_size=(5,5)),
    layers.BatchNormalization(),
    layers.MaxPooling2D(),
    layers.Dropout(0.4),
    layers.Conv2D(filters=128, activation='elu', padding='same', kernel_size=(3,3)),
    layers.BatchNormalization(),
    layers.Conv2D(filters=128, activation='elu', padding='same', kernel_size=(3,3)),
    layers.BatchNormalization(),
    layers.MaxPooling2D(),
    layers.Dropout(0.4),
    layers.Conv2D(filters=256, activation='elu', padding='same', kernel_size=(3,3)),
    layers.BatchNormalization(),
    layers.MaxPooling2D(),
    layers.Dropout(0.5),
    layers.Flatten(),
    layers.Dense(128),
    layers.BatchNormalization(),
    layers.Dropout(0.6),
    layers.Dense(4, activation='sigmoid')
])


# In[95]:


from tensorflow.keras.optimizers import Adam
model.compile(optimizer=Adam(learning_rate = 0.001),
              loss='sparse_categorical_crossentropy',
              metrics=['sparse_categorical_accuracy'])


# In[96]:


model.summary()


# In[97]:


callback = keras.callbacks.TensorBoard(log_dir = 'logs',
                                      histogram_freq = 0,
                                      write_graph = False,
                                      write_images = False)


# In[99]:


epochs=15
history = model.fit_generator(
  generator=train_generator,
  validation_data=valid_generator,
  epochs=epochs,
  callbacks=[callback]
)


# In[100]:


acc = history.history['sparse_categorical_accuracy']
val_acc = history.history['val_sparse_categorical_accuracy']

loss = history.history['loss']
val_loss = history.history['val_loss']

epochs_range = range(epochs)

plt.figure(figsize=(8, 8))
plt.subplot(1, 2, 1)
plt.plot(epochs_range, acc, label='Training Accuracy')
plt.plot(epochs_range, val_acc, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

plt.subplot(1, 2, 2)
plt.plot(epochs_range, loss, label='Training Loss')
plt.plot(epochs_range, val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
plt.show()


# In[ ]:





# In[20]:





# In[101]:


model.save('modelv4.h5')


# In[84]:


m = keras.models.load_model('modelv3.h5')


# In[ ]:


from PIL import Image
img = Image.open('sad.jpg').convert('L')
img.save('greyscale.jpg')


# In[86]:


image = keras.preprocessing.image.load_img('greyscale.png', target_size=(dimension,dimension))
img = np.array(image)
img = img/255.0
img = img.reshape(1, dimension, dimension, 3)


# In[ ]:





# In[87]:


label = m.predict(img)
print(label)


# In[ ]:




