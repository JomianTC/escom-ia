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

---
---

## TODO

- Actualizar Testing eliminar tramite

- Si un usuario accede desde otro dispositivo, mandar la suscripción a un endpoint nuevo y si el usuario ya tiene activadas las notificaciones para algunos tramites, registrar la nueva suscripción en la base de datos para enviar las notificaciones a ambos dispositivos

- Crear un endpoint donde recibo la suscripción, el token y el id del tramite para verificar si las notificaciones están activadas para ese tramite 