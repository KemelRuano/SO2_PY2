### Universidad de San Carlos de Guatemala
### Facultad de Ingenieria
### Escuela de Ciencias y Sistemas
### Sistemas Operativos 2


| Nombre           | Carnet       |
|:----------------:|:------------:|
|Kemel Efrain Josue Ruano Jeronimo | 202006373 |


## Introduccion 
El presente manual técnico describe el desarrollo de una aplicación destinada a comprender el funcionamiento del manejo de memoria en el sistema operativo Linux Mint. Esta aplicación tiene como objetivo monitorear el uso de memoria de cada proceso en ejecución, detectando las solicitudes de memoria realizadas al sistema operativo. Se utilizarán herramientas como SystemTap para la captura de llamadas al sistema y MySQL para almacenar la información obtenida.
#
## Requerimientos minimos

- Sistema operativo: Linux Mint (versión específica, por ejemplo, Linux Mint 20.3 "Una").
- Procesador: Procesador compatible con arquitectura de 32 bits (x86) o 64 bits (x64)
- Memoria RAM: Se recomienda al menos 1 GB de RAM para compilaciones simples y
desarrollo básico en C. Para proyectos más complejos, se recomiendan 2 GB o más.
- Espacio en disco: Se recomienda un mínimo de 16 GB de espacio disponible en disco
- Herramientas de desarrollo: Compilador de C compatible con Linux Mint (se puede
instalar GCC, por ejemplo)
# 
## Instalación y Configuración de Herramientas de Desarrollo:
- Compilador GCC: El compilador GCC generalmente viene preinstalado en la mayoría de
las distribuciones de Linux, incluyendo Linux Mint. Si no está instalado, puede instalarlo
a través del gestor de paquetes de su distribución con el siguiente comando:
sudo apt-get install build-essential
- Editor de texto o IDE: Puede utilizar cualquier editor de texto de su preferencia, como
Vim, Emacs, o instalar un IDE como NetBeans, Code::Blocks, o Visual Studio Code
- Flask es un framework web ligero y flexible para Python. se utiliza para construir aplicaciones web rapidas y escalables
    - pip install Flask 
- Flask-CORS: es una extension para Flask que proporciona un manejo sencillo de solicitudes de recursos cruzados
    - pip install Flask-Cors
- Mysql es un sistema de gestion de bases de datos relacion de codigo abierto. para interactuar con una base de datos MYSQL desde python, se necesita un conector.
    - pip install mysql-connector-python
- React es una biblioteca de JavaScript para construir interfaces de usuarios. Es mantenida por facebook y una comunidad activa de desarrolladores, Vite es un entorno de desarollo web rapido y moderno que esta especialmente optimizado para el desarollo de aplicaciones web modernas utilizando tecnologias como React 
    - npm create vite "nombre proyecto"
    - npm install
    - npm run dev

#
## Arquitectura
<img src="./imagenes/arquitectura.png" alt="drawing"/>


# backend
## librerias utilizadas
<img src="./imagenes/librerias.png" alt="drawing"/>

## Metodo main
 hace que la aplicación Flask esté disponible para recibir y procesar solicitudes HTTP en una dirección IP específica y un puerto específico, y con la capacidad de recargar automáticamente cuando se realizan cambios en el código.
     <img src="./imagenes/main.png" alt="drawing"/>

## Peticion Dashboard
Esta función define una ruta en la aplicación Flask para la URL '/dashboard'. Cuando se accede a esta ruta utilizando el método GET, la función realiza una consulta a la base de datos y devuelve los resultados en formato JSON. Los resultados incluyen tres listas: una lista de 'pid', una lista de 'porcentaje' y una lista de diccionarios que representan filas de la tabla 'dashboard' con las claves 'pid', 'name', 'memoria' y 'cpu'.
 <img src="./imagenes/dashboard.png" alt="drawing"/>

 ##  Peticion Solicitud
 Esta función define una ruta en la aplicación Flask para la URL '/solicitud'. Cuando se accede a esta ruta utilizando el método GET, la función realiza una consulta a la base de datos y devuelve los resultados en formato JSON. Los resultados incluyen una lista de diccionarios que representan filas de la tabla 'llamada'. Cada diccionario tiene las claves 'pid', 'call', 'size' y 'fecha', donde 'pid' es el ID del proceso, 'call' es la llamada realizada, 'size' es el tamaño y 'fecha' es la fecha de la llamada.
  <img src="./imagenes/solicitud.png" alt="drawing"/>

