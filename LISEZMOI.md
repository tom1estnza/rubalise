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
     tape le nom `.github/workflows/build-apk.yml` et colle le contenu du fichier `build-apk.yml.txt`.
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
