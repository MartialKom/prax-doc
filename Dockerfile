FROM node:18 as angular


WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

#Deploiement avec nginx
FROM nginx:alpine 
COPY --from=angular /app/dist/prax-doc/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/
RUN ls -l /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]