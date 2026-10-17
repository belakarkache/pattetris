import cover from "@/assets/covers/strategy.webp";
import source from "../code/strategy.js?raw";

export default {
  cover,
  oneLiner: "Vários jeitos de resolver o mesmo problema, trocáveis sem mexer em quem usa.",
  definition:
    "Strategy é um padrão comportamental que separa uma família de algoritmos em peças independentes com a mesma interface. O código principal guarda uma referência para a estratégia atual e só chama essa interface. Trocar o comportamento passa a ser trocar a estratégia, sem `if` espalhado pelo código. Em JavaScript, uma estratégia pode ser só uma função.",
  analogy:
    "Como sortear a próxima peça? O Pattetris usa a estratégia \"saco de 7\": embaralha as 7 peças e entrega uma de cada vez, o que evita longas secas de peça I. Trocar por um sorteio totalmente aleatório seria trocar a estratégia, e a fila de peças nem perceberia.",
  benefits: [
    { title: "Troca em tempo de execução", text: "Dá para mudar o algoritmo conforme configuração, usuário ou contexto." },
    { title: "Algoritmos isolados", text: "Cada estratégia é testada e mantida separadamente." },
    { title: "Aberto para extensão", text: "Uma estratégia nova não exige alterar as existentes nem o código que as usa." },
  ],
  drawbacks: [
    { title: "Mais peças soltas", text: "Para duas variações que nunca mudam, um `if` simples é mais claro." },
    { title: "Quem escolhe precisa conhecer as opções", text: "Alguém ainda decide qual estratégia usar e precisa saber as diferenças entre elas." },
  ],
  useCases: [
    { title: "Pagamentos", text: "Cartão, Pix e boleto com a mesma interface `pay(order)`." },
    { title: "Ordenação e filtros", text: "Ordenar uma lista por preço, data ou relevância conforme a escolha do usuário." },
  ],
  code: { file: "piece-queue.js", source },
  references: [
    { name: "Refactoring Guru: Strategy", url: "https://refactoring.guru/pt-br/design-patterns/strategy" },
  ],
};
