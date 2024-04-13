<template>
  <div class='w-full flex justify-center mb-12'>
    <span
      data-test="player-one-score"
      class='text-6xl text-blue-700 min-w-48 ml-40'
    >{{ playerOne }}</span>

    <span
      data-test="player-two-score"
      class='text-6xl text-blue-700 min-w-48 ml-12'
    >{{ playerTwo }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  playerOne: {
    type: Number,
    default: 0
  },
  playerTwo: {
    type: Number,
    default: 0
  }
})

</script>
