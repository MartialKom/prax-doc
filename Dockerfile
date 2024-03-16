FROM node:18 as angular


WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build

#Deploiement avec nginx
FROM nginx:stable 
COPY --from=angular /app/dist/prax-doc/ /usr/share/nginx/html
RUN ls -l /usr/share/nginx/html
EXPOSE 80