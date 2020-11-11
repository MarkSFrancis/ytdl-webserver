FROM node:lts as builder

WORKDIR /app

# Only install node_modules if the package.json changes
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive

COPY . ./
RUN yarn build

ENV NODE_ENV=production
RUN yarn --frozen-lockfile --non-interactive

FROM node:lts-slim

WORKDIR /app

ADD package.json ./

COPY --from=builder ./app/node_modules ./node_modules/
COPY --from=builder ./app/.next ./.next/
COPY --from=builder ./app/public ./public/

ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "start"]
