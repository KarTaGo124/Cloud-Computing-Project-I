# Usa una imagen base de Node
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Instalar nodemon y typescript globalmente
RUN npm install -g nodemon typescript

# Copiar el resto de la aplicación
COPY . .

# Compilar el proyecto TypeScript
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 8081

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
