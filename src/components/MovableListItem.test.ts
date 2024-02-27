import { mount } from "@vue/test-utils";
import MovableListItem from "@/components/MovableListItem.vue";

describe("MovableListItem.vue", () => {
  test('renders "move up" and "move down" buttons based on props', async () => {
    const wrapper = mount(MovableListItem, {
      props: {
        shouldShowUp: true,
        shouldShowDown: false,
      },
    });

    // Check if "move up" button is rendered
    expect(wrapper.find('button[data-testid="move-up-button"]').exists()).toBe(
      true
    );

    // Check if "move down" button is not rendered
    expect(
      wrapper.find('button[data-testid="move-down-button"]').exists()
    ).toBe(false);
  });

  test('emits "move-up" event when "move up" button is clicked', async () => {
    const wrapper = mount(MovableListItem, {
      props: { shouldShowUp: true },
    });

    await wrapper.find('button[data-testid="move-up-button"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("move-up");
    expect(wrapper.emitted("move-up")!.length).toBe(1);
  });

  test('emits "move-down" event when "move down" button is clicked', async () => {
    const wrapper = mount(MovableListItem, {
      props: { shouldShowDown: true },
    });

    await wrapper
      .find('button[data-testid="move-down-button"]')
      .trigger("click");

    expect(wrapper.emitted()).toHaveProperty("move-down");
    expect(wrapper.emitted("move-down")!.length).toBe(1);
  });
});
