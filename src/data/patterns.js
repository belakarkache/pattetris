import factory from "@/assets/content-icons/factory.svg";
import strategy from "@/assets/content-icons/strategy.svg";
import singleton from "@/assets/content-icons/singleton.svg";
import iterator from "@/assets/content-icons/iterator.svg";
import observer from "@/assets/content-icons/observer.svg";
import proxy from "@/assets/content-icons/proxy.svg";
import mediator from "@/assets/content-icons/mediator.svg";
import visitor from "@/assets/content-icons/visitor.svg";
import retry from "@/assets/content-icons/retry.svg";
import builder from "@/assets/content-icons/builder.svg";

export const CATEGORIES = {
  creational: { label: "Criacional", tone: "pink" },
  structural: { label: "Estrutural", tone: "sky" },
  behavioral: { label: "Comportamental", tone: "lilac" },
  resilience: { label: "Resiliência", tone: "mint" },
};

export const PATTERNS = [
  {
    slug: "factory",
    title: "Factory",
    category: "creational",
    icon: factory,
    summary: "Centraliza a criação de objetos: você pede pelo tipo e recebe pronto.",
  },
  {
    slug: "strategy",
    title: "Strategy",
    category: "behavioral",
    icon: strategy,
    summary: "Troca o algoritmo usado sem mexer em quem usa.",
  },
  {
    slug: "singleton",
    title: "Singleton",
    category: "creational",
    icon: singleton,
    summary: "Garante uma única instância compartilhada por todo o sistema.",
  },
  {
    slug: "iterator",
    title: "Iterator",
    category: "behavioral",
    icon: iterator,
    summary: "Percorre uma coleção item a item sem expor como ela é guardada.",
  },
  {
    slug: "observer",
    title: "Observer",
    category: "behavioral",
    icon: observer,
    summary: "Avisa automaticamente todos os interessados quando algo muda.",
  },
  {
    slug: "proxy",
    title: "Proxy",
    category: "structural",
    icon: proxy,
    summary: "Coloca um intermediário na frente de um objeto para controlar o acesso.",
  },
  {
    slug: "mediator",
    title: "Mediator",
    category: "behavioral",
    icon: mediator,
    summary: "Faz as partes conversarem por um ponto central, não entre si.",
  },
  {
    slug: "visitor",
    title: "Visitor",
    category: "behavioral",
    icon: visitor,
    summary: "Adiciona operações a uma estrutura sem alterar suas classes.",
  },
  {
    slug: "retry",
    title: "Retry",
    category: "resilience",
    icon: retry,
    summary: "Tenta de novo, com limite e espera, quando a falha é passageira.",
  },
  {
    slug: "builder",
    title: "Builder",
    category: "creational",
    icon: builder,
    summary: "Monta objetos complexos passo a passo, com leitura clara.",
  },
];

export const findPattern = (slug) => PATTERNS.find((pattern) => pattern.slug === slug);
