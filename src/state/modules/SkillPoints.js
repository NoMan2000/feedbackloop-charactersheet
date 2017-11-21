import CharacterPoints from './CharacterPoints'
import Perks from './AdvantagesPerksDisadvantages'

const state = {
  armoury: 0,
  acrobatics: 0,
  acting: 0,
  animal_handling: 0,
  area_knowledge: 0,
  brawling: 0,
  camouflage: 0,
  carousing: 0,
  climbing: 0,
  computer_operation: 0,
  computer_programming: 0,
  crewman: 0,
  criminology: 0,
  diagnosis: 0,
  disguise: 0,
  disadvantages_list_length: 0,
  electronics_operation: 0,
  electronics_repair: 0,
  engineer: 0,
  escape: 0,
  explosives: 0,
  first_aid: 0,
  forgery: 0,
  gambling: 0,
  hiking: 0,
  holdout: 0,
  influence_diplomacy: 0,
  influence_fast_talk: 0,
  influence_intimidation: 0,
  influence_savoir_faire: 0,
  influence_sex_appeal: 0,
  influence_streetwise: 0,
  interrogation: 0,
  jumping: 0,
  karate: 0,
  law: 0,
  leadership: 0,
  lockpicking: 0,
  mathematics: 0,
  mechanic: 0,
  melee_weapons_easy: 0,
  melee_weapons_average: 0,
  melee_weapons_hard: 0,
  merchant: 0,
  missile_weapons_gunner: 0,
  missile_weapons_gun: 0,
  missile_weapon_flamethrower: 0,
  missile_weapon_blowpipe: 0,
  missile_weapon_bow: 0,
  missile_weapon_crossbow: 0,
  natural_sciences: 0,
  naturalist: 0,
  navigation: 0,
  observation: 0,
  occultism: 0,
  photography: 0,
  physician: 0,
  pickpocket: 0,
  public_speaking: 0,
  research: 0,
  riding: 0,
  scrounging: 0,
  search: 0,
  shadowing: 0,
  shield: 0,
  social_sciences: 0,
  smuggler: 0,
  stealth: 0,
  survival: 0,
  swimming: 0,
  tactics: 0,
  throwing: 0,
  thrown_weapon: 0,
  tracking: 0,
  traps: 0,
  vehicle_skills_easy: 0,
  vehicle_skills_average: 0,
  vehicle_skills_hard: 0,
  writing: 0,
  skill_list: [],
  advantage_list: [],
  disadvantage_list: []
}

/**
 * A number, or a string containing a number.
 * @typedef {Object} SkillHolder
 * @property {number} level - The level of the skill
 * @property {number} cost - The cost of the skill to remainingCharacterPoints
 */

/**
 * @type {SkillHolder[]}
 * @private
 */
const _armouryCosts = [
  {level: -5, cost: 0},
  {level: -1, cost: 1},
  {level: 0, cost: 2},
  {level: 1, cost: 4},
  {level: 2, cost: 8},
  {level: 3, cost: 12}
]
/**
 * @type {SkillHolder[]}
 * @private
 */
const _acrobaticsCosts = [
  {level: -6, cost: 0},
  {level: -2, cost: 1},
  {level: -1, cost: 2},
  {level: 0, cost: 4},
  {level: 1, cost: 8},
  {level: 2, cost: 12}
]

const getters = Object.freeze({
  /**
   *
   * @param {SkillHolder[]} arr
   * @param {number} val
   */
  getCost (arr, val) {
    let {cost} = arr.find((innerVal) => {
      return innerVal.level === val
    })
    return cost
  },
  armouryCost (val) {
    return getters.getCost(_armouryCosts, val)
  },
  acrobaticsCost (val) {
    return getters.getCost(_acrobaticsCosts, val)
  },
  get acrobatics () {
    return state.acrobatics + Perks.perfect_balance
  },
  get armoury () {
    return state.armoury + CharacterPoints.getters.intelligence
  }
})

/**
 *
 * @param cost
 * @returns {boolean}
 * @private
 */
const _canUpgrade = (cost) => {
  let canUpgrade = cost <= CharacterPoints.getters.remainingCharacterPoints
  if (canUpgrade) {
    CharacterPoints.actions.remainingCharacterPoints -= cost
  }
  return canUpgrade
}

/**
 *
 * @type {Object}
 */
