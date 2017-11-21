const state = {
  characterPoints: 100,
  totalPoints: 100,
  strength: 10,
  dexterity: 10,
  intelligence: 10,
  health: 10,
  hitPoints: 10,
  willpower: 10,
  perception: 10,
  fatiguePoints: 10,
  remainingCharacterPoints: 100,
  basicLift: 20,
  basicSpeed: 5,
  damageThrown: '1d-2',
  damageSwung: '1d',
  basicMove: 5,
  dodge: 8,
  basicSpeedOffset: 0,
  enhanced_block: false,
  enhancedDodge: false
}

const getters = Object.freeze({
  get attributepoints () {
    return Number(getters.strength) +
      Number(getters.dexterity) +
      Number(getters.intelligence) +
      Number(getters.health) +
      Number(getters.hitPoints) +
      Number(getters.willpower) +
      Number(getters.perception) +
      Number(getters.fatiguePoints) +
      Number(getters.basicSpeed)
  },
  get strength () {
    return state.strength
  },
  get dexterity () {
    return state.dexterity
  },
  get intelligence () {
    return state.intelligence
  },
  get health () {
    return state.health
  },
  get hitPoints () {
    return state.hitPoints
  },
  get willpower () {
    return state.willpower
  },
  get characterPoints () {
    return state.characterPoints
  },
  get perception () {
    return state.perception
  },
  get fatiguePoints () {
    return state.fatiguePoints
  },
  get basicSpeed () {
    return state.basicSpeed
  },
  get basicMove () {
    return state.basicMove
  },
  get basicLift () {
    return state.basicLift
  },
  get enhancedDodge () {
    return state.enhancedDodge
  },
  get remainingCharacterPoints () {
    return state.remainingCharacterPoints
  },
  BASE_STAT: 10,
  BASE_STRENGTH_COST: 10,
  BASE_DEXTERITY_COST: 20,
  BASE_INTELLIGENCE_COST: 20,
  BASE_HEALTH_COST: 10,
  BASE_PERCEPTION_COST: 5,
  BASE_WILL_POWER_COST: 5,
  BASE_FATIGUE_COST: 3,
  BASIC_SPEED_COST: 5,
  BASE_HIT_POINTS_COST: 2,
  DODGE_DIV_BASE: 3,
  SPEED_DIV_BASE: 4
})

