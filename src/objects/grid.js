import { init, Sprite } from '../../lib/kontra.min.mjs'
import { MainScene } from '../scenes/main.js'
import { Cell } from './cell.js'

const { canvas } = init()

const cellWidth = 32
const cellHeight = 32

const createGrid = (id, rows, cols, x, y) => {
  let cellX = cellWidth / 2
  let cellY = cellHeight / 2
  // create a number of cells given the rows and cols
  const cells = []
  for (let i=0; i<rows; i++) {
    for (let x=0; x<cols; x++) {
      cells.push(Cell(cellX, cellY))
      cellX += cellWidth
    }
    cellY += cellHeight
  }
  
  return Sprite({
    x,
    y,
    id,
    cells,
    children: [...cells],
  })
}

export default createGrid