const actions = Object.freeze({
  acting: function (val, oldVal) {
    this.setSkillsSelect(acting, val, oldVal)
  },
  animal_handling: function (val, oldVal) {
    this.setSkillsSelect(animal_handling, val, oldVal)
  },
  area_knowledge: function (val, oldVal) {
    this.setSkillsSelect(area_knowledge, val, oldVal)
  },
  set armoury (val) {
    let cost = getters.armouryCost(val)
    let canUpgrade = _canUpgrade(cost)
    if (canUpgrade) {
      state.armoury = val
    }
  },
  set acrobatics (val) {
    let cost = getters.acrobaticsCost(val)
    let canUpgrade = _canUpgrade(cost)
    if (canUpgrade) {
      state.acrobatics = val
    }
  },
  brawling: function (val, oldVal) {
    this.setSkillsSelect(brawling, val, oldVal)
  },
  camouflage: function (val, oldVal) {
    this.setSkillsSelect(camouflage, val, oldVal)
  },
  carousing: function (val, oldVal) {
    this.setSkillsSelect(carousing, val, oldVal)
  },
  climbing: function (val, oldVal) {
    this.setSkillsSelect(climbing, val, oldVal)
  },
  computer_operation: function (val, oldVal) {
    this.setSkillsSelect(computer_operation, val, oldVal)
  },
  computer_programming: function (val, oldVal) {
    this.setSkillsSelect(computer_programming, val, oldVal)
  },
  crewman: function (val, oldVal) {
    this.setSkillsSelect(crewman, val, oldVal)
  },
  criminology: function (val, oldVal) {
    this.setSkillsSelect(criminology, val, oldVal)
  },
  diagnosis: function (val, oldVal) {
    this.setSkillsSelect(diagnosis, val, oldVal)
  },
  disguise: function (val, oldVal) {
    this.setSkillsSelect(disguise, val, oldVal)
  },
  electronics_operation: function (val, oldVal) {
    this.setSkillsSelect(electronics_operation, val, oldVal)
  },
  electronics_repair: function (val, oldVal) {
    this.setSkillsSelect(electronics_repair, val, oldVal)
  },
  explosives: function (val, oldVal) {
    this.setSkillsSelect(explosives, val, oldVal)
  },
  engineer: function (val, oldVal) {
    this.setSkillsSelect(engineer, val, oldVal)
  },
  escape: function (val, oldVal) {
    this.setSkillsSelect(escape, val, oldVal)
  },
  first_aid: function (val, oldVal) {
    this.setSkillsSelect(first_iad, val, oldVal)
  },
  forgery: function (val, oldVal) {
    this.setSkillsSelect(forgery, val, oldVal)
  },
  gambling: function (val, oldVal) {
    this.setSkillsSelect(gambling, val, oldVal)
  },
  hiking: function (val, oldVal) {
    this.setSkillsSelect(hiking, val, oldVal)
  },
  holdout: function (val, oldVal) {
    this.setSkillsSelect(holdout, val, oldVal)
  },
  influence_diplomacy: function (val, oldVal) {
    this.setSkillsSelect(influence_diplomacy, val, oldVal)
  },
  influence_fast_talk: function (val, oldVal) {
    this.setSkillsSelect(influence_fast_talk, val, oldVal)
  },
  influence_intimidation: function (val, oldVal) {
    this.setSkillsSelect(influence_intimidation, val, oldVal)
  },
  influence_savoir_faire: function (val, oldVal) {
    this.setSkillsSelect(influence_savoir_faire, val, oldVal)
  },
  influence_sex_appeal: function (val, oldVal) {
    this.setSkillsSelect(influence_sex_appeal, val, oldVal)
  },
  influence_streetwise: function (val, oldVal) {
    this.setSkillsSelect(influence_streetwise, val, oldVal)
  },
  interrogation: function (val, oldVal) {
    this.setSkillsSelect(interrogation, val, oldVal)
  },
  jumping: function (val, oldVal) {
    this.setSkillsSelect(jumping, val, oldVal)
  },
  karate: function (val, oldVal) {
    this.setSkillsSelect(karate, val, oldVal)
  },
  law: function (val, oldVal) {
    this.setSkillsSelect(law, val, oldVal)
  },
  leadership: function (val, oldVal) {
    this.setSkillsSelect(leadership, val, oldVal)
  },
  lockpicking: function (val, oldVal) {
    this.setSkillsSelect(lockpicking, val, oldVal)
  },
  mathematics: function (val, oldVal) {
    this.setSkillsSelect(mathematics, val, oldVal)
  },
  mechanic: function (val, oldVal) {
    this.setSkillsSelect(mechanic, val, oldVal)
  },
  melee_weapons_easy: function (val, oldVal) {
    this.setSkillsSelect(melee_weapons_easy, val, oldVal)
  },
  melee_weapons_average: function (val, oldVal) {
    this.setSkillsSelect(melee_weapons_average, val, oldVal)
  },
  melee_weapons_hard: function (val, oldVal) {
    this.setSkillsSelect(melee_weapons_hard, val, oldVal)
  },
  merchant: function (val, oldVal) {
    this.setSkillsSelect(merchant, val, oldVal)
  },
  missile_weapons_gunner: function (val, oldVal) {
    this.setSkillsSelect(missile_weapons_gunner, val, oldVal)
  },
  missile_weapons_gun: function (val, oldVal) {
    this.setSkillsSelect(missile_weapons_gun, val, oldVal)
  },
  missile_weapon_flamethrower: function (val, oldVal) {
    this.setSkillsSelect(missile_weapon_flamethrower, val, oldVal)
  },
  missile_weapon_blowpipe: function (val, oldVal) {
    this.setSkillsSelect(missile_weapon_blowpipe, val, oldVal)
  },
  missile_weapon_bow: function (val, oldVal) {
    this.setSkillsSelect(missile_weapon_bow, val, oldVal)
  },
  missile_weapon_crossbow: function (val, oldVal) {
    this.setSkillsSelect(missile_weapon_crossbow, val, oldVal)
  },
  natural_sciences: function (val, oldVal) {
    this.setSkillsSelect(natural_sciences, val, oldVal)
  },
  naturalist: function (val, oldVal) {
    this.setSkillsSelect(naturalist, val, oldVal)
  },
  navigation: function (val, oldVal) {
    this.setSkillsSelect(navigation, val, oldVal)
  },
  observation: function (val, oldVal) {
    this.setSkillsSelect(observation, val, oldVal)
  },
  occultism: function (val, oldVal) {
    this.setSkillsSelect(occultism, val, oldVal)
  },
  physician: function (val, oldVal) {
    this.setSkillsSelect(physician, val, oldVal)
  },
  photography: function (val, oldVal) {
    this.setSkillsSelect(photography, val, oldVal)
  },
  pickpocket: function (val, oldVal) {
    this.setSkillsSelect(pickpocket, val, oldVal)
  },
  public_speaking: function (val, oldVal) {
    this.setSkillsSelect(public_speaking, val, oldVal)
  },
  research: function (val, oldVal) {
    this.setSkillsSelect(research, val, oldVal)
  },
  riding: function (val, oldVal) {
    this.setSkillsSelect(riding, val, oldVal)
  },
  scrounging: function (val, oldVal) {
    this.setSkillsSelect(scrounging, val, oldVal)
  },
  search: function (val, oldVal) {
    this.setSkillsSelect(search, val, oldVal)
  },
  shadowing: function (val, oldVal) {
    this.setSkillsSelect(shadowing, val, oldVal)
  },
  shield: function (val, oldVal) {
    this.setSkillsSelect(shield, val, oldVal)
  },
  social_sciences: function (val, oldVal) {
    this.setSkillsSelect(social_sciences, val, oldVal)
  },
  smuggler: function (val, oldVal) {
    this.setSkillsSelect(smuggler, val, oldVal)
  },
  stealth: function (val, oldVal) {
    this.setSkillsSelect(stealth, val, oldVal)
  },
  survival: function (val, oldVal) {
    this.setSkillsSelect(survival, val, oldVal)
  },
  swimming: function (val, oldVal) {
    this.setSkillsSelect(swimming, val, oldVal)
  },
  tactics: function (val, oldVal) {
    this.setSkillsSelect(tactics, val, oldVal)
  },
  throwing: function (val, oldVal) {
    this.setSkillsSelect(throwing, val, oldVal)
  },
  thrown_weapon: function (val, oldVal) {
    this.setSkillsSelect(thrown_weapon, val, oldVal)
  },
  tracking: function (val, oldVal) {
    this.setSkillsSelect(tracking, val, oldVal)
  },
  traps: function (val, oldVal) {
    this.setSkillsSelect(traps, val, oldVal)
  },
  vehicle_skills_easy: function (val, oldVal) {
    this.setSkillsSelect(vehicle_skills_easy, val, oldVal)
  },
  vehicle_skills_average: function (val, oldVal) {
    this.setSkillsSelect(vehicle_skills_average, val, oldVal)
  },
  vehicle_skills_hard: function (val, oldVal) {
    this.setSkillsSelect(vehicle_skills_hard, val, oldVal)
  },
  writing: function (val, oldVal) {
    this.setSkillsSelect(writing, val, oldVal)
  }
})

export default {
  state,
  getters,
  actions
}
