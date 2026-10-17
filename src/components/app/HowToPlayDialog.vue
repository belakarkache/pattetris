<template>
  <AppDialog ref="dialog" title="Como jogar" @close="emit('close')">
    <div class="howto">
      <section class="howto__goal">
        <div class="howto__demo" aria-hidden="true">
          <span v-for="(type, index) in DEMO_ROW" :key="index" class="block" :class="`piece-${type}`" />
        </div>
        <p>
          Encaixe as peças para completar linhas inteiras. Linhas completas somem e valem pontos.
          A cada nível, um padrão de projeto é desbloqueado na sua <strong>coleção</strong>.
        </p>
      </section>

      <div class="howto__tabs" role="tablist" aria-label="Tipo de controle">
        <button
          v-for="tab in TABS"
          :key="tab.id"
          type="button"
          role="tab"
          :aria-selected="mode === tab.id"
          class="howto__tab"
          @click="mode = tab.id"
        >
          <AppIcon :name="tab.icon" :size="18" />
          {{ tab.label }}
        </button>
      </div>

      <ul v-if="mode === 'keyboard'" class="howto__list" role="tabpanel">
        <li v-for="control in CONTROLS" :key="control.action">
          <span class="howto__keys">
            <KeyCap v-for="code in uniqueKeys(control.keys)" :key="code" :code="code" />
          </span>
          {{ control.label }}
        </li>
      </ul>

      <ul v-else class="howto__list howto__list--touch" role="tabpanel">
        <li v-for="item in TOUCH" :key="item.text">
          <span class="howto__keys">
            <span class="howto__touch-icon" :class="`tone-${item.tone}`">
              <AppIcon :name="item.icon" :size="18" />
            </span>
          </span>
          {{ item.text }}
        </li>
      </ul>

      <p class="howto__tip">
        A sombra mostra onde a peça vai cair. Guarde uma peça para usar depois, uma vez a cada peça nova.
      </p>

      <KeyButton class="howto__done" @click="dialog.close()">Entendi</KeyButton>
    </div>
  </AppDialog>
</template>

<script setup>
import { ref } from "vue";
import AppDialog from "@/components/ui/AppDialog.vue";
import AppIcon from "@/components/ui/AppIcon.vue";
import KeyButton from "@/components/ui/KeyButton.vue";
import KeyCap from "@/components/ui/KeyCap.vue";
import { CONTROLS, keyName } from "@/game/controls";
import { useMediaQuery } from "@/composables/useMediaQuery";

const emit = defineEmits(["close"]);
const dialog = ref(null);

const DEMO_ROW = ["t", "t", "s", "s", "i", "i", "i", "i", "o", "o"];

const TABS = [
  { id: "keyboard", label: "Teclado", icon: "game" },
  { id: "touch", label: "Toque", icon: "hold" },
];

const TOUCH = [
  { icon: "arrow-left", tone: "sky", text: "Botões de seta ou arraste no tabuleiro para mover" },
  { icon: "arrow-down", tone: "sky", text: "Segure a seta para baixo ou arraste para baixo para descer" },
  { icon: "rotate-cw", tone: "lilac", text: "Botões de giro ou um toque no tabuleiro para girar" },
  { icon: "drop", tone: "pink", text: "Botão rosa ou deslize rápido para baixo para soltar" },
  { icon: "hold", tone: "butter", text: "Toque no quadro Guardada para guardar a peça" },
];

const isTouch = useMediaQuery("(pointer: coarse)");
const mode = ref(isTouch.value ? "touch" : "keyboard");

const uniqueKeys = (keys) => keys.filter((code, index) => keys.findIndex((other) => keyName(other) === keyName(code)) === index);
</script>

<style lang="scss">
.howto {
  display: flex;
  flex-direction: column;
  gap: 18px;

  &__goal {
    display: grid;
    gap: 14px;
    color: var(--ink-soft);
  }

  &__demo {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 3px;
    padding: 8px;
    border-radius: 14px;
    background: var(--well);

    .block {
      aspect-ratio: 1;
      animation: demo-clear 2.4s ease-in-out infinite;
    }
  }

  &__tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    padding: 4px;
    border-radius: 14px;
    background: var(--well);
  }

  &__tab {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 40px;
    border: 0;
    border-radius: 10px;
    background: transparent;
    color: var(--ink-soft);
    font-weight: 600;
    cursor: pointer;

    &[aria-selected="true"] {
      background: var(--surface);
      color: var(--ink);
    }
  }

  &__list {
    display: grid;
    gap: 10px;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }

  &__keys {
    display: flex;
    gap: 4px;
    flex: none;
    width: 112px;
  }

  &__list--touch .howto__keys {
    width: auto;
  }

  &__touch-icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: var(--tone);
    color: var(--on-pastel);
    box-shadow: var(--bevel);
  }

  &__tip {
    padding: 12px 14px;
    border-radius: 14px;
    background: var(--hot-soft);
    font-size: var(--text-sm);
  }

  &__done {
    align-self: stretch;
  }
}

@keyframes demo-clear {
  0%,
  55% {
    opacity: 1;
    transform: none;
  }
  65% {
    background: #ffffff;
    transform: scale(1.1);
  }
  80% {
    opacity: 0;
    transform: scale(0.3);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 420px) {
  .howto__keys {
    width: 88px;
  }
}
</style>
