ARG BUILDKITE_PLUGIN_DOCKER_ECR_CACHE_EXPORT_IMAGE
ARG BUILDKITE_PLUGIN_DOCKER_ECR_CACHE_EXPORT_TAG

FROM ${BUILDKITE_PLUGIN_DOCKER_ECR_CACHE_EXPORT_IMAGE}:${BUILDKITE_PLUGIN_DOCKER_ECR_CACHE_EXPORT_TAG} as modules


FROM node:16-alpine

RUN apk update \
    && apk add --no-cache bash bash-doc bash-completion

RUN mkdir -p /app

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./

COPY --from=modules /app/node_modules /app/node_modules