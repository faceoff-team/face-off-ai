FROM python:alpine3.6

# MAINTAINER Dominic Miller

RUN pip install --upgrade pip

RUN pip install --upgrade https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow_cpu-2.6.0-cp36-cp36m-manylinux2010_x86_64.whl

RUN mkdir app

WORKDIR /app

COPY . /app

RUN apk update
RUN apk add make automake gcc g++ subversion python3-dev

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD ["app.py"]
