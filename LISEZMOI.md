# Rubalise : installer l'appli sur Android

Ce dossier contient l'appli (dans `www/`) et deux façons de l'installer sur ton téléphone.
Choisis la voie A pour essayer vite, la voie B pour obtenir un vrai fichier APK.

---

## Voie A : installer comme une appli (sans APK), environ 10 minutes

C'est la plus simple. L'appli s'installe depuis Chrome, a son icône, s'ouvre en plein écran
et fonctionne **hors connexion** après la première ouverture (utile en montagne).

1. Va sur https://app.netlify.com/drop
2. Glisse le dossier **`www`** (ou le zip de ce dossier) dans la zone de dépôt.
3. Netlify te donne une adresse en `netlify.app`.
   Crée un compte gratuit pour la garder : sans compte, le site est supprimé au bout d'environ une heure.
4. Ouvre cette adresse **avec Chrome sur ton téléphone Android**.
5. Menu ⋮ de Chrome, puis **« Installer l'application »** (ou « Ajouter à l'écran d'accueil »).

Pour publier une mise à jour : modifie `www/index.html`, change le numéro de version dans
`www/sw.js` (ligne `const CACHE = 'rubalise-v1'`), puis dépose à nouveau le dossier `www`.

---

## Voie B : un vrai fichier APK, compilé gratuitement sur GitHub, environ 20 minutes

Tu n'as pas besoin d'installer Android Studio : GitHub compile l'APK pour toi.

1. Crée un compte gratuit sur https://github.com puis un **nouveau dépôt** (« New repository »),
   par exemple `rubalise`.
2. Dans le dépôt : **Add file, puis Upload files**. Glisse **tout le contenu** de ce dossier
   (les dossiers `www`, `assets`, `.github` et les fichiers `package.json`, `capacitor.config.json`, etc.).
   Valide avec **Commit changes**.
   - Si le dossier caché `.github` n'a pas été envoyé : **Add file, puis Create new file**,
     tape le nom `.github/workflows/build-apk.yml` et colle le contenu de ce fichier.
3. Ouvre l'onglet **Actions**. Si GitHub le demande, active les workflows.
   Choisis **Build APK**, puis **Run workflow**.
4. Attends 5 à 10 minutes. Quand la ligne devient verte, ouvre-la et télécharge
   **`rubalise-apk`** en bas de la page. C'est un zip qui contient `app-debug.apk`.
5. Envoie le fichier `app-debug.apk` sur ton téléphone et ouvre-le. Android te demandera
   d'autoriser l'installation d'applications de cette source : accepte.

Remarques :
- C'est un APK de test (« debug »). Il s'installe sans problème sur ton téléphone, mais il ne convient
  pas à une publication sur le Play Store : il faudrait alors le signer.
- Si la compilation échoue (ligne rouge), ouvre le détail de l'étape en erreur et envoie-moi le message.
- Dans l'APK, l'import de fichier GPX utilise le sélecteur de fichiers d'Android.

---

## À savoir

- Les données de l'appli (course, pointages, carnet) restent sur le téléphone, dans l'appli.
- La police Barlow se télécharge depuis Google au premier lancement. Sans connexion au tout premier
  lancement, l'appli utilise la police du téléphone, sans conséquence sur le fonctionnement.
- Le partage avec l'assistance se fait toujours par « code du plan » (copier, envoyer, coller).

---

## Mettre à jour l'appli (nouvelle version de `index.html`)

1. Sur GitHub, ouvre le dossier **`www`** du dépôt.
2. **Add file, puis Upload files**, glisse le nouveau `index.html` dans la page, puis **Commit changes**.
   Il remplace l'ancien. Pour obtenir un nouvel APK, lance la compilation à la main : onglet **Actions**, **Build APK**, **Run workflow**.
3. Télécharge le nouvel APK et installe-le **par-dessus** l'ancien : tes données sont conservées.

## Suivi en direct (Firebase)

- Le coureur crée un code dans l'onglet **Assistance** (« Partager en direct »).
- L'assistance et les supporters saisissent ce code (« Rejoindre ») : ils voient le plan et les heures de passage
  se recalculer, et peuvent pointer les passages.
- Sans réseau, les pointages sont gardés sur le téléphone et envoyés dès que le signal revient.
- Le suivi en direct ne fonctionne **pas** dans l'aperçu web de Claude (il bloque les connexions externes),
  seulement dans l'APK ou l'appli installée.

