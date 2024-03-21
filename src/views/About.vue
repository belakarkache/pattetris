<template>
    <section class="about">
        <h1>Sobre o Pattetris</h1>

        <p>
            Pattetris é uma recriação do jogo de quebra-cabeça que tem como objetivo encaixar as peças que caem do topo
            da tela. O jogador pode girar as peças e movê-las para a esquerda ou direita. O jogo termina quando as peças
            empilhadas atingem o topo da tela.
            <br>
            <br>

            O jogo foi completamente inspirado no <a href="https://tetris.com/about-us" target="_blank">Tetris
                original</a>, e esta adaptação foi elaborada para jogabilidade baseada na web utilizando Javascript com
            Vue.js. A ideia de criar a minha versão do jogo veio como uma forma de demonstrar e praticar meus estudos em
            design patterns.
            <br><br>
            Além do conteúdo criado exclusivamente como recompensa ao subir de nível no jogo, também foi utilizado o
            design pattern Factory dentro do próprio código do jogo. Caso queira aprofundar-se nas complexidades de
            parte desta implementação, abaixo poderá encontrar a explicação dentro do contexto do jogo.
        </p>

        <h3>Fábrica de peças</h3>

        <p>
            No Pattetris, temos 5 peças diferentes que podem cair do topo da grade para encaixe:
        </p>

        <div class="about__display">
            <div class="about__piece-display" v-for="piece in piecesDisplay" :key="piece.name">
                <img :src="piece.img" :alt="`Pré-visualização da ${piece.name}`" />
                <p>{{ piece.name }}</p>
            </div>
        </div>

        <p>Todas as atribuições e métodos necessários para desenhar uma peça do jogo dentro da grade estão centralizados
            em uma fábrica de peças - arquivo Javascript que eu decidi chamar de PieceFactory.</p>

        <div class="gist-wrapper">
            <div id="about-vue-gist"></div>
        </div>

        <p>No código demonstrado, o “width” representa a largura da grade. No código original do
            Pattetris, o valor de
            “width” é 10, ou seja, monta uma grade numerada de 0 a 99. No entanto, para exemplificar e facilitar a
            visualização, vou utilizar o width de valor 4, gerando uma grade de 4x4, numerada de 0 a 15.</p>

        <img src="@/assets/content-icons/4x4-grid.svg" width="200" class="grid-image" />

        <p>
            A função de criar peça (ex.: createLPiece) determina qual o quadradinho colorido dentro da grade (matriz)
            resultando na peça desejada e todas as suas possíveis posições, como no exemplo, a peça L.
        </p>

        <div class="about__display">
            <picture class="about__display--code">
                <source srcset="@/assets/content-images/about-code-mobile.jpg" media="(max-width: 768px)">
                <source srcset="@/assets/content-images/about-code.jpg">
                <img src="@/assets/content-images/about-code.jpg" alt="Flowers">
            </picture>
        </div>

        <p>
            Se colorirmos na grade os números gerados na função, podemos observar que é gerada a peça L em todas as
            posições, conforme o esperado. E isso se repete com as demais funções, criando todas as peças necessárias
            para jogar.
        </p>

        <div class="about__animation-display">
            <div class="piece-animation" v-for="animation, index in animations" :key="index">
                <div class="piece-animation__button"
                    :class="{ 'piece-animation__button--inactive': animation.wasSeen }">
                    {{ animation.array }}
                    <button @click="handlePlayButton(index)">
                        <IconPlay :size="20" />
                    </button>
                </div>
                <Vue3Lottie :animationData="animation.animation" :loop="0" :scale="1.01" :ref="'piece-' + index"
                    :autoPlay="false" />
            </div>
        </div>

        <h3>Uso prático do design pattern Factory no Pattetris</h3>

        <p>
            O padrão Factory é um padrão de design creacional que fornece uma interface para criar objetos em uma
            superclasse, mas permite que as subclasses alterem o tipo de objetos que serão criados.<br><br>
            No Pattetris, o padrão Factory está sendo utilizado da seguinte forma:
        </p>

        <ol>
            <li>
                <strong>Funções de criação de peças individuais:</strong> As funções createLPiece, createZPiece,
                createTPiece,
                createOPiece e createIPiece são responsáveis por criar diferentes tipos de peças. Cada uma dessas
                funções aceita um parâmetro width que é usado para calcular as posições das células na peça.
            </li>

            <li>
                <strong>Função createPiece:</strong> Esta função é a fábrica propriamente dita. Ela aceita dois
                parâmetros: type e width.
                O parâmetro type especifica o tipo de peça que se deseja criar, enquanto o width é necessário para
                calcular as posições das células nas peças.
            </li>

            <li>
                <strong>Switch-case para determinar o tipo de peça:</strong> Dentro da função createPiece, há um bloco
                switch-case que
                determina qual função de criação de peça deve ser chamada com base no tipo especificado. Se o tipo for
                "l", "z", "t", "o" ou "i", a função correspondente de criação de peça será chamada com o parâmetro width
                fornecido, e a peça será retornada. Se o tipo não for reconhecido, uma matriz vazia é retornada.
            </li>

            <li>
                <strong>Exportação da função createPiece:</strong> Por fim, a função createPiece é exportada como padrão
                para que outras
                partes do código possam usá-la para criar peças conforme necessário.
            </li>
        </ol>

        <p>
            Este padrão Factory permite adicionar facilmente novos tipos de peças simplesmente criando uma nova função
            de criação e estendendo o switch-case na função createPiece para incluir o novo tipo. Isso ajuda a manter o
            código organizado e permite escalabilidade ao adicionar mais funcionalidades no futuro.
        </p>
    </section>
