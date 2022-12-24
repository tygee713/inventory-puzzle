import { init, Sprite } from '../../lib/kontra.min.mjs'
import MainScene from '../scenes/main.js'
import Cell from './cell.js'
import Cursor from './cursor.js'

const { canvas } = init()

const cellWidth = 70
const cellHeight = 70

const createGrid = (id, rows, cols, x, y) => {
  let cellX = cellWidth / 2
  let cellY = cellHeight / 2
  // create a number of cells given the rows and cols
  const cells = []
  for (let i=0; i<rows; i++) {
    cellX = cellWidth / 2
    for (let x=0; x<cols; x++) {
      cells.push(Cell(x+i*cols, cellX, cellY))
      cellX += cellWidth - 2
    }
    cellY += cellHeight - 2
  }
  
  return Sprite({
    x,
    y,
    id,
    width: cellWidth * cols - ((cols - 1) * 2),
    height: cellHeight * rows - ((rows - 1) * 2),
    color: 'black',
    cells,
    rows,
    cols,
    children: [...cells],
    upFrom: function() {
      let newCellId = Cursor.cell.id - this.cols
      if (newCellId < 0) {
        // play error sound
      } else {
        Cursor.cell && Cursor.cell.unhoverCell()
        Cursor.cell = this.cells[newCellId]
        Cursor.cell.hoverCell()
      }
    },
    downFrom: function() {
      let newCellId = Cursor.cell.id + this.cols
      if (newCellId > cells.length - 1) {
        // play error sound
      } else {
        Cursor.cell && Cursor.cell.unhoverCell()
        Cursor.cell = this.cells[newCellId]
        Cursor.cell.hoverCell()
      }
    },
    leftFrom: function() {
      let newCellId = Cursor.cell.id - 1
      if (newCellId < 0) {
        // play error sound
      } else {
        Cursor.cell && Cursor.cell.unhoverCell()
        Cursor.cell = this.cells[newCellId]
        Cursor.cell.hoverCell()
      }
    },
    rightFrom: function() {
      let newCellId = Cursor.cell.id + 1
      if (newCellId > cells.length - 1) {
        // play error sound
      } else {
        Cursor.cell && Cursor.cell.unhoverCell()
        Cursor.cell = this.cells[newCellId]
        Cursor.cell.hoverCell()
      }
    },
  })
}

export default createGrid