## Espace coureur et comptes (version 3)

- Le coureur crée un compte (e-mail et mot de passe) avec le bouton **Se connecter** en haut à droite.
  Un onglet **Coureur** apparaît alors : il y saisit sa date de naissance, ses fréquences cardiaques et une
  performance de référence, et obtient ses zones de FC et d'allure. Ces données sont enregistrées dans son compte.
- Partager une course en direct demande d'être connecté. Rejoindre une course avec un code reste possible sans compte.
- **Important** : colle le contenu du fichier `firestore.rules` dans Firebase (Firestore Database, onglet Règles,
  Publier). Sans ces nouvelles règles, la connexion et le partage seront refusés.

## Version 0.4 : menu du profil, vue horizontale, réinitialisation

- **Menu du profil** (rond en haut à droite) : espace coureur, paramètres du compte (mot de passe, export des données,
  suppression du compte), préférences (thème clair/sombre, valeurs par défaut d'une nouvelle course), aide, déconnexion.
- **Plan** : « Réinitialiser le plan » (garde le GPX) et « Supprimer la course » (efface le GPX et le plan, sans en importer un autre).
- **Vue horizontale** du profil (Plan et En course) : touche un point numéroté pour voir le ravito
  (arrivée prévue, matériel à prévoir) et un bouton pour le modifier.

## Version 0.5 : suivi de la montre et position du coureur

- **Assistance, « Suivi de la montre »** : le coureur colle le lien de suivi en direct de sa montre
  (LiveTrack chez Garmin, Live Tracking chez Coros). Ce lien est partagé avec l'équipe.
- **En course, « Position du coureur »** : l'assistance ouvre le lien, lit où se trouve le coureur et saisit son kilomètre
  (ou touche le profil). Les heures d'arrivée se recalculent. Pas de changement des règles Firestore.
- **Profil** : bouton « Enregistrer dans mon compte » et statut de l'enregistrement.

## Version 0.5.1 : profil du coureur plus fiable

- Si l'enregistrement du profil dans le compte échoue (par exemple règles Firestore non publiées), l'appli l'affiche clairement
  et garde une copie du profil sur le téléphone : elle n'est plus perdue à la déconnexion. Le profil est renvoyé
  dès que l'enregistrement fonctionne.
- L'écran de connexion repasse en mode « Me connecter » après une inscription.

## Version 0.6 : suivi par la localisation du téléphone

- **Assistance, « Position GPS du téléphone »** (coureur, après avoir partagé la course) : le téléphone envoie le kilomètre
  du coureur sur le parcours toutes les 15 à 40 secondes. Seul le kilomètre est envoyé, jamais les coordonnées.
  L'arrêt est automatique à l'arrivée.
- **Il faut réimporter le GPX** des anciennes courses : les coordonnées n'étaient pas conservées jusqu'ici.
- **APK** : la compilation ajoute maintenant le module de localisation en arrière-plan (fichiers `native-src/native.js`,
  `package.json`, `capacitor.config.json`) et les autorisations Android (étape « Autorisations Android » du workflow).
  Au premier démarrage du suivi, Android demande l'autorisation de localisation, puis (Android 13 et plus) celle des
  notifications : une notification permanente reste affichée tant que le suivi tourne.
- **Dans le navigateur ou la version Netlify**, le suivi fonctionne aussi, mais seulement écran allumé et page ouverte.
- **Si la compilation échoue** à l'étape « Assembler le pont natif », elle continue quand même : l'appli utilisera alors
  la localisation du navigateur intégré (écran allumé). Envoie le message d'erreur pour que je corrige.
- **Quitter un suivi** (côté assistance) efface le plan, les pointages et la position de l'appareil.
  **Arrêter le partage** (côté coureur) supprime le code du serveur et garde le plan sur le téléphone.

## Version 0.7 : autorisations demandées automatiquement, position liée aux pointages

- **Autorisations** : au premier lancement de l'APK, Android demande la localisation puis les notifications. Elles sont
  redemandées au démarrage du suivi GPS si elles ne sont pas accordées. Dans Assistance, la section « Position GPS » affiche
  leur état, avec un bouton pour les redemander et un autre pour ouvrir les réglages du téléphone si elles ont été refusées.
  La page Aide, « À propos », indique si le module natif de localisation est bien présent dans l'appli.
- **Pointage d'un ravito** : la position du coureur se met à jour au kilomètre du ravito (et revient au ravito précédent si
  tu annules le pointage).
