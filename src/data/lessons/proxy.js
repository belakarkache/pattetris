import cover from "@/assets/covers/proxy.webp";
import source from "../code/proxy.js?raw";

export default {
  cover,
  oneLiner: "Um intermediário que se parece com o objeto original e controla o acesso a ele.",
  definition:
    "Proxy é um padrão estrutural que coloca um substituto na frente de um objeto. O substituto tem a mesma interface, então quem usa nem percebe, mas ele pode validar, registrar, adiar a criação ou guardar resultados em cache antes de repassar a chamada. JavaScript tem um `Proxy` nativo que intercepta leituras, escritas e chamadas.",
  analogy:
    "A pontuação do Pattetris se atualiza na tela sozinha porque o Vue envolve o estado do jogo em um `Proxy`. Cada vez que o placar muda, o Proxy percebe a escrita e avisa a interface para redesenhar só o que mudou.",
  benefits: [
    { title: "Comportamento extra sem alterar o original", text: "Validação, log e cache entram sem tocar na classe protegida." },
    { title: "Criação preguiçosa", text: "O objeto caro só é criado quando alguém realmente o usa." },
    { title: "Controle de acesso", text: "Bloqueia ou limita operações conforme permissão ou regra." },
  ],
  drawbacks: [
    { title: "Mágica escondida", text: "Comportamentos interceptados nem sempre são óbvios para quem lê o código." },
    { title: "Custo por acesso", text: "Cada operação passa por mais uma camada, o que pesa em laços muito quentes." },
  ],
  useCases: [
    { title: "Reatividade", text: "Vue 3 e MobX usam `Proxy` para detectar mudanças no estado." },
    { title: "Cache de requisições", text: "Responder chamadas repetidas sem ir de novo ao servidor." },
  ],
  code: { file: "reactive-stats.js", source },
  references: [
    { name: "Refactoring Guru: Proxy", url: "https://refactoring.guru/pt-br/design-patterns/proxy" },
    { name: "MDN: Proxy", url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Proxy" },
  ],
};
