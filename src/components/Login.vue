<template>
  <h1 class='mt-8 mb-4 ml-8 text-2xl text-blue-500'>Sign in</h1>

  <p>
    <input
      v-model="email"
      type="email"
      placeholder='Email'
      class='block p-2 mb-4 ml-8 text-xl border rounded-md placeholder:italic placeholder:text-slate-400 min-w-96 border-slate-300 focus:outline-none focus:border-sky-500'
    />
  </p>

  <p>
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="block p-2 mb-4 ml-8 text-xl border rounded-md placeholder:italic placeholder:text-slate-400 min-w-96 border-slate-300 focus:outline-none focus:border-sky-500"
    />
  </p>

  <p class="h-6 text-red-500 first-letter:capitalize">
    {{ errMsg && errMsg }}
  </p>

  <p>
    <button
      @click="signIn"
      :disabled="!email || !password"
      class="p-2 mt-3 text-xl text-white bg-blue-500 rounded-md ml-9 min-w-24 border-slate-300 disabled:opacity-50"
    >Submit</button>

    <button
      @click="signInWithGoogle"
      class='p-2 mt-5 ml-20 text-xl text-white bg-blue-500 rounded-md min-w-52 border-slate-300'
    >Sign In With Google</button>
  </p>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/GameStore'

const router = useRouter()
const gameStore = useGameStore()
const { loggedUser } = storeToRefs(gameStore)

const email = ref('')
const password = ref('')
const errMsg = ref('')

const signIn = () => {
  const auth = getAuth()

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(userCredential => {
      gameStore.loggedUser = auth.currentUser.email
      router.push('/')
    })
    .catch(error => {
      errMsg.value = error.code.split('/')[1].replaceAll('-', ' ')
    })
}

const signInWithGoogle = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  signInWithPopup(auth, provider)
    .then(res => {
      gameStore.loggedUser = auth.currentUser.displayName || auth.currentUser.email
      router.push('/')
    })
    .catch(err => {
      errMsg.value = error.code.split('/')[1].replaceAll('-', ' ')
    })
}
</script>