- **Position manuelle** : le formulaire disparaît quand la position GPS est en direct (reçue il y a moins de 10 minutes)
  et revient automatiquement en secours si le signal est perdu.
- **Fichiers à envoyer sur GitHub** : `package.json` (nouveau module), `native-src/native.js`, et le dossier `www`
  (`index.html`, `sw.js`). Le fichier de compilation n'a pas changé.

## Version 0.8 : connexion Google, une adresse = un seul compte

- **Connexion** : bouton « Continuer avec Google » sur l'écran de connexion. Dans l'APK, Google s'ouvre dans le navigateur du
  téléphone (Chrome), puis la page `auth-callback.html` (publiée sur GitHub Pages) renvoie dans l'appli par le lien
  `fr.rubalise.app://`. Aucune clé de signature ni client Android n'est nécessaire.
- **Doublons** : réglage Firebase « Lier les comptes qui utilisent le même e-mail ». Si Firebase ne relie pas tout seul, l'appli
  explique comment associer Google au compte existant. Paramètres du compte, « Méthodes de connexion » : associer Google à un
  compte mot de passe, ou définir un mot de passe pour un compte Google.
- **Règles Firestore** : les comptes de toute méthode (hors anonyme) peuvent utiliser l'espace coureur et partager une course.
- **Clé de signature fixe** : `keystore/debug.keystore` est utilisée à chaque compilation, pour que les mises à jour s'installent
  par-dessus l'ancienne version. **Le premier APK signé avec cette clé s'installe après avoir désinstallé l'ancien** (une seule fois).
- **Fichiers à envoyer sur GitHub** : `auth-callback.html` et `package.json` (racine), `native-src/native.js`, le dossier `keystore`,
  `www/index.html`, `www/sw.js`, puis le fichier de compilation (`.github/workflows/build-apk.yml`) en dernier.
- **GitHub Pages** : Settings, Pages, branche `main`, dossier `/ (root)`. La page doit s'ouvrir à l'adresse
  https://tom1estnza.github.io/rubalise/auth-callback.html

## Version 0.9 : accueil, guide de démarrage, interface plus claire

- **Première ouverture** : écran d'accueil avec le logo Rubalise, la connexion (Google ou e-mail), un champ pour entrer le code
  d'un coureur (sans compte) et un lien « Continuer sans compte ». Cet écran n'apparaît qu'une fois.
- **Guide de démarrage** : 8 étapes qui parcourent les onglets (une course d'exemple est affichée si aucune course n'existe).
  Il se lance après la première connexion ou le « Continuer sans compte », et se relance depuis « ? » puis « Revoir le guide ».
- **Interface** : icônes dans la barre du bas, bouton « ? » d'aide dans l'en-tête, liste « Avant le départ » dans Plan,
  raccourcis Objectif / Ravitos / Nutrition, phrases d'explication sous les titres, accueil en cartes, mini-lexique dans l'aide.
- **Autorisations Android** : demandées après l'accueil et le guide, plus à l'ouverture de l'appli.

## Version 1.0 : estimations dynamiques, matériel partagé, 3D

- **Heures de passage** : plus de « ralentissement de fin de course ». Dès les premiers pointages (ou positions), l'appli compare le
  temps réel au temps prévu tronçon par tronçon (les derniers comptent davantage) et recalcule toutes les heures suivantes.
- **Départ donné** : bouton dans « En course », partagé avec toute l'équipe. Les heures partent de cette minute.
- **Barrières horaires** : préremplies à 5,5 km/h (réglable), modifiables ravito par ravito.
- **Matériel** : demandes du coureur verrouillées pour l'assistance, qui peut ajouter les siennes (gels, barres, compotes, sodas, vêtements).
  Les besoins (gels, barres, eau, sodium) sont des nombres entiers, calculés d'un point accessible à l'assistance au suivant.
