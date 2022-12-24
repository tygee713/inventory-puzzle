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
    opacity: 0.5,
    width: Math.max(Name.width, Stats.width, FlavorText.width) + 10,
    height: 50,
    children: [Name, Stats, FlavorText],
  })
}

const createItem = (id, info) => {
  const { name, gold, proficiency, weight, flavorText, imageSrc } = info
  const ToolTip = createToolTip(info)
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
    icon: Icon,
    name,
    gold,
    proficiency,
    weight,
    flavorText,
    children: [Icon],
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