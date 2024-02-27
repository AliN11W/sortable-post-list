import { isEqual } from "@/utils/array";
import { ListOrderType } from "@/types";
import { Ref, computed, ref, watch } from "vue";

export default function useSortableList<T>(
  initialList: T[],
  initialOrder: Ref<ListOrderType>,
  onUpdatedCallback: (
    oldIndex: number,
    newIndex: number,
    newOrder: ListOrderType
  ) => void
) {
  const order = ref(initialOrder.value);

  const orderedItems = computed(() => {
    if (initialList.length !== order.value.length) {
      console.error(
        "The length of the initial list and the order are different"
      );

      return null;
    }

    if (!isEqual(Object.keys(initialList), order.value)) {
      console.error(
        "The initial list and the order have different keys or different order"
      );
      return null;
    }

    // Sort the list based on the order
    return order.value.map((index) => initialList[index]);
  });

  const move = (fromIndex: number, toIndex: number) => {
    const itemIndex = order.value[fromIndex];
    order.value[fromIndex] = order.value[toIndex];
    order.value[toIndex] = itemIndex;
    onUpdated(onUpdatedCallback, fromIndex, toIndex);
  };

  const moveUp = (oldIndex: number) => {
    if (oldIndex > 0) {
      const newIndex = oldIndex - 1;
      move(oldIndex, newIndex);
    }
  };

  const moveDown = (oldIndex: number) => {
    if (oldIndex < order.value.length - 1) {
      const newIndex = oldIndex + 1;
      move(oldIndex, newIndex);
    }
  };

  const onUpdated = (
    callback: (
      oldIndex: number,
      newIndex: number,
      newOrder: ListOrderType
    ) => void,
    oldIndex: number,
    newIndex: number
  ) => {
    return callback(oldIndex, newIndex, [...order.value]);
  };

  watch(initialOrder, (newOrder) => {
    order.value = newOrder;
  });

  return {
    moveUp,
    moveDown,
    orderedItems,
  };
}
