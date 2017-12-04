import { characterPoints } from './characterPoints'

import Perks from './AdvantagesPerksDisadvantages'

import { costs } from './Costs'

const SkillPoints = class SkillPoints {
  /**
   * @param {number} cost
   * @returns {boolean}
   * @private
   */
  canUpgrade = (cost) => {
    let canUpgrade = cost <= characterPoints.remainingCharacterPoints
    if (canUpgrade) {
      characterPoints.remainingCharacterPoints -= cost
    }
    return canUpgrade
  }

  constructor () {
    this._armoury = 0
    this._acrobatics = 0
    this._acting = 0
    this._animalHandling = 0
    this._areaKnowledge = 0
    this._brawling = 0
    this._camouflage = 0
    this._carousing = 0
    this._climbing = 0
    this._computerOperation = 0
    this._computerProgramming = 0
    this._crewman = 0
    this._criminology = 0
    this._diagnosis = 0
    this._disguise = 0
    this._disadvantagesListLength = 0
    this._enhancedBlock = false
    this._enhancedDodge = false
    this._electronicsOperation = 0
    this._electronicsRepair = 0
    this._engineer = 0
    this._escape = 0
    this._explosives = 0
    this._first_aid = 0
    this._forgery = 0
    this._gambling = 0
    this._hiking = 0
    this._holdout = 0
    this._influenceDiplomacy = 0
    this._influenceFastTalk = 0
    this._influenceIntimidation = 0
    this._influence_savoir_faire = 0
    this._influence_sex_appeal = 0
    this._influence_streetwise = 0
    this._interrogation = 0
    this._jumping = 0
    this._karate = 0
    this._law = 0
    this._leadership = 0
    this._lockpicking = 0
    this._mathematics = 0
    this._mechanic = 0
    this._melee_weapons_easy = 0
    this._melee_weapons_average = 0
    this._melee_weapons_hard = 0
    this._merchant = 0
    this._missile_weapons_gunner = 0
    this._missile_weapons_gun = 0
    this._missile_weapon_flamethrower = 0
    this._missile_weapon_blowpipe = 0
    this._missile_weapon_bow = 0
    this._missile_weapon_crossbow = 0
    this._natural_sciences = 0
    this._naturalist = 0
    this._navigation = 0
    this._observation = 0
    this._occultism = 0
    this._photography = 0
    this._physician = 0
    this._pickpocket = 0
    this._public_speaking = 0
    this._research = 0
    this._riding = 0
    this._scrounging = 0
    this._search = 0
    this._shadowing = 0
    this._shield = 0
    this._social_sciences = 0
    this._smuggler = 0
    this._stealth = 0
    this._survival = 0
    this._swimming = 0
    this._tactics = 0
    this._throwing = 0
    this._thrown_weapon = 0
    this._tracking = 0
    this._traps = 0
    this._vehicle_skills_easy = 0
    this._vehicle_skills_average = 0
    this._vehicle_skills_hard = 0
    this._writing = 0
    this._skill_list = []
  }

  /**
   * @returns {number}
   */
  get acrobatics () {
    return this._acrobatics + Perks.perfect_balance
  }

  /**
   * @param {number} val
   */
  set acrobatics (val) {
    val = Number(val)
    let cost = this.acrobaticsCost(val)
    let canUpgrade = this.canUpgrade(cost)
    if (canUpgrade) {
      this._acrobatics = val
    }
  }

  /**
   * @returns {number}
   */
  get armoury () {
    return this._armoury + characterPoints.intelligence
  }

  /**
   * @param {number} val
   */
  set armoury (val) {
    val = Number(val)
    let cost = this.armouryCost(val)
    let canUpgrade = this.canUpgrade(cost)
    if (canUpgrade) {
      this._armoury = val
    }
  }

  /**
   * @returns {number}
   */
  get acting () {
    return this._acting + characterPoints.intelligence
  }

  /**
   * @param {number} val
   */
  set acting (val) {
    let cost = this.actingCost(val)
    let canUpgrade = this.canUpgrade(cost)
    if (canUpgrade) {
      this._acting = val
    }
  }

  /**
   * @returns {number}
   */
  get areaKnowledge () {
    return this._areaKnowledge + characterPoints.intelligence
  }

  /**
   * @param {number} val
   */
  set areaKnowledge (val) {
    val = Number(val)
    let cost = this.areaKnowledgeCost(val)
    let canUpgrade = this.canUpgrade(cost)
    if (canUpgrade) {
      this._areaKnowledge = val
    }
  }

  /**
   * @returns {number}
   */
  get animalHandling () {
    return this._animalHandling + characterPoints.intelligence
  }

  /**
   * @param {number} val
   */
  set animalHandling (val) {
    val = Number(val)
    let cost = this.animalHandling(val)
    let canUpgrade = this.canUpgrade(cost)
    if (canUpgrade) {
      this._animalHandling = val
    }
  }

  /**
   * @returns {number}
   */
  get brawling () {
    return Number(this._brawling)
  }

  /**
   * @param {number} val
   */
  set brawling (val) {
    val = Number(val)
    this._brawling = val
  }

  /**
   * @returns {number}
   */
  get camouflage () {
    return Number(this._camouflage)
  }

  /**
   * @param {number} val
   */
  set camouflage (val) {
    this._camouflage = Number(val)
  }

  /**
   * @returns {number}
   */
  get carousing () {
    return this._carousing
  }

  /**
   * @param {number} val
   */
  set carousing (val) {
    val = Number(val)
    this._carousing = val
  }

  /**
   * @returns {number}
   */
  get climbing () {
    return Number(this._climbing)
  }

  /**
   * @param {number} val
   */
  set climbing (val) {
    this._climbing = Number(val)
  }

  /**
   * @returns {number}
   */
  get computerOperation () {
    return Number(this._computerOperation)
  }

  /**
   * @param {number} val
   */
  set computerOperation (val) {
    this._computerOperation = Number(val)
  }

  /**
   * @returns {number}
   */
  get computerProgramming () {
    return Number(this._computerProgramming)
  }

  /**
   * @param {number} val
   */
  set computerProgramming (val) {
    this._computerProgramming = Number(val)
  }

  /**
   * @returns {number}
   */
  get crewman () {
    return Number(this._crewman)
  }

  /**
   * @param {number} val
   */
  set crewman (val) {
    this._crewman = Number(val)
  }

  /**
   * @param {number} val
   */
  set criminology (val) {
    this._criminology = Number(val)
  }

  /**
   * @returns {number}
   */
  get diagnosis () {
    return Number(this._diagnosis)
  }

  /**
   * @param {number} val
   */
  set diagnosis (val) {
    this._diagnosis = Number(val)
  }

  /**
   * @param {number} val
   */
  set disguise (val) {
    this._disguise = Number(val)
  }

  /**
   * @returns {number}
   */
  get electronicsOperation () {
    return Number(this._electronicsOperation)
  }

  /**
   * @param {number} val
   */
  set electronicsOperation (val) {
    this._electronicsOperation = Number(val)
  }

  /**
   * @returns {number}
   */
  get electronicsRepair () {
    return Number(this._electronicsRepair)
  }

  /**
   * @param {number} val
   */
  set electronicsRepair (val) {
    this._electronicsRepair = Number(val)
  }

  /**
   * @returns {number}
   */
  get explosives () {
    return Number(this._explosives)
  }

  /**
   * @param {number} val
   */
  set explosives (val) {
    this._explosives = Number(val)
  }

  /**
   * @returns {number}
   */
  get engineer () {
    return Number(this._engineer)
  }

  /**
   * @param {number} val
   */
  set engineer (val) {
    this._engineer = Number(val)
  }

  /**
   * @returns {number}
   */
  get escape () {
    return Number(this._escape)
  }

  /**
   * @param {number} val
   */
  set escape (val) {
    this._escape = Number(val)
  }

  /**
   * @returns {number}
   */
  get firstAid () {
    return Number(this._firstAid)
  }

  /**
   * @param {number} val
   */
  set firstAid (val) {
    this._firstAid = Number(val)
  }

  /**
   * @returns {number}
   */
  get forgery () {
    return Number(this._forgery)
  }

  /**
   * @param {number} val
   */
  set forgery (val) {
    this._forgery = Number(val)
  }

  /**
   * @returns {number}
   */
  get gambling () {
    return Number(this._gambling)
  }

  /**
   * @param {number} val
   */
  set gambling (val) {
    this._gambling = Number(val)
  }

  /**
   * @returns {number}
   */
  get hiking () {
    return Number(this._hiking)
  }

  /**
   * @param {number} val
   */
  set hiking (val) {
    this._hiking = Number(val)
  }

  /**
   * @returns {number}
   */
  get holdout () {
    return Number(this._holdout)
  }

  /**
   * @param {number} val
   */
  set holdout (val) {
    this._holdout = Number(val)
  }

  /**
   * @returns {number}
   */
  get influenceDiplomacy () {
    return Number(this._influenceDiplomacy)
  }

  /**
   * @param {number} val
   */
  set influenceDiplomacy (val) {
    this._influenceDiplomacy = val
  }

  /**
   * @returns {number}
   */
  get influenceFastTalk () {
    return Number(this._influenceFastTalk)
  }

  /**
   * @param {number} val
   */
  set influenceFastTalk (val) {
    this._influenceFastTalk = Number(val)
  }

  /**
   *
   * @param {SkillHolder[]} arr
   * @param {number} val
   * @returns {number}
   */
  getCost (arr, val) {
    let {cost} = arr.find((innerVal) => {
      return innerVal.level === val
    })
    return Number(cost)
  }

  /**
   * @param {number} val
   * @returns {number}
   */
  armouryCost (val) {
    return this.getCost(costs.armouryCosts, val)
  }

  /**
   * @param {number} val
   * @returns {number}
   */
  actingCost (val) {
    return this.getCost(costs.actingCosts, val)
  }

  /**
   * @param {number} val
   * @returns {number}
   */
  acrobaticsCost (val) {
    return this.getCost(costs.acrobaticsCosts, val)
  }

  /**
   * @param val
   * @returns {number}
   */
  animalHandlingCost (val) {
    return this.getCost(costs.animalHandlingCost, val)
  }

  /**
   * @param {number} val
   * @returns {number}
   */
  areaKnowledgeCost (val) {
    return this.getCost(costs.areaKnowledgeCost, val)
  }

  /**
   * @returns {number}
   */
  brawlingCost (val) {
    return this.getCost(costs.brawlingCost, val)
  }

  influenceIntimidation (val) {
    this._influenceIntimidation = val
  }

  influence_savoir_faire (val) {
    this._influence_savoir_faire = val
  }

  influence_sex_appeal (val) {
    this._influence_sex_appeal = val
  }

  influence_streetwise (val) {
    this._influence_streetwise = val
  }

  interrogation (val) {
    this._interrogation = val
  }

  jumping (val) {
    this._jumping = val
  }

  karate (val) {
    this._karate = val
  }

  law (val) {
    this._law = val
  }

  leadership (val) {
    this._leadership = val
  }

  lockpicking (val) {
    this._lockpicking = val
  }

  mathematics (val) {
    this._mathematics = val
  }

  mechanic (val) {
    this._mechanic = val
  }

  melee_weapons_easy (val) {
    this._melee_weapons_easy = val
  }

  melee_weapons_average (val) {
    this._melee_weapons_average = val
  }

  melee_weapons_hard (val) {
    this._melee_weapons_hard = val
  }

  merchant (val) {
    this._merchant = val
  }

  missile_weapons_gunner (val) {
    this._missile_weapons_gunner = val
  }

  missile_weapons_gun (val) {
    this._missile_weapons_gun = val
  }

  missile_weapon_flamethrower (val) {
    this._missile_weapon_flamethrower = val
  }

  missile_weapon_blowpipe (val) {
    this._missile_weapon_blowpipe = val
  }

  missile_weapon_bow (val) {
    this._missile_weapon_bow = val
  }

  missile_weapon_crossbow (val) {
    this._missile_weapon_crossbow = val
  }

  natural_sciences (val) {
    this._natural_sciences = val
  }

  naturalist (val) {
    this._naturalist = val
  }

  navigation (val) {
    this._navigation = val
  }

  observation (val) {
    this._observation = val
  }

  occultism (val) {
    this._occultism = val
  }

  physician (val) {
    this._physician = val
  }

  photography (val) {
    this._photography = val
  }

  pickpocket (val) {
    this._pickpocket = val
  }

  public_speaking (val) {
    this._public_speaking = val
  }

  research (val) {
    this._research = val
  }

  riding (val) {
    this._riding = val
  }

  scrounging (val) {
    this._scrounging = val
  }

  search (val) {
    this._search = val
  }

  shadowing (val) {
    this._shadowing = val
  }

  shield (val) {
    this._shield = val
  }

  social_sciences (val) {
    this._social_sciences = val
  }

  smuggler (val) {
    this._smuggler = val
  }

  stealth (val) {
    this._stealth = val
  }

  survival (val) {
    this._survival = val
  }

  swimming (val) {
    this._swimming = val
  }

  tactics (val) {
    this._tactics = val
  }

  throwing (val) {
    this._throwing = val
  }

  thrown_weapon (val) {
    this._thrown_weapon = val
  }

  tracking (val) {
    this._tracking = val
  }

  traps (val) {
    this._traps = val
  }

  vehicle_skills_easy (val) {
    this._vehicle_skills_easy = val
  }

  vehicle_skills_average (val) {
    this._vehicle_skills_average = val
  }

  vehicle_skills_hard (val) {
    this._vehicle_skills_hard = val
  }

  writing (val) {
    this._writing = val
  }
}

export const skillPoints = new SkillPoints()
