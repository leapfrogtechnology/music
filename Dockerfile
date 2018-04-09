FROM node:carbon-alpine
ADD ./api /code
WORKDIR /code
RUN npm install && npm run migrate && npm run build
CMD ["node","/code/dist/app.js"]