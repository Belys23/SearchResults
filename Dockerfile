# Použij Node.js oficiální image
FROM node:20

# Vytvoř a nastav pracovní adresář
WORKDIR /app

# Zkopíruj package.json a package-lock.json
COPY package*.json ./

# Nainstaluj závislosti
RUN npm install

# Zkopíruj zbytek aplikace
COPY . .

# Otevři port, který používáš (např. 3000)
EXPOSE 3000

# Spusť aplikaci
CMD ["node", "index.js"]
