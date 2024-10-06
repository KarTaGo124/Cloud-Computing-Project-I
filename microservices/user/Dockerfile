FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install
# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8081

# Command to run the application
CMD ["npm", "start"]

#first run on user directory rm -rf node_modules package-lock.json && npm install && npm start
#then run docker compose