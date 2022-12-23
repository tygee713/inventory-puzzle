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

const sections = {
  0: Drops,
  1: Inventory,
  2: Discard,
}

const scene = Scene({
  id: 'main',
  level: 1,
  hoveredSection: null,
  selectedSection: null,
  selectedItemId: null,
  movingItemId: null,
  itemMenuOpen: false,
  objects: [Cursor, Drops, Inventory, Discard, ProficiencyMeter, GoldMeter, WeightMeter],
  createBossItems: function() {
    // create x items of y rarity, depending on level
    let bossItems = []
    // pull from a list of items that can appear in a level
    // get a variety of different item types, rarities
    // set those items as children of the Drops object
    Drops.items.push(bossItems)
  },
  createStartingInventory: function() {
    // create x items of y rarity, depending on level
    let startingItems = []
    // pull from a list of items that can appear in a level
    // get a variety of different item types, rarities
    // set those items as children of the Inventory object
    Inventory.items.push(startingItems)
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
    Discard.items.push(itemId)
  },
  startMoveItem: function(itemId) {
    // change the moving item
    this.movingItemId = itemId
  },
  updateMeters: function() {
    // after each time the items in inventory are changed, calculate new meter values
  }
})

// TODO: support A button on gamepad
onKey('z', () => {
  // if an item menu is open, select the hovered option

  // otherwise, if a section is selected, select the hovered item

  // otherwise, select the hovered section
})
// TODO: support B button on gamepad
onKey('x', () => {
  // if an item is being moved, put it back in its origin

  // otherwise, if an item menu is open, close the item menu

  // otherwise, unselect a hovered section
})

// TODO: support gamepad directionals

onKey('up', () => {
  // if an item menu is open, change the selected option
  if (scene.itemMenuOpen) {
    Item[selectedItemId].itemMenu.up()
    // otherwise, if there is a selected section, change the position of the cursor relative to that section
  } else if (scene.selectedSection) {
    let section = sections[scene.selectedSection]
    let newCell = section.upFrom(Cursor.position)
    Cursor.position = newCell.position
    Cursor.x = newCell.x
    Cursor.y = newCell.y
    // otherwise, cycle through the sections
  } else {
    if (scene.hoveredSection = 0) {
      scene.hoveredSection = 2
    } else {
      scene.hoveredSection -= 1
    }
    Cursor.position = scene.hoveredSection
    let section = sections[scene.hoveredSection]
    Cursor.x = section.x
    Cursor.y = section.y
    Cursor.width = section.width
    Cursor.height = section.height
  }
})
onKey('down', () => {
  // if an item menu is open, change the selected option
  if (scene.itemMenuOpen) {
    Item[selectedItemId].itemMenu.down()
    // otherwise, if there is a selected section, change the position of the cursor relative to that section
  } else if (scene.selectedSection) {
    let section = sections[scene.selectedSection]
    let newCell = section.downFrom(Cursor.position)
    Cursor.position = newCell.position
    Cursor.x = newCell.x
    Cursor.y = newCell.y
    // otherwise, cycle through the sections
  } else {
    if (scene.hoveredSection = 0) {
      scene.hoveredSection = 2
    } else {
      scene.hoveredSection -= 1
    }
    Cursor.position = scene.hoveredSection
    let section = sections[scene.hoveredSection]
    Cursor.x = section.x
    Cursor.y = section.y
    Cursor.width = section.width
    Cursor.height = section.height
  }
})
onKey('left', () => {
  // if an item menu is open, change the selected option
  if (scene.itemMenuOpen) {
    Item[selectedItemId].itemMenu.left()
    // otherwise, if there is a selected section, change the position of the cursor relative to that section
  } else if (scene.selectedSection) {
    let section = sections[scene.selectedSection]
    let newCell = section.leftFrom(Cursor.position)
    Cursor.position = newCell.position
    Cursor.x = newCell.x
    Cursor.y = newCell.y
    // otherwise, cycle through the sections
  } else {
    if (scene.hoveredSection = 0) {
      scene.hoveredSection = 2
    } else {
      scene.hoveredSection -= 1
    }
    Cursor.position = scene.hoveredSection
    let section = sections[scene.hoveredSection]
    Cursor.x = section.x
    Cursor.y = section.y
    Cursor.width = section.width
    Cursor.height = section.height
  }
})
onKey('right', () => {
  // if an item menu is open, change the selected option
  if (scene.itemMenuOpen) {
    Item[selectedItemId].itemMenu.right()
    // otherwise, if there is a selected section, change the position of the cursor relative to that section
  } else if (scene.selectedSection) {
    let section = sections[scene.selectedSection]
    let newCell = section.rightFrom(Cursor.position)
    Cursor.position = newCell.position
    Cursor.x = newCell.x
    Cursor.y = newCell.y
    // otherwise, cycle through the sections
  } else {
    if (scene.hoveredSection = 0) {
      scene.hoveredSection = 2
    } else {
      scene.hoveredSection -= 1
    }
    Cursor.position = scene.hoveredSection
    let section = sections[scene.hoveredSection]
    Cursor.x = section.x
    Cursor.y = section.y
    Cursor.width = section.width
    Cursor.height = section.height
  }
})

export default scene