<script setup lang="ts">
import { onMounted, ref } from "vue";
import { POSTS_COUNT } from "@/constants";
import usePost from "@/features/usePost";
import CrossedBackground from "@/components/CrossedBackground.vue";
import MovableList from "@/components/MovableList.vue";
import TimeTravel from "@/components/TimeTravel.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import type { UpdatedListOrderDetails, PostType, ListOrderType } from "@/types";

// Define the initial order of the list.
// This is used to reset the list order.
// We could also use the initial order of the posts, or take it from the server/user.
const initialOrder = [0, 1, 2, 3, 4];

// Using a clone of the initial order to avoid modifying the original array.
const currentOrder = ref([...initialOrder]);

// Create a reference to the TimeTravel component to call its methods.
// This is used to add a new snapshot to the TimeTravel component from
// the parent component.
const timeTravelRef = ref<InstanceType<typeof TimeTravel>>();

const posts = ref<PostType[]>();
const loading = ref(true);

onMounted(async () => {
  const { fetchPosts } = usePost();

  try {
    const result = await fetchPosts(POSTS_COUNT);
    if (result.posts) {
      posts.value = result.posts;
    }
    loading.value = false;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

// Handles the event when the list order is updated.
// It's called when the MovableList emits the "update:order" event.
// So we can add a new snapshot to the TimeTravel component.
function onListOrderUpdated(event: {
  order: ListOrderType;
  details: UpdatedListOrderDetails<PostType>;
}) {
  timeTravelRef.value?.addSnapshot({
    text: `Moved ${event.details.movedItem.title} from index ${event.details.fromIndex} to index ${event.details.toIndex}`,
    order: event.order,
  });
}

// Sets the list order to the given value.
// It's passed to the TimeTravel component to be called when a snapshot is clicked
// to set the list order to the order of that snapshot.
const setListOrder = (newOrder: ListOrderType | null) => {
  currentOrder.value = newOrder === null ? [...initialOrder] : newOrder;
};
</script>

<template>
  <div>
    <LoadingSpinner
      v-if="loading"
      class="w-[50px] h-[50px] text-[#6357b1] absolute top-1/2 left-1/2"
    />

    <template v-else>
      <div class="md:flex justify-between text-left items-start">
        <div class="w-full md:w-[45%]">
          <h1 class="mb-4 h1 md:text-white text-gray-700 font-semibold">
            Sortable Post List
          </h1>
          <template v-if="posts">
            <!--
              MovableList component is used to create a list of arbitrary items that can be reordered, no matter the type of the items.
              It emits the "update:order" event when the list order is updated.
            -->
            <MovableList
              :items="posts"
              :order="currentOrder"
              @update:order="onListOrderUpdated"
            >
              <template #default="slotProps">
                <span class="text-gray-500 font-semibold">
                  {{ slotProps.item.title }}
                </span>
              </template>
            </MovableList>
          </template>
        </div>

        <!--
          TimeTravel component is used to create a list of snapshots of the list order.
          when a snapshot is clicked, the list order is set to the order of that snapshot
          via the "set-list-order" event.
        -->
        <TimeTravel
          ref="timeTravelRef"
          class="w-full md:w-[45%] mt-10 md:mt-0"
          @set-list-order="setListOrder"
        />
      </div>
    </template>
  </div>
  <CrossedBackground />
</template>
