import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('gameStore', () => {
  const loggedUser = ref('')
  const playerOneResults = ref([])
  const playerTwoResults = ref([])

  function $reset() {
    playerOneResults.value = []
    playerTwoResults.value = []
  }

  return { loggedUser, playerOneResults, playerTwoResults, $reset }
})


