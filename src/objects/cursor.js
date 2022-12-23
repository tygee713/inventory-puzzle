import { init, Sprite } from '../../lib/kontra.min.mjs'
import { MainScene } from '../scenes/main.js'

const { canvas } = init()

export default Sprite({
  render: function() {
    this.context.lineWidth = 2
    this.context.strokeStyle = 'pink'
    this.context.strokeRect(this.x, this.y, this.width, this.height)
  },
  update: function(dt) {
    if (!this.section) {
      this.section = MainScene.hoveredSection
      this.sectionNum = MainScene.hoveredSectionNum
    }
    if (this.cell) {
      this.position = this.cell.position
      this.x = this.cell.x
      this.y = this.cell.y
      this.width = this.cell.width
      this.height = this.cell.height
    } else if (this.section) {
      this.position = this.section.position
      this.x = this.section.x
      this.y = this.section.y
      this.width = this.section.width
      this.height = this.section.height
    }
  }
})