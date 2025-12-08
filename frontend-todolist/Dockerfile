# ===== BUILD =====
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# ===== NGINX =====
FROM nginx:alpine

# Aponta para a pasta correta do dist
COPY --from=build /app/dist/frontend-todolist/browser /usr/share/nginx/html

# Copiar configuração do nginx (se existir)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
