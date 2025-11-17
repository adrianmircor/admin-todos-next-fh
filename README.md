# Development
Pasos para levantar la app en Desarrollo

1 Levantar la base de datos
```
docker compose up -d
```

2. Crear uan copia del .env.template y renombrarlo a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando de ``` npm install ```
5. Ejecutar el comando de ``` npm run dev ```
5. Ejecutar estos comando de Prisma, cuando se quiera crear la BD desde 0
``` npx prisma migrate dev ```
``` npx prisma generate ```
7. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

## Nota: Usuario por defecto
__usaurio:__ test1@google.com
__password:__ 123456

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```