<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "#6357b1",
  },
});
</script>

<template>
  <div class="fixed -z-[1] top-0 left-0 w-full">
    <svg
      viewBox="0 0 250 200"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="0,0 250,0 0,44"
        :fill="color"
      />
    </svg>
  </div>
</template>
