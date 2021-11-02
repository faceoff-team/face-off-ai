FROM python:alpine3.6

# MAINTAINER Dominic Miller




RUN mkdir app

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN apk update
RUN apk add make automake gcc g++ subversion python3-dev

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD ["app.py"]
