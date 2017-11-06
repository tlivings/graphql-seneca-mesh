FROM mhart/alpine-node:6.2.0

RUN apk add --no-cache make gcc g++ python

WORKDIR /src
ADD . .

RUN npm install

EXPOSE 39999

CMD ["node", "index.js"]
