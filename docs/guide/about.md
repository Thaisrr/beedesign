# À propos

## D'où vient Beedesign

Beedesign est parti de mes besoins personnels : un design system que j'avais construit pour mon portfolio. Ça traînait dans ma tête depuis un moment. Je l'ai sorti de mon projet, documenté, testé, et publié en open source pour que d'autres puissent s'en servir.

## Les principes

**Accessible par défaut.** L'accessibilité n'est pas une option à activer ni une couche ajoutée à la fin. Chaque composant est pensé pour le clavier et les lecteurs d'écran dès le départ :

- un focus toujours visible au clavier ;
- une modale et un drawer qui gardent le focus à l'intérieur, se ferment avec Échap et rendent le focus à la fermeture ;
- des erreurs et des avertissements annoncés tout de suite aux lecteurs d'écran, les autres messages poliment ;
- aucune information portée par la couleur seule ;
- des animations réduites quand le système le demande.

**Thémable sans effort.** Tout passe par des variables CSS préfixées `--bd-`. Pas de fichier de configuration ni d'outil de build en plus : vous changez des variables, et le mode sombre suit. Voir [Thème et tokens](/guide/theming).

**Petit et lisible.** Neuf composants et trois composables, sans aucune dépendance autre que Vue. Environ 5 ko de JavaScript et 3 ko de CSS une fois compressés. Chaque composant a une API courte et typée, pour que le code reste facile à lire, à relire et à corriger.

**Testé et documenté.** La bibliothèque compte plus de 200 tests, dont des vérifications d'accessibilité automatiques avec axe. La documentation existe en français et en anglais, avec le code de chaque exemple prêt à copier.

## Où en est le projet

C'est une version 0.x : elle fonctionne, mais l'API peut encore évoluer. Voici honnêtement ce qui n'est pas encore couvert :

- les contrastes de couleurs ne sont pas vérifiés automatiquement ;
- les tests tournent dans un environnement simulé, et je n'ai pas encore essayé la bibliothèque avec de vrais lecteurs d'écran.

Si vous remarquez un problème d'accessibilité, c'est le retour qui m'aide le plus.

## La suite

- **Flex et Grid plus flexibles.** Aujourd'hui, les points de rupture sont fixes (768 px pour `BeeFlex`, 1000 px pour `BeeGrid`) et le nombre de colonnes ne change pas selon la largeur de l'écran. Je veux les rendre réglables, avec par exemple un nombre de colonnes différent selon la taille de l'écran.
- **De nouveaux composants.** La liste se construira avec vos retours : dites-moi ce qui vous manque.
- **Aller plus loin sur l'accessibilité.** Des tests de contraste automatiques, des tests dans un vrai navigateur, et des essais avec des lecteurs d'écran.

## Qui je suis

Je m'appelle Thaïs. Je suis développeuse fullstack et formatrice, basée à Calais. Je suis venue au développement vers 2018, avec un parcours en lettres, par un bootcamp puis des diplômes. Je travaille avec Vue, React, Angular, TypeScript et Node. J'ai aussi publié Abra.js, un petit wrapper TypeScript autour de `fetch`.

Vous me trouverez sur [GitHub](https://github.com/Thaisrr).

## Contribuer

Les retours sont les bienvenus, quel que soit leur format :

- un bug ou une idée : ouvrez une [issue](https://github.com/Thaisrr/beedesign/issues) ;
- une correction ou un nouveau composant : proposez une pull request.

Chaque changement est accompagné de ses tests et de sa documentation, en français et en anglais.

Le code est sur [GitHub](https://github.com/Thaisrr/beedesign) et le paquet sur [npm](https://www.npmjs.com/package/@thaisrr/beedesign).