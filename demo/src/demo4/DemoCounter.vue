<template>
    <div class="counter">
      <counter-button @action="decrement">-</counter-button>

      <counter-value :value="count" />

      <counter-button @action="increment">+</counter-button>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import CounterButton from "demo/src/demo1/CounterButton.vue";
import CounterValue from "demo/src/demo1/CounterValue.vue";

const count = ref(0)

/* Метод уменьшения значения */
const decrement = () => {
  count.value = count.value - 1
}

/* Метод увеличения значения */
const increment = () => {
  count.value = count.value + 1
}
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  align-items: center;
}
</style>
