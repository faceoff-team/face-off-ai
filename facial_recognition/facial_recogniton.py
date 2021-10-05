import cv2
import face_recognition

video = cv2.VideoCapture(0)
face_locations = []

while video.isOpened():
    ret, frame = video.read()
    rgb_frame = frame[:, :, ::-1]
    face_locations = face_recognition.face_locations(rgb_frame)
    for top, right, bottom, left in face_locations:
        image = cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
        #TODO send images to model.
    cv2.imshow('Video', frame)
    if cv2.waitKey(1) % 0xFF == ord('q'):
        break

video.release()
cv2.destroyAllWindows()