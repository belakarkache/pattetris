import factory from "@/assets/content-images/factory.png";
import strategy from "@/assets/content-images/strategy.png";
import singleton from "@/assets/content-images/singleton.png";
import iterator from "@/assets/content-images/iterator.png";
import observer from "@/assets/content-images/observer.png";
import proxy from "@/assets/content-images/proxy.png";
import mediator from "@/assets/content-images/mediator.png";
import visitor from "@/assets/content-images/visitor.png";
import retry from "@/assets/content-images/retry.png";
import builder from "@/assets/content-images/builder.png";

const lessons = [
  {
    id: 1,
    coverImage: factory,
    definition:
      "O Factory Pattern é um padrão de design criacional que fornece uma interface para criar objetos em uma superclasse, mas permite que as subclasses alterem o tipo de objetos que serão criados. Ele encapsula a criação de objetos, abstraindo o processo de criação e fornecendo uma maneira de delegar a responsabilidade de instanciação para as subclasses.",
    benefits: [
      "<strong>Manutenção:</strong> Ao centralizar a lógica de criação de objetos em um único local, o Factory Pattern facilita a manutenção do código e reduz a duplicação de código.",
      "<strong>Abstração:</strong> A lógica de criação de objetos é encapsulada, tornando o código mais flexível e fácil de modificar. Isso significa que você pode alterar a forma como os objetos são criados sem precisar modificar o código que os utiliza.",
      "<strong>Decouplamento:</strong> O código que utiliza os objetos não precisa estar ciente das classes concretas que serão instanciadas. Isso permite maior flexibilidade e reuso de código, pois você pode trocar as classes concretas sem precisar modificar o código que as utiliza.",
      "<strong>Extensibilidade:</strong> É fácil adicionar novas classes concretas sem modificar o código que utiliza os objetos. Isso torna o código mais extensível e facilita a adição de novos recursos.",
      "<strong>Simplicidade:</strong> O código que utiliza os objetos fica mais simples e fácil de entender, pois não precisa se preocupar com a criação de objetos. Isso torna o código mais fácil de manter e de entender.",
    ],
    gistId: "ff23c4218501bb1699575ae3fd258225",
    disadvantages: [
      "<strong>Complexidade adicional:</strong> O uso do Factory Pattern pode adicionar uma camada de complexidade ao código, especialmente em cenários simples onde a criação de objetos é direta.",
      "<strong>Aumento do número de classes:</strong> O Factory Pattern geralmente envolve a criação de várias classes adicionais, o que pode aumentar a complexidade e o número total de classes no sistema.",
    ],
    useCasesExamples: [
      "<strong>Framework de UI: </strong> Um Factory Pattern pode ser utilizado para criar diferentes componentes de interface de usuário, como botões, caixas de texto e menus.",
      "<strong>Gerenciador de Conexões:</strong> Em sistemas que interagem com diferentes tipos de bancos de dados, um Factory Pattern pode ser usado para criar conexões de banco de dados específicas com base em configurações ou tipos de dados.",
    ],
    references: [
      {
        name: "Refactoring Guru - Factory Method",
        url: "https://refactoring.guru/design-patterns/factory-method",
      },
    ],
  },
  {
    id: 2,
    coverImage: strategy,
    definition:
      "O padrão Strategy é um padrão comportamental que permite definir uma família de algoritmos, encapsulá-los e torná-los intercambiáveis. Ele permite que o algoritmo varie independentemente dos clientes que o utilizam.",
    benefits: [
      "<strong>Flexibilidade:</strong>  Permite alternar facilmente entre diferentes algoritmos ou estratégias sem alterar o código do cliente.",
      "<strong>Manutenção:</strong>  Os algoritmos são encapsulados em classes separadas, facilitando a manutenção e extensão do código.",
      "<strong>Reutilização de código:</strong>  As estratégias podem ser reutilizadas em diferentes partes do sistema, promovendo a reutilização de código.",
    ],
    gistId: "bc1151e0de0fe1899558755adb1b5b8f",
    disadvantages: [
      "<strong>Complexidade adicional:</strong>  Pode introduzir uma complexidade adicional no código devido à necessidade de criar várias classes para diferentes estratégias.",
      "<strong>Aumento do número de classes:</strong> O uso extensivo do Strategy Pattern pode aumentar o número total de classes no sistema.",
    ],
    useCasesExamples: [
      "<strong>Processamento de pagamentos:  </strong>Em um sistema de comércio eletrônico, diferentes estratégias de pagamento podem ser implementadas usando o Strategy Pattern, como cartão de crédito, PayPal, boleto bancário, etc.",
      "<strong>Ordenação de dados:</strong>  Um sistema que requer diferentes algoritmos de ordenação (por exemplo, ordenação rápida, ordenação de bolhas, ordenação de inserção) pode se beneficiar do Strategy Pattern para implementar esses algoritmos de forma intercambiável.",
    ],
    references: [
      {
        name: "Refactoring Guru - Strategy",
        url: "https://refactoring.guru/design-patterns/strategy",
      },
    ],
  },
  {
    id: 3,
    coverImage: singleton,
    definition:
      "O padrão Singleton é um padrão de design creacional que garante que uma classe tenha apenas uma instância e fornece um ponto de acesso global para essa instância. Ele é útil quando precisamos controlar estritamente o acesso a recursos compartilhados, como conexões de banco de dados, registros de log ou configurações.",
    benefits: [
      "<strong>Controle de acesso:</strong> O Singleton Pattern garante que apenas uma instância da classe seja criada e fornece um ponto de acesso global a essa instância, controlando assim o acesso a recursos compartilhados.",
      "<strong>Redução de consumo de recursos:</strong> Evita a criação desnecessária de múltiplas instâncias da classe, o que pode economizar memória e recursos do sistema.",
      "<strong>Fácil implementação:</strong> É fácil de implementar e entender, tornando-o um padrão popular em muitos sistemas.",
    ],
    gistId: "f5d43865f684057b63f637b7e2cbb2fa",
    disadvantages: [
      "<strong>Dificuldade de testes unitários:</strong> Pode ser difícil realizar testes unitários devido à dependência do Singleton em seu estado global. Isso pode tornar os testes mais complicados e menos isolados.",
      "<strong>Acoplamento forte:</strong> O uso extensivo do Singleton pode levar a um acoplamento forte em todo o código, o que pode tornar o sistema mais difícil de entender e manter.",
    ],
    useCasesExamples: [
      "<strong>Gerenciamento de conexões:</strong> Em sistemas que requerem conexões com banco de dados, um Singleton pode ser usado para garantir que apenas uma conexão seja aberta e reutilizada em toda a aplicação.",
      "<strong>Configurações globais:</strong> Singleton pode ser usado para armazenar configurações globais da aplicação, como configurações de idioma, temas ou preferências do usuário.",
    ],
    references: [
      {
        name: "Refactoring Guru - Singleton",
        url: "https://refactoring.guru/design-patterns/singleton",
      },
    ],
  },
  {
    id: 4,
    coverImage: iterator,
    definition:
      "O padrão Iterator é um padrão de design comportamental que fornece uma maneira de acessar os elementos de uma coleção sequencial sem expor sua representação subjacente. Ele separa a iteração da coleção, permitindo que você percorra os elementos de uma coleção de maneira uniforme, independentemente da estrutura interna da coleção.",
    benefits: [
      "<strong>Separação de preocupações:</strong> O Iterator Pattern separa a lógica de iteração da estrutura subjacente da coleção, facilitando a manutenção e extensão do código.",
      "<strong>Abstração da coleção:</strong> Ele fornece uma interface unificada para percorrer diferentes tipos de coleções, ocultando os detalhes de implementação da coleção.",
      "<strong>Suporte a iteração personalizada:</strong> O padrão Iterator permite implementar iterações personalizadas sobre uma coleção, fornecendo métodos para acessar os elementos de maneiras específicas.",
    ],
    gistId: "9773edd7a9bbdca673a3729c41499de1",
    disadvantages: [
      "<strong>Complexidade adicional:</strong> Em algumas situações simples, a implementação do Iterator Pattern pode adicionar complexidade desnecessária ao código.",
      "<strong>Overhead de memória:</strong> Em grandes coleções, pode haver overhead de memória ao manter o estado do iterador, especialmente se o iterador mantiver referências aos elementos da coleção.",
    ],
    useCasesExamples: [
      "<strong>Processamento de coleções grandes:</strong> O Iterator Pattern é útil ao percorrer coleções grandes de dados, permitindo que você processe os elementos um por um sem precisar armazenar a coleção inteira na memória.",
      "<strong>Interação com APIs assíncronas:</strong> Em ambientes assíncronos, onde os dados podem não estar disponíveis imediatamente, um Iterator pode ser usado para lidar com a iteração dos resultados à medida que são recebidos.",
    ],
    references: [
      {
        name: "Refactoring Guru - Iterator",
        url: "https://refactoring.guru/design-patterns/iterator",
      },
    ],
  },
  {
    id: 5,
    coverImage: observer,
    definition:
      "O padrão Observer é um padrão de design comportamental que define uma dependência um para muitos entre objetos, de modo que quando um objeto muda de estado, todos os seus dependentes são notificados e atualizados automaticamente. Isso é útil para manter objetos sincronizados e consistentes em um sistema.",
    benefits: [
      "<strong>Desacoplamento:</strong> O Observer Pattern promove o desacoplamento entre observadores e o objeto observado, permitindo que eles evoluam independentemente uns dos outros.",
      "<strong>Extensibilidade:</strong> Novos observadores podem ser adicionados facilmente sem modificar o objeto observado, tornando o sistema mais extensível.",
      "<strong>Notificação eficiente:</strong> Os observadores são notificados apenas quando ocorrem mudanças relevantes no objeto observado, evitando notificações desnecessárias.",
    ],
    gistId: "f16b43286f13f26c8e401540d31c9bb0",
    disadvantages: [
      "<strong>Vazamento de memória:</strong> Se os observadores não forem removidos corretamente, pode haver vazamento de memória, já que o objeto observável mantém referências para os observadores.",
      "<strong>Ordem de notificação não garantida:</strong> A ordem em que os observadores são notificados pode variar e não é garantida, o que pode ser um problema em alguns casos de uso.",
    ],
    useCasesExamples: [
      "<strong>UI de aplicativos web:</strong> No desenvolvimento de interfaces de usuário em aplicativos web, o Observer Pattern é comumente usado para atualizar automaticamente a interface do usuário em resposta a alterações nos dados.",
      "<strong>Eventos em sistemas de mensagens:</strong> Em sistemas de mensagens assíncronas, como sistemas de mensagens instantâneas ou sistemas de notificação em tempo real, o Observer Pattern pode ser usado para notificar os destinatários sobre novas mensagens ou eventos.",
    ],
    references: [
      {
        name: "Refactoring Guru - Observer",
        url: "https://refactoring.guru/design-patterns/observer",
      },
    ],
  },
  {
    id: 6,
    coverImage: proxy,
    definition:
      "O padrão Proxy é um padrão de design estrutural que fornece um substituto ou espaço reservado para outro objeto para controlar o acesso a ele. Ele atua como uma interface para acessar um objeto subjacente, permitindo adicionar funcionalidades adicionais, como verificação de acesso, armazenamento em cache e controle de chamadas remotas.",
    benefits: [
      "<strong>Controle de acesso:</strong> O Proxy permite controlar o acesso ao objeto subjacente, impondo restrições ou verificando permissões antes de permitir que o acesso ocorra.",
      "<strong>Encapsulamento:</strong> Ele encapsula o objeto subjacente, permitindo adicionar comportamentos adicionais sem modificar sua interface original.",
      "<strong>Aprimoramento de desempenho:</strong> O Proxy pode adicionar funcionalidades de armazenamento em cache ou adiar a criação do objeto subjacente até que seja realmente necessário, melhorando o desempenho em certos cenários.",
    ],
    gistId: "8ff1a5c7c1ec0c504cdf624c681007b2",
    disadvantages: [
      "<strong>Complexidade adicional:</strong> A introdução de um Proxy pode adicionar complexidade ao código, especialmente se houver vários Proxys intermediários ou se o comportamento do Proxy for complexo.",
      "<strong>Sobrecarga de desempenho:</strong> Em certos casos, o uso de um Proxy pode introduzir sobrecarga de desempenho devido à necessidade de redirecionar chamadas ao objeto subjacente.",
    ],
    useCasesExamples: [
      "<strong>Acesso remoto:</strong> O Proxy pode ser usado para controlar o acesso a objetos remotos, gerenciando chamadas de rede e autenticação.",
      "<strong>Armazenamento em cache:</strong> Um Proxy pode ser usado para adicionar funcionalidades de armazenamento em cache, armazenando resultados de chamadas caras e retornando-os em chamadas subsequentes.",
    ],
    references: [
      {
        name: "Refactoring Guru - Proxy",
        url: "https://refactoring.guru/design-patterns/proxy",
      },
    ],
  },
  {
    id: 7,
    coverImage: mediator,
    definition:
      "O padrão Mediator é um padrão de design comportamental que promove o desacoplamento de componentes de um sistema ao centralizar sua comunicação por meio de um objeto mediador. Ele ajuda a reduzir a complexidade ao evitar que os componentes se comuniquem diretamente entre si e promove a reutilização de código.",
    benefits: [
      "<strong>Desacoplamento:</strong> O Mediator Pattern desacopla os componentes do sistema, permitindo que eles se concentrem em suas responsabilidades individuais.",
      "<strong>Centralização da lógica de comunicação:</strong> Ao centralizar a lógica de comunicação em um objeto mediador, o padrão facilita a manutenção e evita a duplicação de código.",
      "<strong>Facilita a adição de novos componentes:</strong> Novos componentes podem ser facilmente adicionados ao sistema sem alterar a lógica de comunicação existente, tornando o sistema mais extensível.",
    ],
    gistId: "06a443d2cf8bc7032e447ac8adaeadab",
    disadvantages: [
      "<strong>Complexidade adicional:</strong> Introduzir um objeto mediador pode adicionar complexidade ao sistema, especialmente se a lógica de mediação se tornar muito complexa.",
      "<strong>Potencial ponto único de falha:</strong> O mediador pode se tornar um ponto único de falha se não for adequadamente gerenciado ou se tornar sobrecarregado com responsabilidades excessivas.",
    ],
    useCasesExamples: [
      "<strong>Aplicações de chat em tempo real:</strong> O Mediator Pattern pode ser usado em aplicativos de chat para facilitar a comunicação entre usuários sem que eles tenham que se comunicar diretamente entre si.",
      "<strong>Sistemas de automação residencial:</strong> Em sistemas de automação residencial, o Mediator Pattern pode ser usado para coordenar a comunicação entre dispositivos inteligentes, como termostatos, luzes e sistemas de segurança.",
    ],
    references: [
      {
        name: "Refactoring Guru - Mediator",
        url: "https://refactoring.guru/design-patterns/mediator",
      },
    ],
  },
  {
    id: 8,
    coverImage: visitor,
    definition:
      "O padrão Visitor é um padrão de design comportamental que permite adicionar novas operações a uma estrutura de objetos sem modificar esses objetos. Ele separa o algoritmo da estrutura de objetos em que opera, permitindo que novas operações sejam adicionadas facilmente sem alterar as classes dos objetos.",
    benefits: [
      "Extensibilidade: O Visitor Pattern permite adicionar novas operações aos objetos existentes sem alterar suas classes, promovendo a extensibilidade do código.",
      "Desacoplamento: Ele desacopla o algoritmo das classes de objetos, o que facilita a manutenção e evita a proliferação de subclasses para cada nova operação.",
      "Reutilização de código: Ao separar o algoritmo em classes de visitantes, o padrão promove a reutilização de código ao permitir que diferentes objetos sejam visitados pelo mesmo visitante.",
    ],
    gistId: "e0617879e8ff1121bda01909d117bdf7",
    disadvantages: [
      "Complexidade adicional: O padrão Visitor pode adicionar complexidade ao código, especialmente se a estrutura de objetos for complexa ou se houver muitos tipos diferentes de visitantes.",
      "Violação do princípio aberto/fechado: Embora o Visitor facilite a adição de novas operações, ele pode violar o princípio aberto/fechado se novos tipos de elementos forem adicionados com frequência, exigindo modificações nos visitantes existentes.",
    ],
    useCasesExamples: [
      "Análise de árvores sintáticas: Em compiladores ou interpretadores, o Visitor Pattern pode ser usado para percorrer e analisar árvores sintáticas representando expressões ou comandos.",
      "Geração de relatórios: Em sistemas de geração de relatórios, o Visitor Pattern pode ser usado para visitar diferentes elementos de dados e gerar diferentes tipos de relatórios com base nesses elementos.",
    ],
    references: [
      {
        name: "Refactoring Guru - Visitor",
        url: "https://refactoring.guru/design-patterns/visitor",
      },
    ],
  },
  {
    id: 9,
    coverImage: retry,
    definition:
      "O padrão Retry é um padrão de design comportamental que permite que uma operação seja executada repetidamente até que seja bem-sucedida ou até que determinadas condições sejam atendidas. Ele é útil para lidar com operações que podem falhar devido a condições temporárias, como falhas de rede ou recursos temporariamente indisponíveis.",
    benefits: [
      "<strong>Resiliência:</strong> O Retry Pattern torna o sistema mais resiliente, permitindo que ele se recupere de falhas temporárias sem intervenção manual.",
      "<strong>Melhoria da confiabilidade:</strong> Ele melhora a confiabilidade das operações, tentando novamente até que a operação seja bem-sucedida ou até que um número máximo de tentativas seja atingido.",
      "<strong>Redução de erros não tratados:</strong> Ajuda a reduzir erros não tratados, oferecendo uma maneira estruturada de lidar com falhas temporárias e recuperáveis.",
    ],
    gistId: "14fe53e148e301e1d30529c94f85038e",
    disadvantages: [
      "<strong>Potencial de loops infinitos:</strong> Se não forem definidos limites adequados, o Retry Pattern pode levar a loops infinitos, onde a operação é repetida indefinidamente sem sucesso.",
      "<strong>Atrasos desnecessários:</strong> Em alguns casos, o uso de retry pode resultar em atrasos desnecessários, especialmente se as tentativas forem realizadas rapidamente em situações em que a falha é persistente.",
    ],
    useCasesExamples: [
      "<strong>Acesso a recursos de rede:</strong> O Retry Pattern pode ser usado para lidar com falhas temporárias de rede, como timeouts de conexão ou falhas de servidor.",
      "<strong>Integração com APIs externas:</strong> Ao integrar com APIs externas, o Retry Pattern pode ser usado para lidar com indisponibilidades temporárias da API, tentando novamente até que a API se torne disponível.",
    ],
    references: [],
  },
  {
    id: 10,
    coverImage: builder,
    definition:
      "O padrão Builder é um padrão de design creacional que separa a construção de um objeto complexo de sua representação, permitindo que o mesmo processo de construção crie diferentes representações. Ele é útil quando um objeto pode ter diferentes formas ou configurações e quando o processo de construção é complexo ou requer várias etapas.",
    benefits: [
      "Separação de preocupações: O Builder separa o código de construção do objeto do código que usa o objeto, facilitando a manutenção e a compreensão do código.",
      "Flexibilidade: Ele permite criar diferentes representações do mesmo objeto usando o mesmo processo de construção, o que é útil quando o objeto tem muitas opções de configuração.",
      "Encapsulamento: O Builder encapsula o código de construção dentro de uma classe separada, reduzindo a complexidade e a duplicação de código.",
    ],
    gistId: "59a917f9909e88b2197927a37aeccdee",
    disadvantages: [
      "Complexidade adicional: Em objetos simples, o uso do Builder pode adicionar complexidade desnecessária ao código.",
      "Código repetitivo: Dependendo da implementação, pode haver alguma repetição de código ao definir os métodos de configuração no Builder.",
    ],
    useCasesExamples: [
      "Criação de documentos: Em processadores de texto ou editores de documentos, o Builder Pattern pode ser usado para construir documentos com diferentes formatos, estilos e elementos.",
      "Construção de objetos complexos: Quando um objeto tem muitos atributos opcionais ou configuráveis, o Builder Pattern pode simplificar o processo de criação, permitindo a construção passo a passo do objeto.",
    ],
    references: [
      {
        name: "Refactoring Guru - Builder",
        url: "https://refactoring.guru/design-patterns/builder",
      },
    ],
  },
];

export default lessons;
