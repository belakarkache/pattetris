import cover from "@/assets/covers/singleton.webp";
import source from "../code/singleton.js?raw";

export default {
  cover,
  oneLiner: "Uma única instância, compartilhada por quem precisar dela.",
  definition:
    "Singleton é um padrão criacional que garante que uma classe tenha só uma instância e oferece um ponto de acesso a ela. Ele serve para recursos que precisam ser únicos, como uma configuração global ou um pool de conexões. Em JavaScript, módulos ES já são avaliados uma única vez: exportar um objeto de um módulo costuma ser o Singleton mais simples.",
  analogy:
    "No Pattetris, o seu progresso vive em um store do Pinia. Toda vez que o jogo, a coleção ou uma lição chamam `useProgressStore()`, recebem o mesmo objeto. Por isso o padrão que você desbloqueia no jogo já aparece liberado na coleção.",
  benefits: [
    { title: "Estado consistente", text: "Todos leem e escrevem no mesmo lugar, sem cópias divergentes." },
    { title: "Criação sob demanda", text: "A instância pode ser criada só quando alguém pede por ela pela primeira vez." },
    { title: "Economia de recursos", text: "Evita abrir várias conexões ou carregar a mesma configuração repetidas vezes." },
  ],
  drawbacks: [
    { title: "Estado global escondido", text: "Qualquer parte do código pode mudar o Singleton, o que dificulta rastrear bugs." },
    { title: "Testes mais difíceis", text: "Um teste pode herdar o estado do anterior. Prefira poder injetar ou resetar a instância." },
  ],
  useCases: [
    { title: "Configurações da aplicação", text: "Idioma, tema e preferências lidos uma vez e usados em todo o app." },
    { title: "Stores de estado", text: "Pinia, Vuex e Redux mantêm um store único por aplicação." },
  ],
  code: { file: "scoreboard.js", source },
  references: [
    { name: "Refactoring Guru: Singleton", url: "https://refactoring.guru/pt-br/design-patterns/singleton" },
    { name: "patterns.dev: Singleton Pattern", url: "https://www.patterns.dev/vanilla/singleton-pattern" },
  ],
};
