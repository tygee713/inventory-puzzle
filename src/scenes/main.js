import { init, initKeys, onKey, Scene } from '../../lib/kontra.min.mjs'
import Grid from '../objects/grid.js'
import Item from '../objects/item.js'
import Cursor from '../objects/cursor.js'
// import Bar from '../objects/bar.js'

const { canvas } = init()
initKeys()

const numBossDrops = 5
const bossDropsX = 50
const bossDropsY = 50

const inventoryRows = 2
const inventoryCols = 3
const inventoryX = 150
const inventoryY = 50

const discardX = 400
const discardY = 50

const Drops = Grid(0, numBossDrops, 1, bossDropsX, bossDropsY)
const Inventory = Grid(1, inventoryRows, inventoryCols, inventoryX, inventoryY)
const Discard = Grid(2, numBossDrops, 1, discardX, discardY)

// const ProficiencyMeter = Bar({})
// const GoldMeter = Bar({})
// const WeightMeter = Bar({})

const sections = {
  0: Drops,
  1: Inventory,
  2: Discard,
}

const scene = Scene({
  id: 'main',
  level: 1,
  hoveredSectionNum: null,
  hoveredSection: null,
  selectedSection: null,
  selectedItemId: null,
  movingItemId: null,
  itemMenuOpen: false,
  objects: [Drops, Inventory, Discard, Cursor],
  render: function() {
    Drops.render()
    Inventory.render()
    Discard.render()
    Cursor.render()
    if (this.currentHover) {
      this.currentHover.render()
    }
  },
  onShow: function() {
    this.hoveredSectionNum = 0
    Cursor.section = sections[this.hoveredSectionNum]
    this.createBossItems()
  },
  createBossItems: function() {
    // create x items of y rarity, depending on level
    let bossItems = []
    // pull from a list of items that can appear in a level
    for (let i=0; i<numBossDrops; i++) {
      bossItems.push(Item(i, {
        name: 'Example Item',
        gold: 1,
        proficiency: 1,
        weight: 1,
        flavorText: 'This is an example item.',
        imageSrc: 'assets/example_item.png'
      }))
    }
    // get a variety of different item types, rarities
    // set those items as children of the Drops object
    Drops.cells.forEach((cell, i) => {
      cell.item = bossItems[i]
      bossItems[i].cell = cell
    })
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
  if (scene.itemMenuOpen) {
    if (scene.items[selectedItemId].itemMenu.hover == 0) {
      scene.startMoveItem(selectedItemId)
    } else {
      scene.trashItem(selectedItemId)
    }
  // otherwise, if a section is selected, select the hovered item
  } else if (scene.selectedSection) {
    scene.selectedItemId = Cursor.cell.item.id
    scene.openItemMenu()
  // otherwise, select the hovered section
  } else {
    scene.selectedSection = Cursor.section
    Cursor.cell = scene.selectedSection.cells[0]
    Cursor.cell.hoverCell()
  }
})

// TODO: support B button on gamepad
onKey('x', () => {
  // if an item menu is open, close the item menu
  if (scene.itemMenuOpen) {
    scene.closeItemMenu()
    // otherwise, if an item is being moved, put it back in its origin
  } else if (scene.movingItemId) {
    scene.items[movingItemId].isMoving = false
    scene.movingItemId = null
    // otherwise, unselect the current section and have the cursor hover the section
  } else {
    Cursor.cell.unhoverCell()
    Cursor.cell = null
    scene.selectedSection = null
  }
})

// TODO: support gamepad directionals
onKey('arrowup', () => {
  // if an item menu is open, change the selected option
  if (scene.itemMenuOpen) {
    scene.items[selectedItemId].itemMenu.up()
    // otherwise, if there is a selected section, change the position of the cursor relative to that section
  } else if (scene.selectedSection) {
    scene.selectedSection.upFrom()
    // otherwise, cycle through the sections
  } else {
    if (scene.hoveredSectionNum == 0) {
      scene.hoveredSectionNum = 2
    } else {
      scene.hoveredSectionNum -= 1
    }
    let section = sections[scene.hoveredSectionNum]
    Cursor.section = section
  }
})
onKey('arrowdown', () => {
  // if an item menu is open, change the selected option
  if (scene.itemMenuOpen) {
    scene.items[selectedItemId].itemMenu.down()
    // otherwise, if there is a selected section, change the position of the cursor relative to that section
  } else if (scene.selectedSection) {
    scene.selectedSection.downFrom()
    // otherwise, cycle through the sections
  } else {
    if (scene.hoveredSectionNum == 2) {
      scene.hoveredSectionNum = 0
    } else {
      scene.hoveredSectionNum += 1
    }
    let section = sections[scene.hoveredSectionNum]
    Cursor.section = section
  }
})
onKey('arrowleft', () => {
  // if an item menu is open, change the selected option
  if (scene.itemMenuOpen) {
    scene.items[selectedItemId].itemMenu.left()
    // otherwise, if there is a selected section, change the position of the cursor relative to that section
  } else if (scene.selectedSection) {
    scene.selectedSection.leftFrom()
    // otherwise, cycle through the sections
  } else {
    if (scene.hoveredSectionNum == 0) {
      scene.hoveredSectionNum = 2
    } else {
      scene.hoveredSectionNum -= 1
    }
    let section = sections[scene.hoveredSectionNum]
    Cursor.section = section
  }
})
onKey('arrowright', () => {
  // if an item menu is open, change the selected option
  if (scene.itemMenuOpen) {
    scene.items[selectedItemId].itemMenu.right()
    // otherwise, if there is a selected section, change the position of the cursor relative to that section
  } else if (scene.selectedSection) {
    scene.selectedSection.rightFrom()
    // otherwise, cycle through the sections
  } else {
    if (scene.hoveredSectionNum == 2) {
      scene.hoveredSectionNum = 0
    } else {
      scene.hoveredSectionNum += 1
    }
    let section = sections[scene.hoveredSectionNum]
    Cursor.section = section
  }
})

export default scene