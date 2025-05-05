# projet-mobile

Configuration du projet


*****************|BACK_END|***************
Prerequis
=> XAMPP SERVER POUR LANCER MYSQL SUR PHP MYADMIN EN LOCAL
	avec une base de données nommé : gestion-scolaire
=> NODE JS

LANCEMENT APRES DEZIPAGE DU PROJET

cd backend
npm install
npm start pour demarrer le serveur


*****************|FRONT_END|***************
Prerequis
=> ANDROID SDK
	Une vriable d'environnement utilisateur au niveau du path placé :
	C:\Users\<User>\AppData\Local\Android\Sdk\platform-tools
	
	Exceuter : adb devices pour s'assurer qu'on voit les emulateurs
	
	Lancer ip config dans un terminal et renseigner l'adresse ipv4 de l'ordi et le port du 			serveur (ex:192.168.1.64:6282)  dans les pages ou les requetes sont envoyés vers le serveur.
	Ce sont : singup.tsx, login.tsx, home.tsx et cours.tsx dans le dossier /src/screens

=> NODE JS
=> EMULATEUR ANDROID OU UN TELEPHONE ANDROID PHYSIQUE

Configuration
Dans le dossier /android/local.properties à la racine du projet placé : 
	sdk.dir=C:\\Users\\azizs\\AppData\\Local\\Android\\Sdk

LANCEMENT
A la racine du projet dans le dossier mobile
	=> Demarrer un emulateur ou branché un appareil physique
	=> npx react-native run-android pour demarrer le projet
	
Dans la page d'accueil creer un compte puis se connecter pour naviguer
