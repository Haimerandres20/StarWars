
🚀 Proyecto StarWars (Backend + Frontend)

Este proyecto combina un backend en Django (GraphQL) y un frontend en React.
A continuación, se detallan los pasos necesarios para configurar y ejecutar ambos entornos.

🧩 Requisitos previos

Antes de iniciar, asegúrate de tener instaladas las siguientes versiones:

Python: versión 3.10

Node.js: versión 20

npm (incluido con Node.js)

Puedes verificar las versiones instaladas ejecutando:

python --version
node --version
npm --version

⚙️ Configuración del Backend (Django) carpeta StarWars-backend 

Instalar virtualenv (si no lo tienes):

pip install virtualenv


Crear el entorno virtual:

python -m virtualenv ven


Activar el entorno virtual:

En Windows:

ven\Scripts\activate


En Linux / MacOS:

source ven/bin/activate


Ingresar a la carpeta del backend
(donde se encuentra el archivo manage.py)

cd StarWars-backend


Instalar las dependencias del proyecto:

pip install -r requirements.txt


Ejecutar el servidor:

python manage.py runserver


Acceder al panel GraphQL:

Abre tu navegador y ve a:

👉 http://127.0.0.1:8000/graphql/

Allí podrás interactuar con el esquema GraphQL del proyecto.

🖥️ Configuración del Frontend (React)

Ingresar a la carpeta del frontend:

cd swars-frontend


Instalar las dependencias de React:

npm install


(También puedes usar npm i, es equivalente.)

Ejecutar el servidor de desarrollo:

npm run dev


Abrir el frontend en el navegador:

Copia la URL que aparece en la terminal (por defecto suele ser
👉 http://localhost:5173/
).