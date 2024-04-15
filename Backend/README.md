<p align="center"><img src="https://lh3.googleusercontent.com/drive-viewer/AKGpihatFXLOhC78cbbjcUq68r3fJBDgbgSNE5OM1C8ZCHn2B0UFAMiR3ykJ9OLFNh0V8emKotjAnLlv5Xw9Z6PFgScN6eN9lQ=w950-h996" width="600" alt="ESCOM ++ Logo" /></p>

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

---
---

## TODO

- Crear ruta para enviar email con enlace para reemplazar contraseña
- Crear ruta para modificar la contraseña
- Crear ruta para verificar la contraseña (Se puede usar el login???)
