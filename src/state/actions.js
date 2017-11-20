import mutationTypes from 'mutations-types'
import CharacterPoints from './modules/CharacterPoints'

const addCharacterPoints = (amount) => {
  CharacterPoints.state.totalPoints += amount
}

const removeCharacterPoints = (amount) => {
  let _tempPoints = CharacterPoints.state.totalPoints
  if (_tempPoints - amount > 0) {

  } else {
    throw new Error(`
      Character only has ${_tempPoints}.  
      Cannot go below value of 0, tried removing ${amount}
    `)
  }
}

export default {
  addCharacterPoints,
  removeCharacterPoints
}
