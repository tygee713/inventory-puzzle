import { init, Scene } from '../../lib/kontra.min.mjs'
import { Grid } from '../objects/grid.js'
import { Item } from '../objects/item.js'
import { Cursor } from '../objects/cursor.js'
import { Bar } from '../objects/bar.js'

const { canvas } = init()

const Drops = Grid({})
const Inventory = Grid({})
const Discard = Grid({})

const ProficiencyMeter = Bar({})
const GoldMeter = Bar({})
const WeightMeter = Bar({})

export default Scene({
  id: 'main',
  level: 1,
  selectedItemId: null,
  movingItemId: null,
  itemMenuOpen: false,
  objects: [Drops, Inventory, Discard, ProficiencyMeter, GoldMeter, WeightMeter],
  createBossItems: function() {
    // create x items of y rarity, depending on level
    // set those items as children of the Drops object
  },
  createStartingInventory: function() {
    // create x items of y rarity, depending on level
    // set those items as children of the Inventory object
  },
  moveCursor: function() {
    // move the cursor to the next available cell in the current grid
    // if one does not exist, move to the next grid
    // if no next grid, do not move
    // cannot move cursor at all if an item menu is open
    // if an item is selected, move item icon along with cursor
  },
  placeItem: function(cellId) {
    // if current space is occupied, replace item with currently moving item
    if (this.cells[cellId].itemId) {
      trashItem(this.cells[cellId].itemId)
    }
    this.cells[cellId].itemId = this.movingItemId
    this.movingItemId = null
  },
  selectItem: function(itemId) {
    this.selectedItemId = itemId
    this.openItemMenu()
  },
  openItemMenu: function() {
    // open item menu with options to trash item or move item
    this.items[selectedItemId].menuOpen = true
    this.itemMenuOpen = true
  },
  closeItemMenu: function() {
    this.items[selectedItemId].menuOpen = false
    this.itemMenuOpen = false
  },
  trashItem: function(itemId) {
    // close the menu
    this.closeItemMenu()
    // unselect the item
    this.selectedItemId = null
    // move item from its current location to the discard area
    Discard.add(itemId)
  },
  startMoveItem: function(itemId) {
    // change the moving item
    this.movingItemId = itemId
  },
  updateMeters: function() {
    // after each time the items in inventory are changed, calculate new meter values
  }
})