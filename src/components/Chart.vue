<template>
  <Chart
    :size="{ width: 250, height: 200 }"
    :data="data"
    :margin="margin"
    :direction="direction"
  >
    <template #layers>
      <Line :dataKeys="['deal','ratio']" />
    </template>
  </Chart>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Chart, Line } from 'vue3-charts'

const props = defineProps({
  arr: {
    type: Object,
    default: []
  }
})

const data = ref([])
const direction = ref('horizontal')
const margin = ref({
  left: 0,
  top: 12,
  right: 20,
  bottom: 0
})

const playerOneResultsArray = computed(() => Array.from(props.arr))

watch(playerOneResultsArray, newVal => {
  data.value = []
  newVal.forEach((el, index) => data.value.push({ deal: index, ratio: el }))

  return data.value
})
</script>
