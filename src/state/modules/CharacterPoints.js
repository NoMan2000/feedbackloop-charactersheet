import { skillPoints } from './SkillPoints'

const CharacterPoints = class CharacterPoints {
  constructor () {
    this._characterPoints = 100
    this._totalPoints = 100
    this._strength = 10
    this._dexterity = 10
    this._intelligence = 10
    this._health = 10
    this._hitPoints = 10
    this._willpower = 10
    this._perception = 10
    this._fatiguePoints = 10
    this._remainingCharacterPoints = 100
    this._basicLift = 20
    this._basicSpeed = 5
    this._damageThrown = '1d-2'
    this._damageSwung = '1d'
    this._basicMove = 5
    this._dodge = 8
    this._basicSpeedOffset = 0
    this.BASE_STAT = 10
    this.BASE_STRENGTH_COST = 10
    this.BASE_DEXTERITY_COST = 20
    this.BASE_INTELLIGENCE_COST = 20
    this.BASE_HEALTH_COST = 10
    this.BASE_PERCEPTION_COST = 5
    this.BASE_WILL_POWER_COST = 5
    this.BASE_FATIGUE_COST = 3
    this.BASIC_SPEED_COST = 5
    this.BASE_HIT_POINTS_COST = 2
    this.DODGE_DIV_BASE = 3
    this.SPEED_DIV_BASE = 4
    this.disadvantages = 0
    this._maxDisadvantages = -(this._characterPoints / 2)
  }

  /**
   * @returns {number}
   */
  get attributepoints () {
    return Number(this.strength) +
      Number(this.dexterity) +
      Number(this.intelligence) +
      Number(this.health) +
      Number(this.hitPoints) +
      Number(this.willpower) +
      Number(this.perception) +
      Number(this.fatiguePoints) +
      Number(this.basicSpeed)
  }

  /**
   * @returns {number}
   */
  get strength () {
    return Number(this._strength)
  }

  /**
   * @param {number} val
   */
  set strength (val) {
    val = Number(val)
    let diff = val - this.strength
    if (!diff) {
      return
    }
    let canChange = this.canUpdateValue(
      diff,
      this.BASE_STRENGTH_COST
    )
    if (canChange) {
      this._strength = val
      this.hitPoints += diff
      this.basicLift = Math.pow(this.strength, 2) / 5
      this.updateThrownThrustAndSwing()
    }
  }

  /**
   * @returns {number}
   */
  get dodge () {
    return this._dodge
  }

  /**
   * @param {number} val
   */
  set dodge (val) {
    this._dodge = Number(val)
  }

  /**
   * @returns {number}
   */
  get dexterity () {
    return Number(this._dexterity)
  }

  /**
   * @param {number} val
   */
  set dexterity (val) {
    val = Number(val)
    let diff = val - this.dexterity
    if (!diff) {
      return
    }
    let canChange = this.canUpdateValue(
      diff,
      this.BASE_DEXTERITY_COST
    )
    if (canChange) {
      this._dexterity = val
      this.updateBasicSpeedDodgeAndMove()
    }
  }

  /**
   * @returns {number}
   */
  get intelligence () {
    return Number(this._intelligence)
  }

  /**
   * @param {number} val
   */
  set intelligence (val) {
    val = Number(val)
    let diff = val - this.intelligence
    if (!diff) {
      return
    }
    let canChange = this.canUpdateValue(
      diff,
      this.BASE_INTELLIGENCE_COST
    )
    if (canChange) {
      this._intelligence = val
      this._perception += diff
      this._willpower += diff
    }
  }

  /**
   * @returns {number}
   */
  get health () {
    return this._health
  }

  /**
   * @param {number} val
   */
  set health (val) {
    val = Number(val)
    let diff = val - this.health
    if (!diff) {
      return
    }
    let canChange = this.canUpdateValue(
      diff,
      this.BASE_HEALTH_COST
    )
    if (canChange) {
      this._health = val
      this._fatiguePoints += diff
      this.updateBasicSpeedDodgeAndMove()
    }
  }

  /**
   * @returns {number}
   */
  get hitPoints () {
    return this._hitPoints
  }

  /**
   * @param {number} val
   */
  set hitPoints (val) {
    val = Number(val)
    let overThirty = (val / this.strength) > 1.3
    let canChange = this.canUpdateValue(
      val === this.strength ? 0 : val - this.strength,
      this.BASE_HIT_POINTS_COST
    ) && !overThirty
    if (canChange) {
      this._hitPoints = val
    }
  }

  /**
   * @returns {number}
   */
  get willpower () {
    return this._willpower
  }

  /**
   * @param {number} val
   * @returns {boolean}
   */
  set willpower (val) {
    val = Number(val)
    let canChange = this.canUpdateValue(
      val === this.intelligence ? 0 : val - this.intelligence,
      this.BASE_WILL_POWER_COST
    )
    if (canChange) {
      this._willpower = val
    }
    return canChange
  }

  /**
   * @returns {number}
   */
  get characterPoints () {
    return this._characterPoints
  }

  /**
   * @param {number} val
   */
  set characterPoints (val) {
    val = Number(val)
    this._characterPoints = val
  }

  /**
   * @returns {number}
   */
  get perception () {
    return this._perception
  }

  /**
   * @param {number} val
   * @returns {boolean}
   */
  set perception (val) {
    val = Number(val)
    let canChange = this.canUpdateValue(
      val === this.intelligence ? 0 : val - this.intelligence,
      this.BASE_PERCEPTION_COST
    )
    if (canChange) {
      this._perception = val
    }
  }

  /**
   * @returns {number}
   */
  get fatiguePoints () {
    return this._fatiguePoints
  }

  /**
   * @param {number} val
   */
  set fatiguePoints (val) {
    val = Number(val)
    let canChange = this.canUpdateValue(
      val === this.health ? 0 : val - this.fatiguePoints,
      this.BASE_FATIGUE_COST
    )
    if (canChange) {
      this._fatiguePoints = val
    }
  }

  /**
   * @returns {number}
   */
  get basicSpeed () {
    return this._basicSpeed
  }

  /**
   * @param {number} val
   */
  set basicSpeed (val) {
    val = Number(val)
    let speed = ((this.dexterity + this.health) / 4) + this.basicSpeedOffset
    if (speed === val) {
      return
    }
    let offset = (val - this.basicSpeed) * 4
    let totalOffset = (val - this.basicSpeed) + this.basicSpeedOffset
    let canUpdate = this.canUpdateValue(
      speed === val ? 0 : offset,
      this.BASIC_SPEED_COST
    ) && totalOffset < 2
    if (canUpdate) {
      this.basicSpeedOffset = totalOffset
      this._basicSpeed = val
    }
    this.updateBasicMoveAndDodge()
  }

  /**
   * @returns {number}
   */
  get basicMove () {
    return this._basicMove
  }

  /**
   * @param {number} val
   */
  set basicMove (val) {
    this._basicMove = val
  }

  /**
   * @returns {number}
   */
  get basicLift () {
    return this._basicLift
  }

  /**
   * @param {number} val
   */
  set basicLift (val) {
    this._basicLift = Number(val)
  }

  /**
   * @returns {number}
   */
  get remainingCharacterPoints () {
    return this._remainingCharacterPoints
  }

  /**
   * @param {number} val
   */
  set remainingCharacterPoints (val) {
    val = Number(val)
    this._remainingCharacterPoints = val
  }

  /**
   * @returns {number}
   */
  get maxDisadvantages () {
    return this._maxDisadvantages
  }

  /**
   * @param {number} val
   */
  set maxDisadvantages (val) {
    this._maxDisadvantages = -(val / 2)
  }

  /**
   * @returns {string}
   */
  get damageThrown () {
    return this._damageThrown
  }

  /**
   * @param {string} val
   */
  set damageThrown (val) {
    this._damageThrown = val
  }

  /**
   * @returns {string}
   */
  get damageSwung () {
    return this._damageSwung
  }

  /**
   * @param {string} val
   */
  set damageSwung (val) {
    val = Number(val)
    this._damageSwung = val
  }

  /**
   * @returns {number}
   */
  get basicSpeedOffset () {
    return this._basicSpeedOffset
  }

  /**
   * @param {number} val
   */
  set basicSpeedOffset (val) {
    val = Number(val)
    this._basicSpeedOffset = val
  }

  addDisadvantages () {
    this.disadvantages += 1
  }

  removeDisadvantage () {
    this.disadvantages -= 1
  }

  /**
   *
   */
  updateThrownThrustAndSwing () {
    let thrown = null
    let swung = null
    switch (Number(this.strength)) {
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
    this.damageThrown = thrown
    this.damageSwung = swung
  }

  /**
   *
   */
  updateBasicSpeedDodgeAndMove () {
    this.basicSpeed = ((this.dexterity + this.health) / this.SPEED_DIV_BASE) + this.basicSpeedOffset
    this.basicMove = Math.floor(this.basicSpeed)
    this.dodge = this.basicMove + this.DODGE_DIV_BASE + skillPoints.enhancedDodge
  }

  /**
   *
   */
  updateBasicMoveAndDodge () {
    this._basicMove = Math.floor(this.basicSpeed)
    this._dodge = this.basicMove + this.DODGE_DIV_BASE
  }

  /**
   * @param {number} offset
   * @param {number} baseCost
   * @returns {boolean}
   */
  canUpdateValue (offset, baseCost) {
    baseCost = Number(baseCost)
    offset = Number(offset)
    offset *= baseCost
    let canChange = false

    if (offset <= this.remainingCharacterPoints) {
      canChange = true
      this._remainingCharacterPoints -= offset
    }
    return canChange
  }

  /**
   * @param {number} offset
   * @returns {boolean}
   */
  greaterThanMaxDisadvantages (offset) {
    return (this.disadvantages + offset) < this.maxDisadvantages
  }
}

export const characterPoints = new CharacterPoints()
