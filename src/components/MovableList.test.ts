import { mount } from "@vue/test-utils";
import MovableListVue from "./MovableList.vue";

describe("MovableList.vue", () => {
  test("renders correctly when passing props and slot", () => {
    const items = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];

    const order = [0, 1];
    const wrapper = mount(MovableListVue, {
      props: { items, order },
      slots: {
        default: `<template #default="{ item }">
          <span data-testid="item">{{ item.title }}</span>
          </template>`,
      },
    });

    const itemTexts = wrapper
      .findAll("[data-testid='item']")
      .map((wrapper) => wrapper.text());

    expect(itemTexts).toEqual([`Post ${items[0].id}`, `Post ${items[1].id}`]); // This checks the order as well
  });

  test("renders nothing when invalid props are passed", () => {
    const items = [
      { id: 1, title: "Item 1" },
      { id: 2, title: "Item 2" },
    ];

    const order = [1, 2];
    const wrapper = mount(MovableListVue, {
      props: { items, order },
      slots: {
        default: `<template #default="{ item }">
        <span data-testid="item">Post {{ item.title }}</span>
        </template>`,
      },
    });

    expect(wrapper.find("[data-testid='item']").exists()).toBe(false);
  });
});