const actions = Object.freeze({
  maxDisadvantages () {
    return -(getters.characterPoints / 2)
  },
  updateBasicLift () {
    state.basicLift = Math.pow(getters.strength, 2) / 5
  },
  updateThrownThrustAndSwing () {
    let thrown = null
    let swung = null
    switch (Number(getters.strength)) {
      case 8:
        thrown = '1d-3'
        swung = '1d-2'
        break
      case 9:
        thrown = '1d-2'
        swung = '1d-1'
        break
      case 10:
        thrown = '1d-2'
        swung = '1d'
        break
      case 11:
        thrown = '1d-1'
        swung = '1d+1'
        break
      case 12:
        thrown = '1d-1'
        swung = '1d+2'
        break
      case 13:
        thrown = '1d'
        swung = '2d'
        break
      case 14:
        thrown = '1d'
        swung = '2d'
        break
      case 15:
        thrown = '1d+1'
        swung = '2d+1'
        break
      case 16:
        thrown = '1d+2'
        swung = '2d+2'
        break
      case 17:
        thrown = '1d+2'
        swung = '3d-1'
        break
      case 18:
        thrown = '1d+2'
        swung = '3d'
        break
      case 19:
        thrown = '2d-1'
        swung = '3d+1'
        break
      case 20:
        thrown = '2d-1'
        swung = '3d+2'
        break
    }
    state.damageThrown = thrown
    state.damageSwung = swung
  },
  updateBasicSpeedDodgeAndMove () {
    state.basicSpeed = ((getters.dexterity + getters.health) / getters.SPEED_DIV_BASE) + getters.basicSpeedOffset
    state.basicMove = Math.floor(getters.basicSpeed)
    state.dodge = getters.basicMove + getters.DODGE_DIV_BASE + getters.enhancedDodge
  },
  updateBasicMoveAndDodge () {
    state.basicMove = Math.floor(getters.basicSpeed)
    state.dodge = getters.basicMove + getters.DODGE_DIV_BASE
  },
  set characterPoints (val) {
    state.remainingCharacterPoints += val - getters.remainingCharacterPoints
  },
  canUpdateValue (offset, baseCost) {
    baseCost = Number(baseCost)
    offset *= baseCost
    let canChange = false

    if (offset <= getters.remainingCharacterPoints) {
      canChange = true
      state.remainingCharacterPoints -= offset
    }
    return canChange
  },
  set strength (val) {
    let diff = val - getters.strength
    let canChange = actions.canUpdateValue(
      diff,
      getters.BASE_STRENGTH_COST
    )
    if (canChange) {
      state.strength = val
      state.hitPoints += diff
      actions.updateBasicLift()
      actions.updateThrownThrustAndSwing()
    }
    return canChange
  },
  set dexterity (val) {
    let canChange = actions.canUpdateValue(
      val - getters.dexterity,
      getters.BASE_DEXTERITY_COST
    )
    if (canChange) {
      state.dexterity = val
      actions.updateBasicSpeedDodgeAndMove()
    }
    return canChange
  },
  set intelligence (val) {
    let diff = val - getters.intelligence
    let canChange = actions.canUpdateValue(
      diff,
      getters.BASE_INTELLIGENCE_COST
    )
    if (canChange) {
      state.intelligence = val
      state.perception += diff
      state.willpower += diff
    }
    return canChange
  },
  set health (val) {
    let diff = val - getters.health
    let canChange = actions.canUpdateValue(
      diff,
      getters.BASE_HEALTH_COST
    )
    if (canChange) {
      state.health = val
      state.fatiguePoints += diff
      actions.updateBasicSpeedDodgeAndMove()
    }
    return canChange
  },
  set hitPoints (val) {
    let overThirty = (val / getters.strength) > 1.3
    let canChange = actions.canUpdateValue(
      val === getters.strength ? 0 : val - getters.strength,
      getters.BASE_HIT_POINTS_COST
    ) && !overThirty
    if (canChange) {
      state.hitPoints = val
    }
    return canChange
  },
  set willpower (val) {
    let canChange = actions.canUpdateValue(
      val === getters.intelligence ? 0 : val - getters.intelligence,
      getters.BASE_WILL_POWER_COST
    )
    if (canChange) {
      state.willpower = val
    }
    return canChange
  },
  set fatiguePoints (val) {
    let canChange = actions.canUpdateValue(
      val === getters.health ? 0 : val - getters.fatiguePoints,
      getters.BASE_FATIGUE_COST
    )
    if (canChange) {
      state.fatiguePoints = val
    }
    return canChange
  },
  perception: function (val, oldVal) {
    let canChange = actions.canUpdateValue(
      val === getters.intelligence ? 0 : val - getters.intelligence,
      getters.BASE_PERCEPTION_COST
    )
    if (canChange) {
      state.perception = val
    }
    return canChange
  },
  set basicSpeed (val) {
    let speed = ((getters.dexterity + getters.health) / 4) + getters.basicSpeedOffset
    if (speed === val) {
      return
    }
    let offset = (val - getters.basicSpeed) * 4
    let totalOffset = (val - getters.basicSpeed) + getters.basicSpeedOffset
    let canUpdate = actions.canUpdateValue(
      speed === val ? 0 : offset,
      getters.BASIC_SPEED_COST
    ) && totalOffset < 2
    if (canUpdate) {
      state.basicSpeedOffset = totalOffset
      state.basicSpeed = val
    }
    actions.updateBasicMoveAndDodge()
    return canUpdate
  },
  greaterThanMaxDisadvantages (offset) {
    return (getters.disadvantages + offset) < getters.maxDisadvantages
  }
})

export default {
  state,
  getters,
  actions
}
