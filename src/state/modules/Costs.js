/**
 * A number, or a string containing a number.
 * @typedef {Object} SkillHolder
 * @property {number} level - The level of the skill
 * @property {number} cost - The cost of the skill to remaining characterPoints
 */

/**
 * @type {SkillHolder[]}
 */
const actingCosts = [
  {level: -5, cost: 0},
  {level: -1, cost: 1},
  {level: 0, cost: 2},
  {level: 1, cost: 4},
  {level: 2, cost: 8},
  {level: 3, cost: 12}
]

/**
 * @type {SkillHolder[]}
 */
const armouryCosts = [
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
const acrobaticsCosts = [
  {level: -6, cost: 0},
  {level: -2, cost: 1},
  {level: -1, cost: 2},
  {level: 0, cost: 4},
  {level: 1, cost: 8},
  {level: 2, cost: 12}
]

/**
 * @type {SkillHolder[]}
 */
const animalHandlingCosts = [
  {level: -5, cost: 0},
  {level: -1, cost: 1},
  {level: 0, cost: 2},
  {level: 1, cost: 4},
  {level: 2, cost: 8},
  {level: 3, cost: 12}
]

/**
 * @type {SkillHolder[]}
 */
const areaKnowledgeCosts = [
  {level: -1, cost: 0},
  {level: 0, cost: 1},
  {level: 1, cost: 2},
  {level: 2, cost: 4},
  {level: 3, cost: 8},
  {level: 4, cost: 12}
]

/**
 * @type {SkillHolder[]}
 * @private
 */
const brawlingCosts = [
  {level: -6, cost: 0},
  {level: 0, cost: 1},
  {level: 1, cost: 2},
  {level: 2, cost: 4},
  {level: 3, cost: 8},
  {level: 4, cost: 12}
]

export const costs = {
  actingCosts,
  armouryCosts,
  acrobaticsCosts,
  animalHandlingCosts,
  areaKnowledgeCosts,
  brawlingCosts
}
