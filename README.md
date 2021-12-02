# Demo Mongoose et Redis

Application backend en Node [Express](https://expressjs.com/fr/) avec un CRUD sur des utilisateurs et une mise en cache des reponse d'une API [JSON Placeholder](https://jsonplaceholder.typicode.com/).

## Dependences

- [NodeJS](https://nodejs.org/fr/)
- npm (inclus avec NodeJS)
- Un serveur [MongoDB](https://www.mongodb.com/fr-fr)
- Un server [Redis](https://redis.io/)

## Lancer le projet

Assurez vous d'avoir vos bases de données lancées.

Installer les dépendences de NodeJS: `npm install`.

Lancer le projet avec npm: `npm start`.

## Mongo et Mongoose

Cette application récupére des données d'utilisateur dans une base MongoDB (NoSQL orientée Document). Pour simplifier les requêtes, l'ODM (Object Document Mapping) [Mongoose](https://mongoosejs.com/) à été installé.

Mongoose passe par des [Schema](https://mongoosejs.com/docs/guide.html#definition), qui renseignent les type des champs, si ils sont requis, etc.

Mongoose permet ensuite de construire un [Model](https://mongoosejs.com/docs/models.html) à partir de ce schema. Ce model contient toutes les méthodes pour communiquer avec la collection sur laquelle le Model est basé.

## Redis

Redis est une base de donnée clé - valeur. Elle est principalement utilisé comme serveur de mise en cache des données.

Ici elle permet de mettre en cache une requête effectuée sur JSON Placeholder.

La mise en cache a deux avantages principaux:

- Accélérer les requêtes: aux lieu de lancer une nouvelle requête à l'API qui retournera **trés certainement** la même reponse, Redis fouille dans son cache et retourne cette reponse. Ainsi nous convertisson une requête réseau *lente* (Axios ou fetch) en requête mémoire *trés rapide*.
- Répondre à la place de l'API: La pluspart des API publiques appliquent un quotas ou une limite de requêtes pour leur utilisation (gratuite ou payante, cf: [Tarification OpenWeatherMap](https://openweathermap.org/price)). Redis peut encaisser les requêtes à la place de cette API et ainsi faire économiser des appels API.

![Schema de mise en cache avec Redis](./assets/mise-en-cache-redis-bg.svg)
