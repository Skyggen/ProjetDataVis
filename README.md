# Projet fin de cours DataVis
ProjetDataVis SVG&amp;TMDB

# Les données

## - Où avez-vous trouvé les données ?
Les données ont étées récupérées via l'API du site themoviedb.org ([TMDB](http://https://www.themoviedb.org/?language=fr "TMDB")) via les deux liens suivant :
[Movie](https://api.themoviedb.org/3/movie/popular?language=fr&api_key=e0c090ad9289504f572875f449a5f944 "Movie")
[TvShow](http://https://api.themoviedb.org/3/tv/popular?language=fr&api_key=e0c090ad9289504f572875f449a5f944 "TvShow")
## - Comment vous les avez transformées)
En faisant plusieurs appels sur L'API pour récupérer plusieurs pages de données et les enregistrer via la commande curl > monfichier.json
## - Quels choix vous avez faits et pourquoi
J'ai décidé de construire ma base de données avec  les 3 premières pages des films populaires en effet TMDB bloque par page les requêtes et il est limité en nombre de requête à 40 requêtes pour 10 secondes. Ce qui limite la récupération complête du site. J'ai aussi décidé de ne prendre que les informations en français.
# Visualisation des données
## - Comment vous avez visualisé les données
un nuage de point qui montre les films et séries populaires qui sont placés sur un axe qui montre leurs niveaux de popularité par rapport à leurs notes moyennes des utilisateurs. Un affichage en dehors du graphique pour montrer les détails de se qu'on à pointé.
## - Une explication sur le choix du type de représentation
Pour montrer un maximum d'informations et essayer d'optimiser la navigation avec la souris pour voir les détails des informations. La représentation des détails dans une div externe à été faite pour améliorer la navigation sur le graphique.
# But du projet
## - Ce que vous souhaitez démontrer
Démontrer s'il y a une influence sur les notes par rapport à la popularité du film ou de la série.
## - Le public cible
Cette application est tournée pour les personnes cinéphile et sériephile mais aussi les personnes qui ne savent pas quoi regarder comme film ou série.

# Screenshots
[![Screenshot](https://i.ibb.co/SJ46QTh/screencapture-127-0-0-1-8080-2019-05-13-18-47-34.png)](https://i.ibb.co/SJ46QTh/screencapture-127-0-0-1-8080-2019-05-13-18-47-34.png "Screenshot")
