import cover from "@/assets/covers/visitor.webp";
import source from "../code/visitor.js?raw";

export default {
  cover,
  oneLiner: "Novas operações sobre uma estrutura, sem reescrever as classes dela.",
  definition:
    "Visitor é um padrão comportamental que separa as operações dos objetos sobre os quais elas atuam. Cada elemento da estrutura tem um método `accept(visitor)` que chama o método certo do visitante. Para criar uma operação nova, você escreve um visitante novo, sem tocar nos elementos.",
  analogy:
    "Imagine percorrer todas as células do tabuleiro do Pattetris. Um visitante conta os blocos, outro desenha o tabuleiro em texto e um terceiro procura buracos para uma dica de jogada. As células continuam as mesmas: só muda quem visita.",
  benefits: [
    { title: "Operações novas sem mexer na estrutura", text: "Relatórios, validações e exportações viram visitantes separados." },
    { title: "Lógica agrupada", text: "Tudo de uma operação fica junto, em vez de espalhado por várias classes." },
    { title: "Acumula resultado", text: "O visitante pode guardar estado enquanto percorre a estrutura." },
  ],
  drawbacks: [
    { title: "Novos tipos de elemento custam caro", text: "Cada tipo novo exige um método novo em todos os visitantes existentes." },
    { title: "Mais cerimônia", text: "Em JavaScript, um simples `switch` por tipo muitas vezes resolve com menos código." },
  ],
  useCases: [
    { title: "Compiladores e linters", text: "Ferramentas como Babel e ESLint percorrem a árvore de sintaxe com visitantes." },
    { title: "Exportação de documentos", text: "Gerar HTML, PDF ou Markdown a partir da mesma estrutura de conteúdo." },
  ],
  code: { file: "board-visitor.js", source },
  references: [
    { name: "Refactoring Guru: Visitor", url: "https://refactoring.guru/pt-br/design-patterns/visitor" },
  ],
};
