
FROM python:3.7-slim

MAINTAINER Dominic Miller

RUN apt update && \
    apt install --no-install-recommends -y build-essential gcc wget
COPY . .
RUN python -m pip install --upgrade pip
RUN pip install cmake
RUN pip install -r /requirements.txt

CMD ["python", "app.py"]
EXPOSE 5000
