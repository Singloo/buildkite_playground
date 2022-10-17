FROM node:16-alpine

RUN apk update \
    && apk add --no-cache bash bash-doc bash-completion

RUN mkdir -p /app

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./

VOLUME [ "./src" "/app/src" ]
VOLUME [ "./build" "/app/build" ]
VOLUME [ "./scripts" "/app/scripts" ]
VOLUME [ "./public" "/app/public" ]

RUN ls ./public

ENTRYPOINT [ "/bin/sh" ]

RUN npm install