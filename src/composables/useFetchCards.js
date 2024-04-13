import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

export async function useFetchCards(cardsName) {
  const cardsArr = []
  const querySnapshot = await getDocs(collection(db, cardsName))

  querySnapshot.forEach((doc) => {
    cardsArr.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return cardsArr
}
