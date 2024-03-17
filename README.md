# express-samples-1

```
npm init -y
npm install --save-dev typescript @types/node
npx tsc --init
npm install express
npm install --save-dev @types/express
mkdir src
touch src/index.ts
npm install --save-dev prettier nodemon ts-node
touch nodemon.json
mkdir src/controllers src/exceptions src/middlewares src/routes src/schemas
npm install --save-dev prisma && npm install @prisma/client
npx prisma init

npx prisma migrate dev --name "create user model"
npm install dotenv bcrypt jsonwebtoken
npm install --save-dev @types/bcrypt @types/jsonwebtoken

npx prisma migrate dev --name "add role to user"

```
