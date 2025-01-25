# Requisitos
-Nodejs versão 20 ou superior;
-MySQL;
-Docker (opcional).

# 1 - Execução do projeto por meio do Docker
-Crie um arquivo .env na raiz do projeto de acordo com os valores do arquivo de exemplo. Obs.: não esqueça de preencher o valor para a variável APP_KEY;
-Execute o comando `docker network create my_local_network`;
-Execute o comando `docker-compose up -d`;
-Rode o comando `npm run migrate` na raiz do projeto por dentro do container api.

# 2 - Execução em modo de desenvolvimento
-Rode o comando `npm install` na raiz do projeto;
-Crie o arquivo .env na raiz do projeto de acordo com exemplo. Caso não queira personalizar nenhum valor, pode utilizar as configurações do exemplo;
-Crie o banco de dados de acordo com a variável DB_DATABASE do arquivo .env;
-Execute o comando `npm run migrate` na raiz do projeto;
-Rode o comando `npm run dev` na raiz do projeto.

# 3 - Execução em modo de produção
-Rode o comando `npm install` na raiz do projeto;
-Crie o arquivo .env na raiz do projeto de acordo com exemplo. Caso não queira personalizar nenhum valor, pode utilizar as configurações do exemplo;
-Crie o banco de dados de acordo com a variável DB_DATABASE do arquivo .env;
-Execute o comando `npm run migrate` na raiz do projeto;
-Execute o comando `npm run build` na raiz do projeto;
-Execute o comando `npm start` na raiz do projeto.

Projeto front-end: https://github.com/EduardoMarcelinoEng/management-of-tasks-frontend