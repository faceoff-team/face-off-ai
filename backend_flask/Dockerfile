
#STAGE 1 BUILDING
FROM python:3.7-slim as builder

# MAINTAINER Dominic Miller
RUN apt update && \
    apt install --no-install-recommends -y build-essential gcc
COPY requirements.txt /requirements.txt
RUN pip install --no-cache-dir --user -r /requirements.txt


#STAGE 2 RUNTIME
FROM debian:buster-slim
RUN apt update && \
    apt install --no-install-recommends -y build-essential python3 && \
    apt clean && rm -rf /var/lib/apt/lists/*
COPY --from=builder /root/.local/lib/python3.7/site-packages /usr/local/lib/python3.7/dist-packages
COPY . /app
CMD ['python3', 'app.py']
EXPOSE 5000