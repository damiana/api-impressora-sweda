# impressora-sweda
API rest para conectar e enviar comandos esc/poss para a impressora Sweda.

Modo de utilização:

- npm install 
- npm run start:dev


urls expostas:

- http://localhost:3000/v1/imprimirTexto
- http://localhost:3000/v1/status


Test:
- npm test

urls para gravar e mostrar o texto salvo usando uma api externa:

- http://localhost:3050/v1/gravarTexto
- http://localhost:3050/v1/mostarTextoGravado