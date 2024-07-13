Voici le fichier `README.md` mis à jour selon vos spécifications :

```markdown
# Test Products Project

## Description

Ce projet est une application web de gestion de produits, comprenant un backend en Node.js/Express connecté à une base de données MongoDB, et un frontend en React. L'application permet de consulter, ajouter, modifier et supprimer des produits.

## Prérequis

Assurez-vous d'avoir les logiciels suivants installés sur votre machine :
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Installation

Clonez ce dépôt sur votre machine locale :

```bash
git clone https://github.com/votre-utilisateur/test-products.git
cd test-products
```

### Backend

1. Naviguez dans le répertoire `backend` :
   
   ```bash
   cd backend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Créez un fichier `.env` à la racine du répertoire `backend` avec le contenu suivant :

   ```plaintext
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017
   DB_NAME=productsDB
   JWT_SECRET=2GwiBYuByM9f6i7kfU6aRGgNrnz7GAUe
   ```

4. Démarrez le serveur backend :

   ```bash
   npm start
   ```

### Frontend

1. Naviguez dans le répertoire `frontend` :

   ```bash
   cd ../frontend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Démarrez l'application frontend :

   ```bash
   npm start
   ```

## Utilisation

Une fois que le backend et le frontend sont en cours d'exécution, ouvrez votre navigateur et allez à l'adresse suivante :

```
http://localhost:3000
```

Vous pourrez alors consulter, ajouter, modifier et supprimer des produits.
```

Ce fichier `README.md` contient les informations nécessaires pour configurer et démarrer votre projet, en excluant les sections que vous avez demandées de retirer.
