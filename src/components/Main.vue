<template>
    <SelectBox @cardsChange="cardsChange" />

    <div class="flex justify-center mt-8">
      <Chart :arr="playerOneResults" />

      <Card
        class="mt-2 ml-5 text-xl text-red-700 min-w-48 min-h-48 flex flex-col justify-center"
        :name=cardOne.name
        :weight=cardOne.weight
        :crew=cardOne.crew
        :winner="winnerOne"
      />

      <Card
        class="mt-2 ml-5 text-xl text-red-700 min-w-48 min-h-48 flex flex-col justify-center"
        :name=cardTwo.name
        :weight=cardTwo.weight
        :crew=cardTwo.crew
        :winner="winnerTwo"
      />

      <Chart :arr="playerTwoResults" />

    </div>

    <div class="flex items-center justify-center">
      <Score
        :playerOne=scorePlayerOne
        :playerTwo=scorePlayerTwo
      />
    </div>

    <div class="flex items-center justify-center">
      <button
        data-test="go-button"
        @click="shuffleCards"
        class="text-2xl rounded-md border-slate-300 bg-green-600 text-white min-w-48 min-h-12"
        >Go</button>

      <button
        data-test="reset-button"
        @click="reset"
        class="ml-12 text-2xl rounded-md border-slate-300 bg-red-700 text-white min-w-48 min-h-12"
      >Reset</button>

    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, computed, isRef, unref } from 'vue'
import Card from '@/components/Card.vue'
import Score from '@/components/Score.vue'
import SelectBox from '@/components/SelectBox.vue'
import Chart from '@/components/Chart.vue'
import { useFetchCards } from '@/composables/useFetchCards'
import { useShuffleCards } from '@/composables/useShuffleCards'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/GameStore'

const gameStore = useGameStore()
const { playerOneResults, playerTwoResults } = storeToRefs(gameStore)

const playerOneResultsArray = computed(() => Array.from(playerOneResults.value))
const playerTwoResultsArray = computed(() => Array.from(playerTwoResults.value))

const variant = ref([])
const shuffledCards = ref([])
const cardOne = ref({})
const cardTwo = ref({})
const scorePlayerOne = ref(0)
const scorePlayerTwo = ref(0)
const winnerOne = ref(false)
const winnerTwo = ref(false)

function shuffleCards() {
  shuffledCards.value = useShuffleCards(variant.value.length)
  cardOne.value = variant.value[shuffledCards.value[0]]
  cardTwo.value = variant.value[shuffledCards.value[1]]

  countResult()
}

function countResult() {
  if (cardOne.value.weight > cardTwo.value.weight || cardOne.value.crew > cardTwo.value.crew) {
    scorePlayerOne.value += 1
    winnerOne.value = true
    winnerTwo.value = false
  }
  else if (cardOne.value.weight < cardTwo.value.weight || cardOne.value.crew < cardTwo.value.crew) {
    scorePlayerTwo.value += 1
    winnerTwo.value = true
    winnerOne.value = false
  }
  else {
    scorePlayerOne.value += 0.5
    scorePlayerTwo.value += 0.5
    winnerOne.value = false
    winnerTwo.value = false
  }
}

async function cardsChange(cardsName = 'people') {
  variant.value = await useFetchCards(cardsName)
  shuffleCards()
}

function reset() {
  cardOne.value = {}
  cardTwo.value = {}
  scorePlayerOne.value = 0
  scorePlayerTwo.value = 0
  winnerOne.value = false
  winnerTwo.value = false
  gameStore.$reset()
}

watchEffect(() => {
  const playerOneRatio = Math.round(100 * scorePlayerOne.value / (scorePlayerOne.value + scorePlayerTwo.value)) || 0
  const playerTwoRatio = Math.round(100 * scorePlayerTwo.value / (scorePlayerOne.value + scorePlayerTwo.value)) || 0

  playerOneResults.value.push(playerOneRatio)
  playerTwoResults.value.push(playerTwoRatio)
})

onMounted(async() => {
  variant.value = await useFetchCards('people')
  reset()
})

</script>
