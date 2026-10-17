import cover from "@/assets/covers/iterator.webp";
import source from "../code/iterator.js?raw";

export default {
  cover,
  oneLiner: "Pegue o próximo item sem precisar saber como a coleção é organizada por dentro.",
  definition:
    "Iterator é um padrão comportamental que oferece uma forma padronizada de percorrer uma coleção, item por item, sem expor sua estrutura interna. JavaScript traz o padrão na própria linguagem: qualquer objeto com `[Symbol.iterator]` funciona com `for...of`, spread e desestruturação. As funções geradoras (`function*`) deixam a implementação curta.",
  analogy:
    "A fila de próximas peças do Pattetris funciona como um iterador. O jogo só chama \"me dá a próxima\". Se por trás existe um saco embaralhado, um sorteio puro ou uma lista fixa de treino, isso fica escondido.",
  benefits: [
    { title: "Interface única", text: "Arrays, árvores, páginas de uma API e linhas de um tabuleiro são percorridos do mesmo jeito." },
    { title: "Avaliação preguiçosa", text: "Os itens são produzidos sob demanda, sem montar a coleção inteira na memória." },
    { title: "Vários percursos", text: "A mesma estrutura pode oferecer iteradores diferentes, como por linha, por coluna ou só as células ocupadas." },
  ],
  drawbacks: [
    { title: "Exagero para listas simples", text: "Para um array comum, `map` e `for...of` já resolvem." },
    { title: "Estado de percurso", text: "Um iterador lembra onde parou. Reutilizá-lo depois de consumido não traz nada." },
  ],
  useCases: [
    { title: "Paginação de APIs", text: "Um gerador assíncrono que busca a próxima página só quando o laço pede." },
    { title: "Estruturas próprias", text: "Percorrer árvores, grafos ou grades com `for...of`." },
  ],
  code: { file: "board-iterator.js", source },
  references: [
    { name: "Refactoring Guru: Iterator", url: "https://refactoring.guru/pt-br/design-patterns/iterator" },
    { name: "MDN: Protocolos de iteração", url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Iteration_protocols" },
  ],
};
