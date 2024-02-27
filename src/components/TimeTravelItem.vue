<script setup lang="ts">
const emit = defineEmits(["travel-to-list-order"]);
</script>

<template>
  <div class="container bg-white flex justify-between items-center p-2">
    <slot />
    <button
      class="travel rounded bg-[#25ff90] font-semibold text-[10px] md:text-[13px] p-2 md:px-5 border-none"
      @click="emit('travel-to-list-order')"
    >
      Time travel
    </button>
  </div>
</template>
