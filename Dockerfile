FROM node:dubnium-stretch-slim

WORKDIR /home/app

# Only install node_modules if the package.json changes
COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]