<script>
  // @ts-check
  import Dexie from 'dexie'
  import Vue from 'vue'
  import {range} from 'lodash'

  /**
   * @property {object} description - An object that holds all of the description values
   * @property {string} description.level - Name for the character points level
   * @property {Array} description.points - Array of the range for the character points for a level
   * @type {Dexie}
   * @const {Dexie}
   */
  const characterPoints = new Dexie('CharacterPoints')
  characterPoints.version(1).stores({
    description: '++id, level,points'
  })
  export default Vue.extend({
    data () {
      return {
        characterPoints
      }
    },
    methods: {
      /**
       * Generates an Array of numbers between min and max
       * @param {int} min
       * @param {int} max
       * @param {int} step
       * @returns {number[]}
       */
      range (min, max, step = 1) {
        max += 1
        return range(min, max)
      },
      /**
       * Used if the database hasn't been configured yet.
       * @returns {Promise.<void>}
       */
      async defaultSetup() {
        if ((await characterPoints.level.where('id').equals('1').count()) === 0) {
          characterPoints.transaction('rw', characterPoints.description, async () => {
            await characterPoints.description.add({level: 'Feeble', points: this.range(0, 25)})
            await characterPoints.description.add({level: 'Average', points: this.range(26, 50)})
            await characterPoints.description.add({level: 'Competent', points: this.range(51, 75)})
            await characterPoints.description.add({level: 'Exceptional', points: this.range(76, 100)})
            await characterPoints.description.add({level: 'Heroic', points: this.range(101, 200)})
            await characterPoints.description.add({level: 'Larger than life', points: this.range(201, 300)})
            await characterPoints.description.add({level: 'Legendary', points: this.range(301, 500)})
          })
        }
      }
    }
  })
</script>
