# Dockerfile

# Étape 1 : Utiliser une image Node.js officielle
FROM node:18

# Étape 2 : Définir le dossier de travail
WORKDIR /app

# Étape 3 : Copier les fichiers nécessaires
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste du projet
COPY . .

# Étape 6 : Exposer le port utilisé par l’app
EXPOSE 5000

# Étape 7 : Lancer l’application
CMD ["npm", "start"]
