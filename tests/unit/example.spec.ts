import { shallowMount, mount } from "@vue/test-utils";
import Todo from "@/Router/pages/Todo.vue";
import Add from "@/components/Add.vue";
import ProgressBar from "@/Router/pages/ProgressBar.vue"
import NextDayTodo from "@/Router/pages/NextDayTodo.vue"

describe("Todo.vue", () => {
  it("test", () => {
    const wrapper = shallowMount(Add);
    // expect(wrapper.find(Add).exists()).toBe(true);
  });
});