<template>
  <div class='flex items-center justify-center gap-16 mt-24'>
    <div class="">
      <input
        data-test="people-radio"
        type="radio"
        value="people"
        v-model="selectedSet"
        name="default-radio"
        class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
      >
      <label
        for="radio-1"
        class="text-base font-medium text-gray-900 ms-2"
      >People</label>
    </div>

    <div class="">
      <input
        data-test="starships-radio"
        type="radio"
        value="starships"
        v-model="selectedSet"
        name="default-radio"
        class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
      >
      <label
        for="radio-2"
        class="text-base font-medium text-gray-900 ms-2"
      >Starships</label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['cardsChange'])
const selectedSet = ref('people')

watch(selectedSet, (newValue, oldValue) => {
  emit('cardsChange', newValue)
})

</script>

