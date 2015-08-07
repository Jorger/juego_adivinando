# Servicios REST/Express

Ejemplo de consumo de servicios REST, utilizando [Express] para tal fin, cada servicio hace uso de su [método] correspondiente.

### Urls de consumo:

* ```/getAllData``` : **GET**  LLevar todos los usaurios.
* ```/createData``` : **POST** Crear un nuevo usuario 
* ```/updateData ``` : **PUT**  Actualizar un usuario
* ```/getData/id``` : **GET** Llevar datos de un usuario
* ```/deleteData/id``` : **DELETE** Eliminar un usuario.

Para el ejemplo se ha hecho uso de un Array que muestra la estructura de la base de datos NoSQL a manejar.

```javascript
var objeto = [
				{
					id 			: 	1, 
					identifi	: 	"12345",
					nombre 		: 	"Jorge", 
					apellido	: 	"Rubiano", 
					email		: 	"correo@correo.com", 
					fecha		: 	"1985-06-15"
				},
				{
					id 			: 	2, 
					identifi	: 	"453453",
					nombre 		: 	"María", 
					apellido	: 	"Pérez", 
					email		: 	"maria@correo.com",
					fecha		: 	"1970-04-25"
				},
				{
					id 			: 	3, 
					identifi	: 	"893434",
					nombre 		: 	"Pedro", 
					apellido	: 	"García", 
					email		: 	"pedro@correo.com", 
					fecha		: 	"1990-08-23"
				}];
```


### Ejemplo consumo de servicios.

Para realizar el consumo de los servicios se recomienda utilizar [Postman], dependiendo del servicio se debrá selccionar su método correspondiente: 
**```POST, GET, PUT, DELETE```**

![Postman](https://dl.dropboxusercontent.com/u/181689/postmanCreate.png)

**Nota.**

Para el caso de los servicios de crear (POST ) y editar (PUT), se deberá establecer el tipo de cabecera (Header) que tendrá la petición, en este caso Json: 
```Content-Type``` ```application/json``` como se muestra en la imagen.

### Instalación ejemplos modulos.

Para la instación se deberá ejecutar el comando:

```
npm install
```

El cual leerá el archivo **package.json** descargando las dependencias necesarias.

### Uso de Clod9 para despliegue de la aplicación.

[Cloud9] permite el desarrollo y despliegue de aplicaciones, en este caso para [Node.js], la aplicación ya se encuentra en funcionamiento en dicho sistema, las urls de consumo de los servicios son:

* ```/getAllData``` : https://rest-jorger-1.c9.io/getAllData
* ```/createData``` : https://rest-jorger-1.c9.io/createData/
* ```/updateData ``` : https://rest-jorger-1.c9.io/updateData/
* ```/getData/id``` : https://rest-jorger-1.c9.io/deleteData/1
* ```/deleteData/id``` : https://rest-jorger-1.c9.io/getData/2

### Autor
Jorge Rubaino [@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
[método]:http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods
[Postman]:https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop
[Cloud9]:https://c9.io/
[Node.js]:https://nodejs.org/
[Express]:http://expressjs.com/
