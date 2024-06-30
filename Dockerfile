FROM node:slim


WORKDIR /app

COPY . .
ENV NODE_ENV=production

RUN echo $NODE_ENV

RUN npm install


CMD [ "npm", "run dev" ]

EXPOSE 3004