FROM node:slim
ENV NODE_ENV production


WORKDIR /app

COPY . .

RUN npm install


CMD [ "npm", "run dev" ]

EXPOSE 3004