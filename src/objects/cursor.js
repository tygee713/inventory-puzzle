import { init, Sprite } from '../../lib/kontra.min.mjs'
import MainScene from '../scenes/main.js'

const { canvas } = init()

export default Sprite({
  anchor: { x: 0, y: 0 },
  // color: 'pink',
  render: function() {
    this.context.lineWidth = 2
    this.context.strokeStyle = 'pink'
    this.context.strokeRect(0, 0, this.width, this.height)
  },
  update: function(dt) {
    if (this.cell) {
      this.anchor = { x: 0.5, y: 0.5 }
      this.x = this.cell.x + this.section.x
      this.y = this.cell.y + this.section.y
      this.width = this.cell.width
      this.height = this.cell.height
    } else if (this.section) {
      this.anchor = { x: 0, y: 0 }
      this.x = this.section.x
      this.y = this.section.y
      this.width = this.section.width
      this.height = this.section.height
    }
  }
})