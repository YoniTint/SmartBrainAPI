FROM node:16.1.0

WORKDIR /usr/smart-brain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]