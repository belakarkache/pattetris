import cover from "@/assets/covers/builder.webp";
import source from "../code/builder.js?raw";

export default {
  cover,
  oneLiner: "Monte objetos complexos passo a passo, com chamadas que se leem como frases.",
  definition:
    "Builder é um padrão criacional que separa a construção de um objeto complexo da sua representação final. Em vez de um construtor com dez parâmetros, você configura o objeto em etapas com nomes claros e chama `build()` no fim. O builder pode aplicar valores padrão e validar o resultado antes de entregá-lo.",
  analogy:
    "Pense em criar um modo de jogo do Pattetris: tamanho do tabuleiro, nível inicial, peça fantasma ligada ou desligada, só peças retas. Com um builder, um modo novo vira uma sequência de escolhas legíveis, e o jogo recebe um objeto completo e validado.",
  benefits: [
    { title: "Leitura clara", text: "`.board(6, 16).startingAt(5)` diz mais do que `new Mode(6, 16, 5, false)`." },
    { title: "Padrões e validação", text: "Só configura o que muda. O resto vem pronto e é conferido em `build()`." },
    { title: "Mesmo processo, resultados diferentes", text: "A mesma sequência de passos pode gerar variações do objeto." },
  ],
  drawbacks: [
    { title: "Exagero para objetos simples", text: "Com dois ou três campos, um objeto literal já basta." },
    { title: "Código a mais", text: "Cada opção vira um método, e eles precisam acompanhar o objeto final." },
  ],
  useCases: [
    { title: "Consultas e requisições", text: "Query builders como Knex e clientes HTTP configuráveis." },
    { title: "Dados de teste", text: "Montar objetos de teste com só o que importa para cada caso." },
  ],
  code: { file: "game-mode-builder.js", source },
  references: [
    { name: "Refactoring Guru: Builder", url: "https://refactoring.guru/pt-br/design-patterns/builder" },
  ],
};
