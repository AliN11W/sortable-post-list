<script setup lang="ts" generic="T">
/**
 * This is a generic component that can be used to create a list of items
 * that can be sorted. It uses the useSortableList composable to handle the
 * sorting of the list. This component is created for the purpose of reusability.
 * So it can be used to create a list of any type of items.
 */

import { toRef } from "vue";
import type {
  ListOrderType,
  UpdatedListOrderDetails,
  ListItemType,
} from "@/types";
import useSortableList from "@/features/useSortableList";
import MovableListItem from "@/components/MovableListItem.vue";

const props = defineProps({
  // The list of items to be ordered.
  items: {
    type: Array as () => (ListItemType & T)[],
    required: true,
  },
  // The arbitrary order of the list.
  order: {
    type: Array as () => ListOrderType,
    required: true,
  },
});

const emit = defineEmits<{
  /*
   * This emit is used to communicate the new order and
   * the details of the change to the parent component.
   */
  "update:order": [
    {
      order: ListOrderType;
      details: UpdatedListOrderDetails<T>;
    }
  ];
}>();

const listOrder = toRef(props, "order");

/**
 * Using the useSortableList composable to handle the list sorting.
 * It also accepts a callback to be called when the list order is updated.
 * @see src/features/useSortableList.ts
 */
const { orderedItems, moveUp, moveDown } = useSortableList(
  props.items,
  listOrder,
  onOrderUpdateCallback
);

/**
 * Handles the event when the list order is updated.
 * It's called when the useSortableList successfully updates the list order.
 * So we can add a new snapshot to the TimeTravel component by emitting an event.
 */
function onOrderUpdateCallback(
  fromIndex: number,
  toIndex: number,
  newOrder: ListOrderType
) {
  emit("update:order", {
    order: newOrder,
    details: {
      movedItem: props.items[listOrder.value[toIndex]],
      fromIndex,
      toIndex,
    },
  });
}
</script>

<template>
  <template v-if="orderedItems !== null">
    <div
      role="list"
      data-testid="list-container"
    >
      <TransitionGroup name="list">
        <div
          v-for="(item, index) in orderedItems"
          :key="item.id"
          class="movable-row bg-white flex items-center justify-between shadow-md rounded py-1 px-2 mb-3 h-[65px]"
          role="listitem"
          data-testid="list-item"
        >
          <MovableListItem
            :should-show-up="index !== 0"
            :should-show-down="index !== orderedItems.length - 1"
            @move-up="() => moveUp(index)"
            @move-down="() => moveDown(index)"
          >
            <slot :item="(item as T)" />
          </MovableListItem>
        </div>
      </TransitionGroup>
    </div>
  </template>
</template>

<style scoped>
.list-move {
  transition: transform 0.2s ease;
}
</style>
