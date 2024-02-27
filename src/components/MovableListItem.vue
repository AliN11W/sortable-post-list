<script setup lang="ts">
import IconArrowUp from "@/assets/arrow-up.svg";
import IconArrowDown from "@/assets/arrow-down.svg";

defineProps({
  shouldShowUp: {
    type: Boolean,
    default: true,
  },
  shouldShowDown: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["move-up", "move-down"]);
</script>

<template>
  <slot />
  <div class="flex flex-col items-center justify-space-around">
    <button
      v-if="shouldShowUp"
      class="p-2 rounded hover:shadow"
      aria-label="Move item up"
      data-testid="move-up-button"
      @click="emit('move-up')"
    >
      <IconArrowUp class="w-[13px] text-[#6357b1]" />
    </button>

    <button
      v-if="shouldShowDown"
      class="p-2 rounded hover:shadow"
      aria-label="Move item down"
      data-testid="move-down-button"
      @click="emit('move-down')"
    >
      <IconArrowDown class="w-[13px] text-[#6357b1]" />
    </button>
  </div>
</template>
