import { defineStore } from "pinia";
import factory from "../assets/content-icons/factory.svg";
import strategy from "../assets/content-icons/strategy.svg";
import singleton from "../assets/content-icons/singleton.svg";
import iterator from "../assets/content-icons/iterator.svg";
import observer from "../assets/content-icons/observer.svg";
import proxy from "../assets/content-icons/proxy.svg";
import mediator from "../assets/content-icons/mediator.svg";
import visitor from "../assets/content-icons/visitor.svg";
import retry from "../assets/content-icons/retry.svg";
import builder from "../assets/content-icons/builder.svg";

export const useContentStore = defineStore("content", {
  state: () => ({
    contents: [
      {
        id: 1,
        slug: "factory-pattern",
        title: "Factory Pattern",
        icon: factory,
        description:
          "Cria objetos sem especificar a classe concreta, permitindo flexibilidade e desacoplamento. ",
      },
      {
        id: 2,
        slug: "strategy-pattern",
        title: "Strategy Pattern",
        icon: strategy,
        description:
          "Define uma família de algoritmos, encapsula cada um e os torna intercambiáveis.",
      },
      {
        id: 3,
        slug: "singleton-pattern",
        title: "Singleton Pattern",
        icon: singleton,
        description:
          "Garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global a ela. ",
      },
      {
        id: 4,
        slug: "iterator-pattern",
        title: "Iterator Pattern",
        icon: iterator,
        description:
          "Permite percorrer elementos de uma coleção sem expor sua representação interna.",
      },
      {
        id: 5,
        slug: "observer-pattern",
        title: "Observer Pattern",
        icon: observer,
        description:
          "Define uma dependência um-para-muitos entre objetos, de modo que quando um muda, todos os outros são notificados.",
      },
      {
        id: 6,
        slug: "proxy-pattern",
        title: "Proxy Pattern",
        icon: proxy,
        description:
          "Fornece um objeto substituto para outro, controlando o acesso e adicionando funcionalidades.",
      },
      {
        id: 7,
        slug: "mediator-pattern",
        title: "Mediator Pattern",
        icon: mediator,
        description:
          "Define um objeto que encapsula a comunicação entre vários objetos, simplificando as interações.",
      },
      {
        id: 8,
        slug: "visitor-pattern",
        title: "Visitor Pattern",
        icon: visitor,
        description:
          "Define uma operação para ser executada em elementos de uma estrutura de objetos sem modificar a estrutura. ",
      },
      {
        id: 9,
        slug: "retry-pattern",
        title: "Retry Pattern",
        icon: retry,
        description:
          "Executa uma operação repetidamente, com tratamento de erros e políticas de reintento.",
      },
      {
        id: 10,
        slug: "builder-pattern",
        title: "Builder Pattern",
        icon: builder,
        description:
          "Separa a construção de um objeto complexo em etapas, permitindo diferentes representações.",
      },
    ],
  }),
});
