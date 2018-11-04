# TP SNCF

TP réalisé dans le cadre d'une formation ...

## Nécessite

- PHP >= 7.2

## Guide de déploiement

### Installation des dépendences

Une fois le dépôt git récupéré, rendez-vous à la racine du projet, puis, dans votre terminal, installez les dépendences via `composer` :

```bash
composer install
```

### Initialisation de la configuration

Renommez le fichier `env.json` situé à la racine du projet

```bash
mv env.json.example env.json
```

Une fois ceci fait, complétez les informations d'identification à MySQL.  
Vous devriez trouver cette structure à compléter (dans le fichier `env.json`) :

```json
"database": {
  "host": "",
  "port": "",
  "user": "",
  "passwd": ""
}
```

### Démarrage du serveur

Tout est prêt !  
Démarrez le serveur avec la commande suivante :

```bash
php app.php
```

Vous devriez voir un message en console du type :

> [xxxx-xx-xx xx:xx:xx] Server started and listening on xxx.xxx.xxx.xxx:xxxx ...

Y'a plus qu'à ... !