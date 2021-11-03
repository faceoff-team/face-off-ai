
#STAGE 1 BUILDING
FROM python:3.7-slim

# MAINTAINER Dominic Miller
RUN apt update && \
    apt install --no-install-recommends -y build-essential gcc wget
COPY . .
RUN pip install cmake
RUN pip install --no-cache-dir --user -r /requirements.txt

CMD ['python', 'app/app.py']
EXPOSE 5000
