import { init, Sprite } from '../../lib/kontra.min.mjs'
import MainScene from '../scenes/main.js'

const { canvas } = init()

const tileWidth = 64
const tileHeight = 64

const createCell = (id, x, y) => {
  return Sprite({
    x,
    y,
    width: tileWidth,
    height: tileHeight,
    anchor: { x: 0.5, y: 0.5 },
    color: 'grey',
    id,
    item: null,
    itemIcon: null,
    children: [],
    update: function(dt) {
      if (!this.itemIcon && this.item) {
        this.itemIcon = this.item.icon
        this.addChild(this.item)
      }
    },
    hoverCell: function() {
      if (this.item) {
        this.item.toolTip.x = this.world.x + tileWidth / 4
        this.item.toolTip.y = this.world.y - tileWidth / 2
        MainScene.currentHover = this.item.toolTip
      }
    },
    unhoverCell: function() {
      if (this.item) {
        MainScene.currentHover = null
      }
    },
    selectCell: function() {
      if (this.item) {
        this.item.menu.x = this.world.x + tileWidth / 4
        this.item.menu.y = this.world.y - tileWidth / 2 + 50
        MainScene.currentMenu = this.item.menu
        MainScene.selectedItem = this.item
        MainScene.itemMenuOpen = true
      }
    },
    deselectCell: function() {
      if (this.item) {
        MainScene.selectedItem.menu.hover = 0
        MainScene.currentMenu = null
        MainScene.selectedItem = null
        MainScene.itemMenuOpen = false
      }
    }
  })
}

export default createCell