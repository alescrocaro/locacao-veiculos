# Trabalho final de sistemas distribuídos: Locadora de Veículos

## Equipe
Alexandre Aparecido Scrocaro Junior;
Pedro Henrique Klayn.

## Visão Geral
O objetivo deste projeto é desenvolver uma locadora de veículos, proporcionando uma plataforma para dois tipos de usuários: a locadora e o locatário. Este sistema consiste em um cliente em React e um servidor Node, utilizando comunicação RESTful, onde as solicitações são feitas por meio de métodos HTTP e os dados são enviados e recebidos em formato JSON.

## Funcionalidades Principais
- Autenticação de Usuários: O sistema oferece serviços de autenticação para locadores e locatários.
- Notificações em Tempo Real: É implementado um sistema de notificações em tempo real para manter os usuários informados sobre o status de suas solicitações de aluguel.
- CRUD de Veículos: Os locadores podem realizar as operações de criação, leitura, atualização e exclusão de veículos em sua lista de disponibilidade.
- CRUD de Usuários: É possível realizar as operações de gerenciamento de usuários, como criar, visualizar, atualizar e excluir informações de perfil.
- CRUD de Pedidos de Aluguel: Os locatários podem criar pedidos de aluguel de veículos a partir de uma lista disponível na tela. Esses pedidos serão enviados em tempo real para a locadora, que pode aceitar ou recusar a solicitação. O locatário também recebe a resposta em tempo real.
- Listagem de Veículos para Locatários: Os locatários têm acesso à lista de veículos disponíveis para locação.
- Locação de Veículos: Os locatários podem fazer pedidos de locação através da página do veículo desejado, e os locadores têm a opção de aceitar ou rejeitar esses pedidos. Ambos os locatários e locadores possuem uma lista de locações para visualizar.

## Observações
Consideramos que essas funcionalidades já trarão uma certa complexidade ao projeto, considerando o curto prazo de desenvolvimento disponível.
## Tecnologias
### Front
- [React](https://react.dev/): framework consolidado para desenvolvimento web.
- [Ant design](https://ant.design/): biblioteca para auxiliar no desenvolvimento com componentes prontos.

### Back
- [Node.js](https://nodejs.org/): Ótimo para um ambiente escalável, traz maior produtividade e leveza.
- [Insomnia](https://docs.insomnia.rest/): O desenvolvimento será "backend first", então utilizaremos esta ferramenta para realizar os testes necessários nas rotas.

### Banco de dados
- [Supabase](https://supabase.com/): Escolhemos este banco de dados por ser uma plataforma projetada para ser escalável. Além disso, pretendemos fazer um serviço de notificações para fazer push notifications ao ser feito/aceito um pedido de locação.


<!-- 
### Aula 30/05 - 21h20 a 23h
Iremos estudar como é feita a utilização do supabase, verificar se é possível utilizar apenas supabase ao invés de utilizar postgres junto, verificar e estudar como é feita a conexão do supabase e se é possível utilizá-lo em nuvem, se não for será feita uma configuração de teste dele 
-->
