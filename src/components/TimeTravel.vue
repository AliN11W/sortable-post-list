<script setup lang="ts">
import { ref } from "vue";
import TimeTravelItem from "./TimeTravelItem.vue";
import type { Optional, TimeTravelSnapshot } from "@/types";
import { randomHex } from "@/utils/string";

/**
 * Expose the addSnapshot method to the parent component.
 * So it can add a new snapshot to the list.
 */
defineExpose({ addSnapshot });

/**
 * Expose the order of the list to the parent component based on the snapshot.
 */
const emit = defineEmits(["set-list-order"]);

const snapshots = ref<TimeTravelSnapshot[]>([]);

function addSnapshot(snapshot: Optional<TimeTravelSnapshot, "id">) {
  // Generate a random identifier for each snapshot.
  // Used when Vue needs to track the snapshots in the list.
  snapshot.id = randomHex(6);
  snapshots.value.unshift(snapshot as TimeTravelSnapshot);
}

const travelToListOrder = (index: number) => {
  snapshots.value.splice(0, index + 1);
  emit("set-list-order", snapshots.value[0]?.order ?? null);
};
</script>

<template>
  <div class="border rounded-md shadow-md overflow-hidden">
    <header class="p-3 bg-white">
      <h2 class="font-semibold text-gray-700">List of actions commited</h2>
    </header>
    <div class="bg-gray-100 p-3 min-h-[72px]">
      <div
        v-if="snapshots.length > 0"
        class="relative"
        data-testid="time-travel-list"
      >
        <TransitionGroup name="list">
          <TimeTravelItem
            v-for="(snapshot, index) in snapshots"
            :key="snapshot.id"
            class="[&:not(:last-child)]:border-b first:rounded-t last:rounded-b text-[13px] font-medium text-gray-600"
            @travel-to-list-order="() => travelToListOrder(index)"
          >
            {{ snapshot.text }}
          </TimeTravelItem>
        </TransitionGroup>
      </div>
      <p
        v-else
        class="p-3 text-center text-gray-500"
      >
        No actions commited yet
      </p>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transition: all 0.2s ease;
}

.list-leave-active {
  position: absolute;
}
</style>
