# Usa una imagen de Node como base
FROM node:18

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código (esto es opcional en modo desarrollo ya que usaremos un volumen para el código)
COPY . .

# Expone el puerto de desarrollo de Vite (por defecto es 5173)
EXPOSE 5173

# Comando para ejecutar en modo de desarrollo
CMD ["npm", "run", "dev"]