- **GPS** : rythme d'envoi réglable (auto 2 min, 1, 2, 5 ou 10 min). Éviter les envois toutes les 15 à 40 s (radio mobile et batterie).
- **Vue horizontale** : bouton « 3D » (tracé en relief, rotation au doigt, zoom, relief ×1 à ×5).
- **Règles Firestore** : `firestore.rules` mis à jour (bloc `users/{uid}` explicite). À republier dans Firebase.
- **Fichiers à envoyer sur GitHub** : `www/index.html` et `www/sw.js`.

## Version 1.1

- **Guide** : le cadre entoure toujours le bon onglet (correction du débordement horizontal de la page Plan, qui décalait le menu).
- **Vue horizontale** : « Préparer ce ravito » ouvre l'onglet Assistance sur le ravito visé.
- **Matériel** : cases de quantité réduites avec boutons + et −, liste de vêtements pour le trail (choix multiple + « autre »), cases à cocher rondes.
- **Départ** : confirmation à l'heure prévue en un geste, heure modifiable, heure prévue repoussable.
- **GPS** : « Activer au départ » : démarre au départ confirmé, s'arrête à l'arrivée.
- **3D** : bouton « Satellite » (photos aériennes IGN en France, Esri ailleurs) et liens Google Maps.
- **Fichiers à envoyer sur GitHub** : `www/index.html` et `www/sw.js`.

## Version 1.2
- Guide : le cadre autour de l'onglet se recalcule en continu (il ne reste plus figé si la barre du bas bouge après coup).
- Vue horizontale : le bouton de la fiche ouvre le ravito dans l'onglet Assistance (matériel, quantités, vêtements).
- Matériel : quantité avec boutons + et −, liste de vêtements pour le trail, cases à cocher rondes.
- Départ : confirmation à l'heure prévue, autre heure, modification ; GPS armé qui démarre quand le départ est donné.
- 3D : fond satellite (IGN en France, Esri ailleurs), liens « Vue satellite » et « Itinéraire » sur chaque ravito.

## Version 1.4
- Guide : l'étape « Espace coureur » affiche la page Coureur derrière le cadre.
- Champs : contour de focus à 60 % de transparence.
- Départ : le champ « heure repoussée » reste dans la carte, même sur petit écran.
- 3D satellite : vrai relief du terrain (AWS Terrain Tiles) sous l'image aérienne, tracé posé sur le sol, ombrage du relief,
  zone chargée environ 4 fois plus grande que le tracé (plus de vide en tournant), image plus nette autour du tracé.

## Signature de l'APK (erreur « package en conflit »)
La clé de signature est maintenant intégrée dans `.github/workflows/build-apk.yml` : toutes les compilations sont signées
avec la même clé (SHA1 47:FA:63:0F:...:DA:C3), même si le dossier `keystore` est absent du dépôt.
Si l'ancienne appli installée a été signée avec une autre clé, il faut la désinstaller une seule fois.

## Version 1.5 : dénivelé
- Le D+ et le D- sont calculés sur tous les points du fichier GPX, et non plus sur le profil réduit à 220 points
  (La Veni Vici 87 km : 598 m affichés avant, 2 322 m maintenant, pour 2 250 m annoncés par l'organisation).
- Le dénivelé de chaque tronçon et le modèle d'allure en tiennent compte (les petites bosses coûtent de l'effort).
- Les plans importés avec une ancienne version doivent être réimportés depuis le GPX pour profiter de la correction.

## Version 1.6 : copilote de l'assistance, étape 1 (données)
- Chaque ravito accessible a un stationnement (nom ou coordonnées), un temps de marche jusqu'au ravito et un temps de trajet
  depuis le point précédent de l'assistance. Marge de sécurité réglable (15 min par défaut).
- L'équipe voit ces informations dans l'onglet Assistance, avec un lien « Aller au stationnement ». Le coureur les saisit dans le Plan.
- Interface de fournisseur d'itinéraire prévue dans le code (saisie manuelle pour l'instant, aucun service appelé).

## Version 1.7 : copilote de l'assistance, recherche des stationnements (OpenStreetMap)
- Bouton « Trouver les stationnements et les trajets » (Plan, section Ravitaillements) et bouton par ravito.
- Parkings : Overpass (overpass-api.de, secours overpass.kumi.systems). Marche et voiture : OSRM (routing.openstreetmap.de).
- Le parking retenu est celui où la marche jusqu'au ravito est la plus courte (pas seulement le plus proche à vol d'oiseau).
- Les résultats sont enregistrés dans le plan, les saisies manuelles ne sont jamais écrasées, les réponses sont mémorisées sur l'appareil.
- Services publics gratuits, à usage raisonnable (1 requête par seconde environ). Données © contributeurs OpenStreetMap.

