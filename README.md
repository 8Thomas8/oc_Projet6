# oc_Projet6

**Sujet:**

Ce projet consiste à créer un jeu en ligne en JavaScript dans lequel 2 joueurs évoluent chacun leur tour pour s'affronter.

Il faut générer une carte aléatoire, avec des objets/armes/joueurs positionnés de façon aléatoire également.
Ces joueurs doivent pouvoir se déplacer sans passer par dessus un mur, ramasser armes et objets, et enfin se combattre lorsqu'ils sont côte à côte.

Les mouvements et actions sont en tour par tour, les joueurs peuvent se défendre pour diminuer de 50% des dégats, et le premier joueur à 0 point de vie perd la partie.

**Commentaire de l'évaluateur:**

*Avis sur les livrables :*
Le code est propre et bien formaté. L'ensemble est cohérent et bien découpé. Il est facilement réutilisable et extensible, c'est du beau travail.
En bonus un système de soin intéressant en terme de gameplay et bien implémenté

*Avis sur la présentation :*
La présentation est claire et bien organisée. C'est globalement agréable à suivre. Toutes les fonctionnalités sont présentées d'abord graphiquement pour ensuite mieux comprendre le contexte lors de la présentation technique, bravo.


*Avis sur la compréhension et la réalisation du projet :*
L'ensemble des contraintes sont prises en compte, les enjeux sont bien compris et maîtrisés. Le système de soin répond à une analyse du système de jeu trop déterministe.


*Points positifs :*
* Une bonne ergonomie du jeu
* Le code est bien découpé et très propre
* Bonne utilisation de jQuery et de l'objet en général

*Axes d'amélioration :*
* Attention aux conditions, parfois il est plus simple de tester les cas limitant que tous les cas possibles
* Ne pas laisser de code debug commenté dans le rendu final
* Le fichier game.js aurait pu être découpé encore plus pour séparer en Mouvement / Battle / Display par exemple

Dans l'ensemble un très bon travail, bravo et bonne continuation !

**Compétences évaluées:**

* Concevoir une architecture d'application JavaScript réutilisable
* Développer une application JavaScript orientée objet
* Mettre en oeuvre la bibliothèque jQuery dans une application web
