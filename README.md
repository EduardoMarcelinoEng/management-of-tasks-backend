# 1 - Executação do projeto
-Crie um arquivo .env na raiz do projeto de acordo com os valores do arquivo de exemplo. Obs.: não esqueça de preencher o valor para a variável APP_KEY;
-Execute o comando `docker network create my_local_network`;
-Execute o comando `docker-compose up -d`;
-Crie o schema(database) que você definiu em .env (variável DB_DATABASE);
-Rode o comando `npm run migrate` na raiz do projeto por dentro do container api