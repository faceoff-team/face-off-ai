FROM python:alpine3.6

# MAINTAINER Dominic Miller




RUN mkdir app

WORKDIR /app

COPY . /app

RUN apk update
RUN apk add make automake gcc g++ subversion python3-dev

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip3 install https://github.com/better/alpine-tensorflow/releases/download/alpine3.7-tensorflow1.7.0/tensorflow-1.7.0-cp36-cp36m-linux_x86_64.whl

EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD ["app.py"]