## Version 1.8 : recherche des stationnements, diagnostic
- Requête Overpass simplifiée (`out center 60;`), trois serveurs Overpass, repli sur Nominatim si tous échouent.
- Quand la recherche échoue, l'écran donne le détail par serveur (code HTTP, délai dépassé, pas de connexion).
- Bouton « Tester la connexion aux services » : vérifie chaque serveur et affiche son état.

## Version 1.9 : liste des stationnements, Waze, points sans assistance
- Pour chaque ravito accessible, liste des parkings à moins de 20 min à pied, du plus proche au plus loin, avec le temps de marche réel (OSRM à pied).
- Liens Waze (en plus de Google Maps) pour le stationnement, chaque parking de la liste et le ravito.
- Ravito sans assistance : case « Accessible au public (voir passer les coureurs) » ; stationnement et trajet calculés, carte dans l'onglet Assistance.
- Un serveur Overpass en panne est laissé de côté 10 minutes ; Nominatim demande jusqu'à 40 résultats.
- La marge de sécurité réglée dans le Plan sert aussi au « Être sur place avant ».

## Version 2.0 : listes déroulantes, lien unique Maps ou Waze
- Les stationnements à moins de 20 min à pied sont dans une liste déroulante (Plan et Assistance) ; l'état ouvert ou fermé est conservé.
- Un seul lien par destination. Sur Android, c'est un lien `geo:` : le système affiche la fenêtre « Ouvrir avec » (Google Maps, Waze…).
  Ailleurs (ordinateur, iPhone), le lien ouvre l'itinéraire Google Maps. « Vue satellite » reste un lien Google Maps.

## Version 2.1 : copilote de l'assistance, étape 2 (départ conseillé)
- Départ conseillé = arrivée estimée du coureur (estimation rapide, 8 % plus vite) − trajet − marche du parking choisi − marge de sécurité.
- Carte « Copilote : prochain départ » dans l'onglet Assistance : prochain ravito avec assistance, heure de départ, compte à rebours,
  écart de plus de 20 % avec le plan, ancienneté de la dernière information.
- Notification Android 5 min avant le départ conseillé, reprogrammée quand l'heure change (désactivée par défaut sur le téléphone du coureur).
- `build-apk.yml` : ajout des autorisations d'alarme exacte (`SCHEDULE_EXACT_ALARM`, `USE_EXACT_ALARM`) : à envoyer sur GitHub avec ce fichier.

## Version 2.3 : suivi GPS retiré
- Plus aucune géolocalisation : ni code, ni bouton, ni demande d'autorisation (navigateur ou appli Android).
  Les estimations reposent sur les temps de passage pointés et, si on le souhaite, sur la position saisie à la main.
