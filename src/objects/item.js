import { GameObject, init, Sprite, Text } from '../../lib/kontra.min.mjs'
import MainScene from '../scenes/main.js'
import Cursor from './cursor.js'

const { canvas } = init()

const tileWidth = 64
const tileHeight = 64

const createToolTip = (info) => {
  const { name, gold, proficiency, weight, flavorText } = info
  const Name = Text({
    x: 5,
    y: 10,
    font: '12px Arial',
    color: 'purple',
    text: name
  })
  const Stats = Text({
    x: 5,
    y: 24,
    font: '12px Arial',
    color: 'white',
    text: 'G: ' + gold + ' P: ' + proficiency + ' W: ' + weight
  })
  const FlavorText = Text({
    x: 5,
    y: 38,
    font: '12px Arial',
    color: 'white',
    text: flavorText
  })
  return Sprite({
    color: 'black',
    opacity: 0.7,
    width: Math.max(Name.width, Stats.width, FlavorText.width) + 10,
    height: 50,
    children: [Name, Stats, FlavorText],
  })
}

const createMenu = (width) => {
  const Confirm = Text({
    x: 20,
    y: 10,
    font: '12px Arial',
    color: 'white',
    text: 'Select'
  })
  const Remove = Text({
    x: 20,
    y: 30,
    font: '12px Arial',
    color: 'white',
    text: 'Remove',
  })
  const SelectArrow = Text({
    x: 5,
    y: Confirm.y,
    font: '12px Arial',
    color: 'white',
    text: '->',
    update: function(dt) {
      this.y = this.parent.hover === 0 ? Confirm.y : Remove.y
    }
  })

  return Sprite({
    color: 'black',
    opacity: 0.7,
    width,
    height: 50,
    hover: 0,
    children: [Confirm, Remove, SelectArrow],
    up: function() {
      if (this.hover === 1) {
        this.hover -= 1
      } else {
        this.hover += 1
      }
    },
    down: function() {
      if (this.hover === 0) {
        this.hover += 1
      } else {
        this.hover -= 1
      }
    },
  })
}

const createItem = (id, info) => {
  const { name, gold, proficiency, weight, flavorText, imageSrc } = info
  const ToolTip = createToolTip(info)
  const Menu = createMenu(ToolTip.width)
  const Icon = Sprite({
    x: 0,
    y: 0,
    width: tileWidth,
    height: tileHeight,
    anchor: { x: 0.5, y: 0.5 },
  })
  
  const item = GameObject({
    id,
    toolTip: ToolTip,
    menu: Menu,
    icon: Icon,
    name,
    gold,
    proficiency,
    weight,
    flavorText,
    children: [Icon],
    update: function(dt) {
      Menu.update(dt)
    },
  })
  let image = new Image()
  image.src = imageSrc
  image.onload = function() {
    image.width = tileWidth
    image.height = tileHeight
    item.icon.image = image
  }
  return item
}

export default createItem