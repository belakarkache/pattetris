import cover from "@/assets/covers/factory.webp";
import source from "../code/factory.js?raw";

export default {
  cover,
  oneLiner: "Quem precisa de um objeto pede pelo tipo, e a fábrica decide como montá-lo.",
  definition:
    "Factory é um padrão criacional que tira a responsabilidade de criar objetos de quem vai usá-los. Em vez de espalhar `new` e regras de montagem pelo código, você chama uma função ou método de fábrica, informa o que quer e recebe o objeto pronto. A variação clássica do livro Design Patterns (GoF) é o Factory Method, em que subclasses decidem qual classe concreta instanciar. Em JavaScript, uma simples função de fábrica costuma resolver o mesmo problema.",
  analogy:
    "O Pattetris usa este padrão de verdade: o arquivo `PieceFactory.js` recebe um tipo, como `\"t\"`, e devolve todas as rotações da peça. O tabuleiro nunca sabe como uma peça T é desenhada. Ele só pede e encaixa.",
  benefits: [
    { title: "Um só lugar para mudar", text: "Se a forma de criar um objeto muda, você altera a fábrica e não cada ponto do código que cria." },
    { title: "Menos acoplamento", text: "Quem usa o objeto depende do que ele faz, não de qual classe concreta ele é." },
    { title: "Fácil de estender", text: "Adicionar um tipo novo é registrar mais uma opção na fábrica." },
  ],
  drawbacks: [
    { title: "Camada extra", text: "Quando só existe um tipo e a criação é trivial, a fábrica é só indireção." },
    { title: "Pode virar um switch gigante", text: "Uma fábrica com dezenas de casos pede um mapa de tipos ou uma divisão por responsabilidade." },
  ],
  useCases: [
    { title: "Componentes de interface", text: "Escolher qual componente renderizar a partir de um campo `type` vindo da API." },
    { title: "Conexões e clientes", text: "Criar o cliente certo de banco de dados, fila ou storage conforme a configuração do ambiente." },
  ],
  code: { file: "piece-factory.js", source },
  references: [
    { name: "Refactoring Guru: Factory Method", url: "https://refactoring.guru/pt-br/design-patterns/factory-method" },
    { name: "patterns.dev: Factory Pattern", url: "https://www.patterns.dev/vanilla/factory-pattern" },
  ],
};
