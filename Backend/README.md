<p align="center"><img src="https://res.cloudinary.com/djmfuxcqb/image/upload/v1719367391/dkvxwokfbfqpz0zp8znw.png" width="600" alt="ESCOM ++ Logo" width="600" alt="ESCOM ++ Logo" /></p>

## Descripción

Código fuente del Backend sobre el TT Creación de Aplicación Web Progresiva para la Comunidad Estudiantil en la ESCOM con Inteligencia Artificial en Trámites Escolares

## Instalación

```
npm install
```

## Variables de entorno
Renombrar el archivo .env.template a .env e inicializar las mismas

## Levantar la base de datos ( Docker )
Ejecutar el siguiente comando en la terminal

```
docker compose up -d
```

## Ejecutar la aplicación en desarrollo

```
npm run start:dev
```
## Contenedor IA
La IA utilizada en este proyecto es gracias al proyecto [Gpt4Free](https://github.com/xtekky/gpt4free?tab=readme-ov-file#installation-guide-for-windows-exe) (**NO necesaria para el funcionamiento de la aplicación**) junto con la biblioteca [G4F](https://github.com/VictorMRojas/g4f-ts)

## Levantar el servicio de IA ( Docker )
Ejecutar el siguiente comando en la terminal

```
docker pull hlohaus789/g4f
```

## Ejecutar contenedor de IA
Ejecutar el siguiente comando, cambiando la palabra puerto, por el puerto al que quiere enlazar la imagen
aun que al ejecutar el comando la terminal diga localhost:8080, el puerto es el que usted eligió.

```
docker run -p PUERTO:8080 -p 1337:1337 -p 7900:7900 --shm-size="2g" -v ${PWD}/hardir:/app/hardir hlohaus789/g4f:latest
```