</template>

<script>
import horizontalLeft from '@/assets/animations/Lpiecehorizontalleft.json'
import horizontalRight from '@/assets/animations/Lpiecehorizontalright.json'
import verticalUp from '@/assets/animations/Lpieceverticaltop.json'
import verticalDown from '@/assets/animations/Lpieceverticalbottom.json'
import gistSimple from "gist-simple";
import lPiece from '@/assets/content-images/l-piece.jpg';
import oPiece from '@/assets/content-images/o-piece.jpg';
import tPiece from '@/assets/content-images/t-piece.jpg';
import zPiece from '@/assets/content-images/z-piece.jpg';
import iPiece from '@/assets/content-images/i-piece.jpg';
import IconPlay from "@/components/icons/IconPlay.vue";

export default {
    name: "Sobre",
    components: {
        IconPlay
    },
    data() {
        return {
            horizontalLeft,
            horizontalRight,
            verticalUp,
            verticalDown,
            animations: [
                { animation: verticalUp, array: "[1, 5, 9, 2]", wasSeen: false }, { animation: horizontalRight, array: '[4, 5, 6, 10]', wasSeen: false, }, { animation: verticalDown, array: '[1, 5, 9, 8]', wasSeen: false }, { animation: horizontalLeft, array: '[4, 8, 9, 10]', wasSeen: false }
            ],
            gistId: '3bf7a48e1f33fcf62df92d9aa862f01f',
            piecesDisplay: [
                {
                    name: 'Peça "L"',
                    img: lPiece
                },
                {
                    name: 'Peça "O"',
                    img: oPiece
                },
                {
                    name: 'Peça "T"',
                    img: tPiece
                },
                {
                    name: 'Peça "Z"',
                    img: zPiece
                },
                {
                    name: 'Peça "I"',
                    img: iPiece
                }
            ],
        };
    },
    mounted() {
        if (this.gistId) {
            gistSimple(document.getElementById("about-vue-gist"), {
                id: this.gistId,
            });
        }
    },
    methods: {
        playAnimation(animationName) {
            if (animationName && this.$refs[animationName] && !this.$refs[animationName].length) {
                setTimeout(() => {
                    this.$refs[animationName].play();
                }, 100);
            } else {
                this.$refs[animationName][0].play();
            }
        },
        handlePlayButton(index) {
            this.animations[index].wasSeen = true;

            setTimeout(() => {
                this.playAnimation('piece-' + index)
            }, 300);
        }
    },
};
</script>
<style lang="scss">
.about {
    display: flex;
    flex-direction: column;
    padding: var(--size);
    max-width: $tablet;
    margin: 0 auto;

    @media(max-width: $mobile) {
        max-width: 100%;
    }

    p {
        font-size: 16px;
        margin-bottom: 12px;
        margin-top: 12px;

        a {
            color: var(--tetris-pink)
        }
    }

    h3 {
        font-size: 22px;
        font-weight: 600;
        margin-top: 32px;
    }

    &__see-code-button {
        color: var(--hl-purple);
        font-size: 14px;
    }



    #about-vue-gist {
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .grid-image {
        width: 200px;
        margin: 20px auto;
    }

    .piece-animation {
        width: 180px;
        position: relative;

        &__button {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: 1;
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 1;
            transition: 0.3s ease-in-out all;
            flex-direction: column;
            gap: 12px;
            font-size: 18px;
            font-weight: 600;

            button {
                padding: 10px;
                border: 2px solid var(--dark-blue);
                border-radius: 100%;
                transition: 0.2s ease-in-out all;

                &:hover {
                    background-color: transparentize(#282451, 0.6);
                }
            }

            &--inactive {
                opacity: 0;
                pointer-events: none;
            }
        }
    }

    @media(max-width: $mobile) {
        padding: calc(var(--size) / 2);
    }

    &__piece-display {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;

        p {
            margin: 0;
            font-weight: 600;
        }
    }

    &__display {
        padding: var(--size);
        display: flex;
        gap: 20px;
        background-color: white;
        border-radius: 20px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        max-width: 100%;

        &--code {
            max-width: 100%;

            img {
                max-width: 100%;
            }
        }

        @media(max-width: $mobile) {
            padding: calc(var(--size) / 2);
        }
    }

    &__animation-display {
        display: flex;
        gap: 20px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    ol {
        max-width: 100%;

        li strong,
        &::marker {
            font-weight: 600;
        }

        li {
            margin-bottom: 12px;
        }
    }
}
</style>