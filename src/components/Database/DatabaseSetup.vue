<script>
  // @ts-check
  import Dexie from 'dexie'
  import Vue from 'vue'
  import {range} from 'lodash'

  /**
   * @property {object} description - An object that holds all of the description values
   * @property {int} description.id - The unique ID of each object
   * @property {string} description.level - Name for the character points level
   * @property {Array} description.points - Array of the range for the character points for a level
   * @property {string} description.extended - An extended description of the character points
   * @type {Dexie}
   * @const {Dexie}
   */
  const characterPoints = new Dexie('CharacterPoints')
  characterPoints.version(1).stores({
    description: '++id,level,points,extended'
  })
  export default Vue.extend({
    data () {
      return {
        data: null
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
        return range(min, max, step)
      },
      /**
       * Used if the database hasn't been configured yet.
       * @returns {Promise.<characterPoints>}
       */
      async defaultSetup() {
        if ((await characterPoints.description.where('id').equals('1').count()) === 0) {
          characterPoints.transaction('rw', characterPoints.description, async () => {
            await characterPoints.description.add({
              level: 'Feeble',
              points: this.range(0, 25),
              extended: `Small children,mindless thralls, zombies, etc.`
            })
            await characterPoints.description.add({
              level: 'Average',
              points: this.range(26, 50),
              extended: `Ordinary people`
            })
            await characterPoints.description.add({
              level: 'Competent',
              points: this.range(51, 75),
              extended: `Athletes, cops, wealthy people`
            })
            await characterPoints.description.add({
              level: 'Exceptional',
              points: this.range(76, 100),
              extended: `Star athletes, seasoned cops, military`
            })
            await characterPoints.description.add({
              level: 'Heroic',
              points: this.range(101, 200),
              extended: `Special Operations, world-class scientists, millionaires`
            })
            await characterPoints.description.add({
              level: 'Larger than life',
              points: this.range(201, 300),
              extended: `Crouching Tiger-hidden dragon, Harry Dresden, The Demon Accords`
            })
            await characterPoints.description.add({
              level: 'Legendary',
              points: this.range(301, 500),
              extended: `Beowulf, Merlin, etc.`
            })
            await characterPoints.description.add({
              level: 'Superhuman',
              points: this.range(500, 501),
              extended: `Demi-God, Gods, Angels, Demons`
            })
            return characterPoints
          }).then((characterPoints) => {
            this.data = characterPoints.description.toArray()
          })
        } else {
          this.data = characterPoints.description.toArray()
        }
      }
    }
  })
</script>
