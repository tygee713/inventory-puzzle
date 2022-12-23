import { init, Sprite } from '../../lib/kontra.min.mjs'
import MainScene from '../scenes/main.js'

const { canvas } = init()

const tileWidth = 32
const tileHeight = 32

const createCell = (id, x, y) => {
  return Sprite({
    x,
    y,
    width: tileWidth,
    height: tileHeight,
    anchor: { x: 0.5, y: 0.5 },
    color: 'brown',
    id,
    item: null,
    children: [],
  })
}

export default createCell