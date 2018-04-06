FROM node:carbon-alpine
ADD ./api /code
WORKDIR /code
RUN npm install -g yarn
RUN yarn && yarn migrate && yarn build
CMD ["node","/code/dist/app.js"]