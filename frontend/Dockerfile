FROM node:20
WORKDIR /app
COPY package.json .
RUN yarn install
# COPY yarn.lock vite.config.ts tailwind.config.js ./
COPY . .
RUN yarn build
EXPOSE 4173
CMD ["yarn", "preview"]
