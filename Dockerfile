FROM ubuntu:latest

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

RUN apt-get update && apt-get install -y bash && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . /app

RUN chmod +x hello_world.sh

CMD ["./hello_world.sh"]
