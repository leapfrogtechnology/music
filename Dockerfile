FROM node:8.8.1-alpine
ADD ./api /code
WORKDIR /code
RUN npm install
RUN npm run migrate
RUN npm run build
CMD ["node","/code/dist/app.js"]
