FROM node:18


WORKDIR /app

COPY . .
ENV NODE_ENV=production

RUN echo $NODE_ENV

RUN echo "npm version: $(npm -v)"   


RUN npm ci --production


CMD [ "npm", "run dev" ]

EXPOSE 3004