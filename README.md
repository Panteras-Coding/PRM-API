# PRM-API

DOCUMENTACION PRM-API

Liga: https://panteras-project-management.wn.r.appspot.com/

----------------------------------------------------------------------------------------------------------------

REGISTAR USUARIOS NUEVOS
Tipo de ruta: POST
Camino del request: users/register
El camino espera un objeto como el siguiente -->
            {
                "name":"Pedro",
                "lastName": "Morales",
                "id":"0123456",
                "hash":"123456789",
                "carrera": "ing TI",
                "semestre":"2",
                "grupo":"backend"
            }

Todos los campos son requeridos por defecto y en el caso del ID tiene que ser exactamente de 7 caracteres y la contraseña es de minimo 8 caracteres.
Si hay algun problema o el ID ya esta registrado en la base de datos regresara un error especfico dependiendo de que salio mal 

----------------------------------------------------------------------------------------------------------------

AUTORIZAR INICIO DE SECION
Tipo de ruta: POST
Camino del request: users/login
El camino espera un objeto como el siguiente -->

                {
                    "id":"0123456",
                    "hash":"1234565789"
                }

            (El hash es la contraseña)

De tener algun error el programa regresara el problema

----------------------------------------------------------------------------------------------------------------












