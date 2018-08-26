FROM node:8

WORKDIR /app
COPY package.json /app
RUN yarn


COPY . /app
CMD node keystone
EXPOSE 80