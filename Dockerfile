FROM node:18 as angular


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#Deploiement avec nginx
FROM nginx:stable 
COPY --from=angular /app/dist/ /usr/share/nginx/html
EXPOSE 80