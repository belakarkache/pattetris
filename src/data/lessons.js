import factory from "@/assets/content-images/factory.png";

const lessons = [
  {
    id: 1,
    coverImage: factory,
    definition:
      "O padrão Factory é um padrão de projeto criacional que fornece uma interface para criar objetos, mas permite que as subclasses alterem o tipo de objeto que será criado. Em outras palavras, ele centraliza a lógica de criação de objetos em uma única classe, tornando o código mais flexível e modular.",
    benefits: [
      "<strong>Flexibilidade:</strong> Permite que novos tipos de objetos sejam facilmente adicionados ao sistema sem modificar o código existente.",
      "<strong>Reutilização:</strong> Evita a duplicação de código para a criação de objetos.",
      "<strong>Decouplamento:</strong> Separa a lógica de criação de objetos da lógica de uso dos objetos.",
      "<strong>Manutenabilidade:</strong> Torna o código mais fácil de entender e manter.",
    ],
    steps: [
      {
        instruction:
          "Defina uma interface abstrata para o tipo de objeto que será criado.",
        code: `interface Product { 
              // Métodos comuns a todos os produtos 
          }`,
      },
    ],
  },
];

export default lessons;
