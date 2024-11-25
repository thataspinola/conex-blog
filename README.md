## CONEX-BLOG
npm install -g @nestjs/cli
nest new conex-blog
npm install @nestjs/config
npm run eslint . --fix
npm install -D prisma
npx prisma init
systemctl start docker
sudo docker compose up -d
npx prisma studio
npx prisma migrate dev
npm install @prisma/client
nest g module database
nest g service database/prisma --no-spec
npx prisma generate
npm install dotenv-cli
npm install @nestjs/graphql @nestjs/apollo @apollo/server graphql
nest g module authors
nest g resolver authors/graphql/resolvers/authors
npm run test:int -- authors-prisma.repository.int-spec
npm install @faker-js/faker
npm install --save class-validator class-transformer
nest g module posts
npm run test:int -- posts-prisma.repository.int-spec
npm install slugify