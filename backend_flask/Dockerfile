
FROM python:3.7

MAINTAINER Dominic Miller

RUN apt update && \
    apt install --no-install-recommends -y build-essential gcc wget
COPY . .
RUN python -m pip install --upgrade pip
RUN pip install cmake
RUN pip install opencv-contrib-python-headless
RUN pip install -r /requirements.txt
RUN wget https://face-off-ai2.s3.amazonaws.com/CUMv6.h5
RUN wget https://face-off-ai2.s3.amazonaws.com/shape_predictor_68_face_landmarks.dat

EXPOSE 5000
CMD ["flask", "run", "--host", "0.0.0.0"]
