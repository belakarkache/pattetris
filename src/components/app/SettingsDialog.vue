<template>
  <AppDialog title="Configurações" @close="emit('close')">
    <div class="settings">
      <label class="settings__row">
        <span>
          <strong>Sons</strong>
          <small>Efeitos ao girar, encaixar e completar linhas</small>
        </span>
        <input type="checkbox" role="switch" class="switch" :checked="settings.sound"
          @change="settings.setSound($event.target.checked)" />
      </label>

      <label class="settings__row">
        <span>
          <strong>Peça fantasma</strong>
          <small>Mostra onde a peça vai cair</small>
        </span>
        <input type="checkbox" role="switch" class="switch" :checked="settings.ghost"
          @change="settings.setGhost($event.target.checked)" />
      </label>

      <fieldset class="settings__row settings__row--stack">
        <legend><strong>Tema</strong></legend>
        <div class="segmented">
          <label v-for="option in THEMES" :key="option.value" class="segmented__option">
            <input type="radio" name="theme" :value="option.value" :checked="settings.theme === option.value"
              @change="settings.setTheme(option.value)" />
            <AppIcon :name="option.icon" :size="18" />
            {{ option.label }}
          </label>
        </div>
      </fieldset>

      <div class="settings__row settings__row--stack settings__danger">
        <span>
          <strong>Apagar progresso</strong>
          <small>{{ resetText }}</small>
        </span>
        <div v-if="confirming" class="settings__confirm">
          <KeyButton tone="pink" size="sm" @click="reset">Apagar tudo</KeyButton>
          <KeyButton tone="plain" size="sm" @click="confirming = false">Cancelar</KeyButton>
        </div>
        <KeyButton v-else tone="plain" size="sm" :disabled="!hasProgress" @click="confirming = true">
          Apagar progresso
        </KeyButton>
      </div>

      <p class="settings__credit">
        Desenvolvido por <a href="https://www.icka.dev/" target="_blank" rel="noopener">icka.dev</a>
      </p>
    </div>
  </AppDialog>
</template>

<script setup>
import { computed, ref } from "vue";
import AppDialog from "@/components/ui/AppDialog.vue";
import AppIcon from "@/components/ui/AppIcon.vue";
import KeyButton from "@/components/ui/KeyButton.vue";
import { useSettingsStore } from "@/stores/settings";
import { useProgressStore } from "@/stores/progress";
import { useToasts } from "@/composables/useToasts";

const emit = defineEmits(["close"]);
const settings = useSettingsStore();
const progress = useProgressStore();
const { show } = useToasts();
const confirming = ref(false);

const THEMES = [
  { value: "system", label: "Sistema", icon: "monitor" },
  { value: "light", label: "Claro", icon: "sun" },
  { value: "dark", label: "Escuro", icon: "moon" },
];

const resetText = computed(() =>
  progress.unlocked > 0
    ? `Remove o recorde e bloqueia de novo ${progress.unlocked === 1 ? "o padrão liberado" : `os ${progress.unlocked} padrões liberados`}.`
    : "Remove o recorde e os padrões liberados. Ainda não há nada para apagar."
);

const hasProgress = computed(() => progress.unlocked > 0 || progress.bestScore > 0);

const reset = () => {
  progress.resetProgress();
  confirming.value = false;
  show({ title: "Progresso apagado", text: "Sua coleção começa do zero." });
};
</script>

<style lang="scss">
.settings {
  display: grid;
  gap: 4px;

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin: 0;
    padding: 14px 0;
    border: 0;
    border-bottom: 1px solid var(--line);
    cursor: pointer;

    &:last-child {
      border-bottom: 0;
    }

    > span {
      display: grid;
      gap: 2px;
    }

    small {
      font-size: var(--text-sm);
      color: var(--ink-soft);
    }

    &--stack {
      flex-direction: column;
      align-items: stretch;
      cursor: default;
    }

    legend {
      float: left;
      margin-bottom: 10px;
      padding: 0;
    }
  }

  &__confirm {
    display: flex;
    gap: 8px;
  }

  &__danger .key {
    align-self: flex-start;
  }

  &__credit {
    margin: 8px 0 0;
    font-size: var(--text-sm);
    color: var(--ink-soft);
    text-align: center;

    a {
      color: var(--ink);
      font-weight: 600;
    }
  }
}

.switch {
  appearance: none;
  position: relative;
  flex: none;
  width: 48px;
  height: 28px;
  margin: 0;
  border-radius: 14px;
  background: var(--well);
  box-shadow: inset 0 0 0 1.5px var(--line);
  cursor: pointer;
  transition: background 160ms ease;

  &::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 20px;
    border-radius: 6px;
    background: var(--surface);
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
    transition: transform 200ms var(--ease-out);
  }

  &:checked {
    background: var(--hot);
    box-shadow: none;

    &::after {
      transform: translateX(20px);
    }
  }
}

.segmented {
  clear: both;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 4px;
  border-radius: 14px;
  background: var(--well);

  &__option {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 40px;
    border-radius: 10px;
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--ink-soft);
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    &:has(input:checked) {
      background: var(--surface);
      color: var(--ink);
    }

    &:has(input:focus-visible) {
      box-shadow: var(--focus);
    }
  }
}
</style>