- Conservés (ce n'est pas du GPS du téléphone) : les coordonnées du fichier GPX (liens de carte, 3D, recherche de stationnements)
  et le lien de suivi de la montre (Garmin, Coros).
- Pour retrouver l'ancien suivi GPS du téléphone : reprendre la version 2.1 dans l'historique GitHub.

## Version 2.4 : hors connexion et mises à jour (PWA, étape 3)
- Service worker : la page est servie depuis le réseau quand il répond (version à jour), depuis le cache sinon ; les fichiers de l'appli sont gardés en cache.
- Numéro de version du cache = version de l'appli + empreinte de index.html : il change à chaque livraison (ne pas le modifier à la main).
- Bannière « Une nouvelle version de Rubalise est prête » avec bouton Recharger ; recherche de mise à jour à chaque retour dans l'appli.
- « Aide et à propos » indique si le mode hors connexion est prêt.
- Les plans et le GPX sont dans le stockage du téléphone : ils fonctionnent sans réseau. Les cartes et la recherche de stationnements demandent du réseau.

## Version 2.5 : affichage « test » et affichage « bêta »
- **Test** (appli Android par défaut) : étapes de chargement des parkings et itinéraires, erreurs détaillées (code HTTP, serveur), bouton « Tester la connexion aux services ».
- **Bêta** (navigateur et appli installée sur l'écran d'accueil, par défaut) : icône de chargement dans le bouton, seulement les messages qui demandent une action, erreurs en clair.
- Pour changer sur un appareil : 5 touches rapides sur « À propos » (Aide). « Mode test » apparaît alors dans « À propos ».

## Version 2.6 : guide et connexion
- Le guide ne se lance qu'après une inscription (e-mail ou Google, nouveau compte), jamais à une simple connexion. Il reste lancé à la toute première ouverture sans compte, et accessible dans « ? ».
- La connexion reste active : seule une session réellement expirée ou supprimée (TOKEN_EXPIRED, utilisateur désactivé…) déconnecte. Un incident passager de Google (erreur serveur, trop de requêtes) ne déconnecte plus.
- Le stockage durable est demandé au navigateur, pour limiter l'effacement des données de l'appli quand le téléphone manque de place.

## Version 2.7 : plusieurs plans, reconnexion, page de connexion centrée
- « Mes plans » : plusieurs plans sur le même appareil, un seul ouvert à l'écran. Un plan rangé garde ses ravitos, ses pointages et sa nutrition.
- À la reconnexion, le dernier plan ouvert reste ouvert (onglet Plan).
- Page de connexion et accueil centrés sur écran large (700 px et plus).

## Version 2.8 : préparation de la bêta
- Étiquette « bêta », bouton « Donner mon avis » (lien du formulaire ou e-mail, à renseigner dans `BETA`), « Copier les infos techniques » (sans donnée personnelle), journal des 12 dernières erreurs.
- Inscription : case de consentement obligatoire (conditions et politique de confidentialité). Liens légaux sur l'accueil, la connexion et l'aide.
- Copilote hors connexion : message clair, recherche de parkings désactivée sans réseau.
- Pages légales à la racine : `confidentialite.html`, `conditions.html`, `mentions-legales.html` (zones « À COMPLÉTER » à remplir avant le lancement).

## Version 2.9 : communauté WhatsApp, photo de profil
- Bouton « Rejoindre la communauté WhatsApp » dans l'Aide (carte « Rubalise est en bêta ») et lien sur l'accueil ; il remplace le formulaire d'avis (toujours possible via `BETA.feedbackUrl`).
- Photo de profil facultative (Paramètres du compte, Identité) : recadrée en carré, réduite à 256 px, enregistrée dans le profil du compte, affichée en haut à droite et dans le menu du compte. Elle n'est montrée à personne d'autre.
- Adresse de contact `contact@rubalise.run` dans l'appli et les pages légales (la boîte doit exister avant la mise en ligne).

## Version 2.10 : plans dans le compte, sécurité
- Les plans sont enregistrés dans le compte (`users/{uid}/plans/{id}`) et se retrouvent sur tous les appareils.
- Politique de sécurité du contenu (CSP) posée par balise, avec empreintes des scripts ; retirée de l'APK par `build-apk.yml`.
- Lien de suivi de la montre limité à http et https.

## Version 2.11 : synchronisation automatique de tout, contours de focus
- Plus de bouton « Synchroniser maintenant » dans « Mes plans » : plans, carnet, préférences et profil se synchronisent tout seuls (après un changement, à la connexion, au retour sur l'appli, au retour du réseau, et toutes les 2 minutes quand l'appli est ouverte).
- Carnet : entrées réunies entre appareils, suppressions mémorisées. Préférences (thème, valeurs par défaut) : la modification la plus récente gagne. Le réglage des notifications reste propre à l'appareil.
- Contours de focus : anneau doux (comme les champs du profil coureur), seulement au clavier ; plus de contour bloqué après un clic.

## Version 2.12 : relecture des textes
- Retouches de formulation dans l'appli (aide, point sans assistance, conseils), sans changement de fonction.
- Consigne aux testeurs réécrite, avec la correction des plans enregistrés dans le compte.

## Version 2.13 : mise en conformité légale
- Pages légales reconstruites : mentions légales (éditeur identifié), politique de confidentialité (12 traitements), conditions d'utilisation complétées.
- Racine conservée en redirection, lisible par les robots. Nouveaux : `robots.txt`, `sitemap.xml`, `llms.txt`.
- Appli : métadonnées et JSON-LD, contenu lisible sans JavaScript, un h1 par vue, liens légaux sur toutes les vues, liens lisibles en thème sombre.
- Détail et liste « à faire par un humain » : `CONFORMITE-LEGALE-2.13.md` (hors dépôt).

## Version 2.14 : déconnexion
- Se déconnecter retire de l'appareil les plans, le carnet et le profil. Tout revient à la prochaine connexion.
- Si des modifications ne sont pas encore enregistrées dans le compte (par exemple hors connexion), une fenêtre prévient avant de les perdre.
- Supprimer le compte vide aussi l'appareil. Sans compte, les plans locaux restent.
- Politique de confidentialité, conditions et aide mises à jour en conséquence.

## Version 0.1 : lancement de la bêta
- La numérotation repart de 0.1 pour le lancement de la bêta. Le contenu est celui de l'ancienne 2.14 : déconnexion qui vide l'appareil, mise en conformité légale, accessibilité.
- Le nom du cache hors connexion change (`0.1-…`) : les appareils déjà installés se mettent à jour tout seuls et effacent l'ancien cache.

## Compte obligatoire pour créer un plan
- Première ouverture : écran de connexion (Google ou e-mail) et champ « Code d'assistance » pour suivre un coureur sans compte.
- Importer un GPX, lancer la course démo, créer un plan ou importer un code de plan demandent d'être connecté.
- Nouvel onglet **Accueil** (connecté) : reprendre son plan, importer un parcours, fiche coureur. L'espace coureur devient « Ma fiche coureur ».
- Conditions, politique de confidentialité et `llms.txt` mises à jour en conséquence (25 octobre 2026).

## Plan en onglets, création pas à pas en fenêtre
- **Plan** : onglets Objectif, Ravitos et Nutrition (indicateur animé avec Motion). Heures de passage et liste « Avant le départ » à côté sur grand écran ; options du plan (remplacer le GPX, réinitialiser, supprimer) regroupées dans « Options du plan ».
- **Création du plan** : on importe d'abord le GPX, puis une fenêtre s'ouvre en 4 étapes (Objectif, Ravitos, Nutrition, Assistance). Panneau qui monte du bas sur téléphone, boîte centrée sur grand écran. « Assistant pas à pas » la rouvre.
- **Ravitos** : « Accès pour l'assistance » et « Accessible au public » côte à côte.
- **Retirés** : la course démo, les phrases d'explication sous les titres et dans les formulaires, et les bulles de confirmation. Les bulles restent pour les erreurs et ce qui demande une action (temps visé manquant, lien invalide, autorisations…).

## Mon placard (stock de produits) et catalogue des marques
- « Mon placard » (Accueil et menu du compte) : le coureur y range ses produits et leurs quantités. Enregistré dans le profil, donc dans le compte, sans changer les règles Firestore.
- Catalogue `www/catalogue.js` : Marques → Gels / Barres / Hydratation → Produits, 78 produits de 10 marques (Maurten, Näak, Overstims, Meltonic, GU, SiS, Tailwind, Isostar, Powerbar, Tā Energy). Valeurs par portion relevées sur les sites officiels le 27/10/2026, avec le lien de chaque fiche. « ? » = valeur non publiée en texte par la marque, à compléter par le coureur. Pas de photos (pastille de couleur et icône par catégorie).
- Logos : SVG vectorisés (vtracer) à partir des PNG fournis (`excel-placard/<id>-logo.png` → `www/img/brands/<id>.svg`), affichés dans un rond rempli (champ `bg` de la marque : couleur du fond du logo, ou teinte claire de la marque avec `tint` pour les logos sur fond blanc) ; initiale sur la couleur de la marque en secours. À remplacer par les SVG officiels des marques quand elles les fourniront.
- Photos des produits : `excel-placard/<idProduit>-img.png` détourée (`hyperframes remove-background`, ou remplissage du fond uni relié au bord quand le détourage IA échoue : barres Solid, Drink Mix 320 Caf 100), recadrée sur le produit et encodée en WebP transparent tenant dans 256 px (`www/img/products/<idProduit>.webp`, champ `img` du produit). Affichée en vignette dans le catalogue de la marque et dans le stock ; icône de catégorie en secours.
- Tā Energy ajoutée le 27/10/2026 (ta-energy.com) : la dose de caféine des saveurs caféinées n'est pas publiée ; ces produits sont tout de même gardés pour la seconde moitié de course.
- Pas encore au catalogue : Baouw, Apurna, Aptonia / Decathlon (sites officiels illisibles depuis l'outil de relevé ; seuls des revendeurs donnaient des chiffres).
- Produit perso : nom, catégorie, glucides, sodium, caféine.
- Nutrition (onglet Plan et Assistance) : quand le placard contient des produits, chaque tronçon liste les produits à prendre. Boissons (une portion par 500 ml d'eau prévus), puis gels et barres selon la part en gels, puis pastilles de sel. Stock décompté sur toute la course, caféine en seconde moitié, variété des produits. Le manque n'est signalé que si le stock est vide.

## Écran de connexion sans défilement
- Tout tient dans la hauteur de l'écran, centré : logo, onglets « Connexion / Créer un compte », Google, e-mail, mot de passe (« Mot de passe oublié ? » sur la ligne du libellé), code d'assistance.
- Les tailles suivent la hauteur de l'écran ; sous 720 px de haut, la phrase d'accroche disparaît et les champs passent à 40 px.
- « Créer un compte » masque le code d'assistance. La case de consentement est raccourcie (conditions, politique de confidentialité, enregistrement des données dont les fréquences cardiaques).
- Vérifié sans défilement en 320×568, 360×640, 390×760, 662×638 et 1366×768, dans les deux modes.

## Recherche des stationnements revue
- Nominatim en premier (réponse en moins d'une seconde, avec l'accès, le prix, le type et la rue). Overpass en secours : mesuré à 34 s pour overpass-api.de, sans réponse en 40 s pour kumi.systems et private.coffee (26/10/2026).
- Parkings écartés : privés, clients, riverains, personnel, livraisons, autorisation, services publics (agricole, forestier, militaire, secours, officiel), boxes et carports. Avant, le service de secours ne filtrait rien.
- Parking sans nom : « Parking, <rue> » (rue de l'adresse OpenStreetMap), sinon « Parking sans nom ».
- Overpass ne coupe plus la liste à 60 parkings (la coupure se faisait par identifiant, pas par distance).
- Cache des recherches renouvelé (préfixe `pk2:`) : les anciens résultats ne sont plus réutilisés.
- Liste : les 5 stationnements les plus proches à pied (à moins de 20 min), du plus proche au plus loin, avec le temps et la distance de marche réels (OSRM à pied). Le premier est celui retenu.

## Carte Garmin LiveTrack dans l'appli
- Quand le coureur colle un lien `https://livetrack.garmin.com/session/…`, la carte Garmin s'affiche dans Assistance (« Suivi de la montre ») et dans En course (« Position du coureur »). Elle ne se recharge pas quand l'appli se met à jour ou qu'on change d'onglet.
- Coros et les liens courts `gar.mn` refusent l'affichage dans une autre appli : ils restent un bouton qui ouvre le navigateur.
- CSP : `frame-src https://livetrack.garmin.com`. Politique de confidentialité (traitement N) et mentions légales mises à jour le 26 octobre 2026.

## Plus de bulles, champs fiables, compte à rebours
- Plus aucune bulle flottante. Les confirmations sont silencieuses ; les erreurs et ce qui demande une action s'affichent en ligne, sous le bouton ou le champ utilisé.
- Champs : le champ cliqué garde le focus (et ce qui y est tapé) même quand l'appli se met à jour juste après la modification d'un autre champ.
- Copilote de l'assistance : avant le départ, seulement un compte à rebours jusqu'à l'heure de départ.
- Derniers textes d'explication retirés (Assistance, Mes plans, matériel, suivi de la montre).

## Liens légaux
- Mentions légales, politique de confidentialité et conditions d'utilisation : seulement dans Aide, « À propos ».
- Exception : l'inscription garde ses liens d'acceptation (case à cocher, phrase sous « Continuer avec Google »), qui valent consentement.

## Entretien du dépôt
- `/.well-known/security.txt` publié (il était resté dans un zip).
- APK : modules de localisation retirés (`package.json`, `native-src/native.js`), qui ne servaient plus depuis la 2.3.
- Fichiers inutiles supprimés : dossier `docs/`, `www/sw.js.txt`, `build-apk.yml.txt`, `rubalise-ajout-securite.zip`.
- L'APK n'est plus compilé à chaque envoi : seulement à la demande (Actions, Build APK, Run workflow).
