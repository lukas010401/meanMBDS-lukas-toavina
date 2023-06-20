Assignment Management - Lukas n°46 / Toavina n°4

- Pour faire tourner le projet sur votre machine : 
	MONGODB
	- lien : mongodb+srv://user:root@cluster0-initial.05l2z4j.mongodb.net/assignments?retryWrites=true&w=majority	

	BACKEND
	- Cloner le répertoire github du backend Node js : https://github.com/lukas010401/meanMBDS-lukas-toavina/tree/main/Backend
	- Executer 'npm-install' dans le projet cloné pour installer les dépendances
	- Puis exécuter le projet en executant 'npm-start'
	- Ouvril l'URL : localhost:8080/api/assignments

	FRONTEND
	- Cloner le répertoire github du frontend Angular : https://github.com/lukas010401/meanMBDS-lukas-toavina/tree/main/Frontend
	- Executer 'npm-install' dans le projet cloné pour installer les dépendances
	- Changer les api_uri dans les fichiers de services si utilisation de l'api local en localhost:8080/api/assignments ...
	- Puis exécuter le projet en executant 'npm-start'

- Liens du projet déployés : 
	- FRONTEND : https://assignement-management-lukas-toavina.onrender.com
	- BACKEND : https://assignement-management-api-lukas-toavina.onrender.com

	
- Pour se connecter :
	- Entrer l'un des utilisateurs suivants :  [{ email: 'user1@user1.com', password: 'root1' },
    { email: 'user2@user2.com', password: 'root2' },
    { email: 'user3@user3.com', password: 'root3' }]

- Liste d'assignments :
	- Nous avons bien entré 1000 assignments dans la collection 'assignments' de mongodb mais nous avons eu un problème avec la pagination, du coup les assignments ne sont pas bien affichés


- PROBLEMES :
	- Lors de la deconnexion, la page vers laquelle on est redirigé est 'not found'
	
 