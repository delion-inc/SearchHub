FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install
# COPY yarn.lock vite.config.ts tailwind.config.js ./
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "start"]