# Modulo C
## librerias utilizadas

<img src="./imagenes/librerias2.png" alt="drawing"/>

## Lector - Estructura del Código
El programa está estructurado en varias secciones que cumplen funciones específicas:

- Conexión a la Base de Datos: Se establece una conexión con la base de datos MySQL utilizando la biblioteca MySQL C API. Se definen las credenciales de acceso (nombre del servidor, nombre de usuario, contraseña y nombre de la base de datos).
- Creación del Pipe y Fork: Se crea un pipe para la comunicación entre procesos. Luego se realiza un fork para crear un nuevo proceso hijo que ejecutará el script 'trace.stp' utilizando el comando 'sudo stap'.
- Proceso Hijo (Lectura del trace.stp): El proceso hijo redirige la salida estándar al pipe y ejecuta el script 'trace.stp' utilizando el comando 'sudo stap'. Este script está diseñado para monitorear actividades del sistema y producir una salida que será leída por el programa.
- Proceso Padre (Lectura de la Salida del Pipe y Actualización de la Base de Datos): El proceso padre lee la salida del pipe, interpreta los datos recibidos y actualiza la base de datos MySQL con la información obtenida.
    - Se parsea la salida del pipe para extraer los datos relevantes, como el identificador de proceso (PID), el nombre del proceso, el tamaño, entre otros.
    - Se construye una consulta SQL para insertar o actualizar los datos en la base de datos MySQL.
    - La consulta SQL se ejecuta utilizando la función mysql_query().
- Cierre de la Conexión y Finalización del Programa: Una vez que se han procesado todos los datos, se cierra la conexión con la base de datos MySQL y el programa termina su ejecución.
  <img src="./imagenes/lector.png" alt="drawing"/>
## Archivo Systemtrap - Estructura del codigo
- Monitoreo de la llamada "mmap": cuando se llama a mmap2, se capturan los siguientes datos
    - llamada: Nombre de la llamada al sistema
    - pid: identificador del proceso
    - nombre: nombre del ejecutable
    - size: tamaño de la memoria mapeada
    - tiempo: tiempo actual en segundos
- Monitoreo de la llamada al sistema "munmap":
    cuando se llama a munmap, se capturan los siguientes datos.
    - llamada: Nombre de la llamada al sistema
    - pid: identificador del proceso
    - nombre: nombre del ejecutable
    - size: tamaño de la memoria mapeada
    - tiempo: tiempo actual en segundos
- Monitoreo de actividades del sistema cada 250 milisegundos:
    - se utiliza un temporizador para ejecutar la siguiente accion cada 250ms.
    - se verifica si el proceso tiene un pid distinto de cero(para evitar errores)
    - se utiliza el coomando ps para obtener el porcentaje de memoria utilizada por el proceso identificado por el pid
  <img src="./imagenes/systemtrap.png" alt="drawing"/>

 ## Script base de datos
 #### Tabla dashboard
Esta tabla almacena los datos relacionaods con el rendimiento del sistema
- campos:
    - id
    - pid
    - name
    - size
    - memoria
 #### Tabla llamada
Esta tabla registra las llamadas al sistema mmap2 y munmap.
- campos:
    - id
    - pid
    - name
    - size
    - feha_hora

<img src="./imagenes/tabla.png" alt="drawing"/>

 ## Script Procedimiento Base
Este procedimiento almacena inserta o actualiza registros en las tablas llamada y dashboard de la base de datos Proyecto2. Si ya existe un registro en dashboard con el mismo nombre, actualiza sus datos; de lo contrario, inserta un nuevo registro. Los parámetros de entrada son el ID del proceso (pid), el nombre del proceso (name), el tamaño del proceso (size), el porcentaje de memoria (memoria), el nombre del ejecutable (nombre), y la fecha y hora de la llamada al sistema (time).
<img src="./imagenes/procedimiento.png" alt="drawing"/>
