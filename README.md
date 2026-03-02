# App de Graphiques Neuropsychologiques

Ce projet permet de générer des graphiques complexes dans Webflow à partir d'un fichier JS externe.

## Flux de travail (Workflow)

1. **Développement local** : Taper `npm start` pour lancer le serveur Parcel.
2. **Lien Webflow** : Utiliser `http://localhost:1234/app.js` pour tester en direct.
3. **Mise en ligne** : Faire un "Push" sur GitHub pour mettre à jour la version via jsDelivr.

## Fichiers principaux

- `app.js` : Contient toute la logique de calcul et d'affichage (Chart.js).
- `package.json` : Configuration des outils (Parcel).
