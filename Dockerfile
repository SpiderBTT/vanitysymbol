FROM node:lts

USER root
#RUN apt update && apt install -y openssl && apt upgrade
RUN npm install --global symbol-cli@0.20.2 symbol-sdk rxjs typescript ts-node
COPY src /code
WORKDIR /code
RUN npm install && tsc index.ts
COPY scripts/entrypoint.sh /
ENTRYPOINT [ "/entrypoint.sh" ]
