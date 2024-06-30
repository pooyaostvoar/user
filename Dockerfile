FROM node:slim


WORKDIR /app

COPY . .
ENV NODE_ENV=production

RUN echo $NODE_ENV

RUN echo "npm version: $(npm -v)"

RUN npm install --omit=dev


CMD [ "npm", "run dev" ]

EXPOSE 3004