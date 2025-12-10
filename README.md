# ESIG Tasks

Sistema de gerenciamento de tarefas, desenvolvido com **Angular** no front-end e **Spring Boot 3** no back-end, utilizando **PostgreSQL** como banco de dados. O projeto está hospedado no **Google Cloud** com domínio próprio e certificados **SSL**.

---

## ✅ O que foi realizado

- **Front-end:** Desenvolvido em **Angular**, utilizando componentes do **PrimeNG** e classes CSS do **Tailwind**.  
- **Back-end:** Implementado em **Spring Boot 3** com **Java 21**.  
- **Banco de dados:** Comunicação via **JPA** com **PostgreSQL**.  
- **API REST:** Todos os endpoints seguem a semântica correta dos verbos HTTP.  
- **Autenticação:** Implementada com **JWT**, com endpoints para registro e login de usuários.  
- **Documentação:** API documentada com **Swagger**.  
- **Deploy:** Projeto hospedado no **Google Cloud** com domínio próprio e certificados **SSL**. 

---

## 🌐 Links

- **Front-end (Angular):** [esig.lucasnithael.com.br](https://esig.lucasnithael.com.br)  
- **Back-end (API + Swagger):** [apiesig.lucasnithael.com.br](https://apiesig.lucasnithael.com.br/swagger-ui/index.html)  

> ⚠️ Links em desenvolvimento

---

## 🛠️ Setup para desenvolvedores

### Pré-requisitos

- Java 21  
  [Download e instalação](https://www.oracle.com/br/java/technologies/downloads/#java21)  
- Configurar `JAVA_HOME` nas variáveis de ambiente  
  [Como configurar](https://medium.com/beelabacademy/configurando-vari%C3%A1veis-de-ambiente-java-home-e-maven-home-no-windows-e-unix-d9461f783c26)
- Maven  
  [Download](https://maven.apache.org/download.cgi)  
- Node.js (recomendado v20+)  
  [Download](https://nodejs.org/en/download)

---

### Back-end (Spring Boot)

1. Clone o repositório:
```bash
git clone https://github.com/LucasNithael/fullstack-todolist.git
```
2. Navegue até a pasta do back-end:
```bash
cd backend-todolist
```
3. Configure a conexão com o PostgreSQL no `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/nome_do_banco
spring.datasource.username=usuario
spring.datasource.password=senha
```
4. Rode a aplicação:
```bash
mvn spring-boot:run
```
5. Acesse a documentação Swagger:
```
http://localhost:8080/swagger-ui/index.html
```

> Opcional: gerar o JAR para deploy
```bash
mvn clean package
java -jar target/backend-todolist-0.0.1-SNAPSHOT.jar
```

> Rodar testes:
```bash
mvn test
```

---

### Front-end (Angular)

1. Navegue até a pasta do front-end:
```bash
cd frontend-todolist
```
2. Instale as dependências:
```bash
npm install
```
3. Configure o endpoint da API no:
````bash
cd src/service/api.service.ts
```` 
4. Rode a aplicação em modo de desenvolvimento:
```bash
ng serve
```
5. Acesse no navegador:
```
http://localhost:4200
```

> Para build de produção:
```bash
ng build --prod
```

---

## 📂 Estrutura do projeto

```
backend-todolist/   # Código do back-end (Spring Boot)
frontend-todolist/  # Código do front-end (Angular)
```

---

## ⚠️ Problemas comuns

- Porta 8080 ou 4200 ocupada → altere as portas no `application.properties` ou `angular.json`.  
- Erro de conexão com PostgreSQL → verifique `username`, `password` e se o banco está rodando.  
- Node/npm incompatível → utilize a versão recomendada (v20+).  

---

## 📌 Observações

- O token JWT possui tempo para expirar.  
- O deploy no Google Cloud foi feito via Docker, Portainer e Nginx Proxy Manager. 
