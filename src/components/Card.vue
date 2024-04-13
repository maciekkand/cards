<template>
  <div class="m-8 border shadow-lg border-slate-300 rounded-xl">

    <div class="flex flex-col items-center py-3 min-h-48">
      <p
        data-test="card-name"
        class="mb-3 text-2xl font-bold text-blue-600"
      >
        {{ name }}
      </p>

      <p
        data-test="card-value"
        class="text-4xl text-green-700"
      >
        {{ weight || crew }}
      </p>

      <p
        data-test="card-attribute"
        class="mt-2 text-base text-gray-700"
      >{{ weight && 'Weight' || crew && 'Crew' }}</p>

      <p
        v-if="winner"
        data-test="card-winner"
        class="flex justify-center w-full p-2 mt-2 text-base text-red-500 bg-yellow-200 rounded"
      >Winner !</p>

    </div>

  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    default: ''
  },
  weight: {
    type: Number,
    default: null
  },
  crew: {
    type: Number,
    default: null
  },
  winner: {
    type: Boolean,
    default: false
  },
})

</script>
