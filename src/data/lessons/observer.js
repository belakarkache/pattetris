import cover from "@/assets/covers/observer.webp";
import source from "../code/observer.js?raw";

export default {
  cover,
  oneLiner: "Quando algo acontece, todos os interessados ficam sabendo, sem se conhecerem.",
  definition:
    "Observer é um padrão comportamental em que um objeto (o sujeito) mantém uma lista de observadores e avisa cada um quando seu estado muda. Quem emite o evento não sabe quem está ouvindo. Eventos do DOM, `EventTarget`, watchers do Vue e streams são todos variações desse padrão.",
  analogy:
    "Quando você completa uma linha, o Pattetris dispara um único aviso. O som toca, a pontuação sobe, a barra de nível anda e, às vezes, um padrão é desbloqueado. Cada parte reage por conta própria ao mesmo evento.",
  benefits: [
    { title: "Desacoplamento", text: "Quem emite o evento não importa nem chama quem reage a ele." },
    { title: "Fácil de adicionar reações", text: "Uma nova reação é só mais um `on(...)`, sem mexer no emissor." },
    { title: "Base da reatividade", text: "Interfaces que se atualizam sozinhas quando os dados mudam vêm desse padrão." },
  ],
  drawbacks: [
    { title: "Vazamento de memória", text: "Observadores que nunca saem da lista continuam vivos. Sempre ofereça uma forma de cancelar." },
    { title: "Fluxo difícil de seguir", text: "Com muitos eventos encadeados, fica difícil saber o que disparou o quê." },
  ],
  useCases: [
    { title: "Interfaces reativas", text: "Atualizar a tela quando o estado muda, como fazem Vue e outros frameworks." },
    { title: "Notificações em tempo real", text: "Avisar várias partes do sistema quando chega uma mensagem pelo WebSocket." },
  ],
  code: { file: "game-events.js", source },
  references: [
    { name: "Refactoring Guru: Observer", url: "https://refactoring.guru/pt-br/design-patterns/observer" },
    { name: "patterns.dev: Observer Pattern", url: "https://www.patterns.dev/vanilla/observer-pattern" },
  ],
};
