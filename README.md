# locacao-veiculos

## Equipe
Alexandre Aparecido Scrocaro Junior\
Pedro Henrique Klayn


## Proposta
Será feito um cliente em React e um servidor Node, a comunicação será rest, ou seja, requests por meio de métodos HTTP e dados em formato JSON. Por hora, tivemos a ideia de fazer uma locadora de veículos, que terá um serviço de autenticação de usuários (locadores e locatários), CRUD de veículos (para locadores), Read de veículos para locatários e Locação de veículos (locatários fazem pedido de locação através da página do carro e locador tem a opção de aceitar ou rejeitar), tanto o locatário quanto o locador terão uma listagem de locações. Acreditamos que essas funcionalidades já irão gerar alguma complexidade, pelo pouco tempo de desenvolvimento que teremos.


## Tecnologias
### Front
- [React](https://react.dev/): framework consolidado para desenvolvimento web.
- [Ant design](https://ant.design/): biblioteca para auxiliar no desenvolvimento com componentes prontos.

### Back
- [Node.js](https://nodejs.org/): Ótimo para um ambiente escalável, traz maior produtividade e leveza.
- [Prisma](https://www.prisma.io/): ORM para facilitar a experiência do desenvolvedor para se comunicar com o BD.
- [Insomnia](https://docs.insomnia.rest/): O desenvolvimento será "backend first", então utilizaremos esta ferramenta para realizar os testes necessários nas rotas.

### Banco de dados
- [Postgres](https://www.postgresql.org/): Escolhemos este BD visando uma futura escalabilidade do projeto.

### Notificações
- Pretendemos fazer um serviço de notificações utilizando [Supabase](https://supabase.com/) para fazer push notifications ao ser feito/aceito um pedido de locação.


### Aula 30/05 - 21h20 a 23h
Iremos estudar como é feita a utilização do supabase, verificar se é possível utilizar apenas supabase ao invés de utilizar postgres junto, verificar e estudar como é feita a conexão do supabase e se é possível utilizá-lo em nuvem, se não for será feita uma configuração de teste dele
