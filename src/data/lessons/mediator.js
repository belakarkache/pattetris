import cover from "@/assets/covers/mediator.webp";
import source from "../code/mediator.js?raw";

export default {
  cover,
  oneLiner: "As partes não conversam entre si: tudo passa por um coordenador.",
  definition:
    "Mediator é um padrão comportamental que centraliza a comunicação entre vários objetos. Em vez de cada componente conhecer e chamar todos os outros, eles avisam o mediador, que decide quem deve reagir. Uma rede de conexões vira uma estrela com um centro só.",
  analogy:
    "No Pattetris, a peça não sabe que existe placar e o placar não sabe que existe som. Quem coordena é o motor do jogo: quando uma peça trava, ele verifica as linhas, soma os pontos, sobe o nível e manda tocar o som certo.",
  benefits: [
    { title: "Componentes independentes", text: "Cada parte pode ser reutilizada e testada sem as outras." },
    { title: "Regras de interação em um só lugar", text: "Para entender quem reage a quê, basta ler o mediador." },
    { title: "Menos conexões", text: "Adicionar um componente não exige ligá-lo a todos os outros." },
  ],
  drawbacks: [
    { title: "Mediador inchado", text: "Sem cuidado, ele concentra regras demais e vira um objeto que sabe tudo." },
    { title: "Ponto único de falha", text: "Um bug no mediador afeta todas as interações." },
  ],
  useCases: [
    { title: "Formulários complexos", text: "Campos que habilitam, validam ou preenchem outros campos." },
    { title: "Salas de chat", text: "Usuários enviam mensagens para a sala, e a sala distribui para quem deve receber." },
  ],
  code: { file: "game-mediator.js", source },
  references: [
    { name: "Refactoring Guru: Mediator", url: "https://refactoring.guru/pt-br/design-patterns/mediator" },
  ],
};
