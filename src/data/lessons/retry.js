import cover from "@/assets/covers/retry.webp";
import source from "../code/retry.js?raw";

export default {
  cover,
  oneLiner: "Falhou por um instante? Espere um pouco e tente de novo, com limite.",
  definition:
    "Retry é um padrão de resiliência, fora do catálogo clássico do GoF, muito usado em sistemas distribuídos. Quando uma operação falha por um motivo passageiro, como instabilidade de rede ou servidor ocupado, ela é repetida algumas vezes antes de desistir. Uma boa implementação tem número máximo de tentativas, espera crescente entre elas (backoff exponencial), um pouco de aleatoriedade (jitter) e só repete erros que valem a pena repetir.",
  analogy:
    "Ao girar uma peça encostada na parede, o Pattetris não desiste de primeira. Ele tenta até cinco posições alternativas, os chamados wall kicks, e só cancela o giro se nenhuma couber. São tentativas com limite, para uma falha que pode ser contornada.",
  benefits: [
    { title: "Resistência a falhas passageiras", text: "Uma oscilação de rede não vira erro na tela do usuário." },
    { title: "Política em um só lugar", text: "Limite, espera e quais erros repetir ficam definidos uma vez." },
    { title: "Menos intervenção manual", text: "O sistema se recupera sozinho de problemas curtos." },
  ],
  drawbacks: [
    { title: "Pode piorar a sobrecarga", text: "Muitos clientes repetindo ao mesmo tempo derrubam um servidor já sobrecarregado. Use backoff e jitter." },
    { title: "Operações não idempotentes", text: "Repetir um pagamento pode cobrar duas vezes. Só repita o que é seguro repetir." },
  ],
  useCases: [
    { title: "Chamadas a APIs externas", text: "Repetir em caso de timeout ou erro 503, mas nunca em caso de erro 400." },
    { title: "Filas e jobs", text: "Reprocessar mensagens que falharam, com limite e fila de erros." },
  ],
  code: { file: "retry.js", source },
  references: [
    { name: "Microsoft Learn: Retry pattern", url: "https://learn.microsoft.com/azure/architecture/patterns/retry" },
    { name: "AWS: Exponential backoff and jitter", url: "https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/" },
  ],
};
