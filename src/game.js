import { init, GameLoop } from '../lib/kontra.min.mjs'
// import createStartScene from './scenes/start.js'
// import createIntroScene from './scenes/intro.js'
import MainScene from './scenes/main.js'
// import createEndScene from './scenes/end.js'

init()

let currentScene = null

// Goes to the start scene
// Called when the game begins
// export const showStartScene = () => {
//   if (currentScene) {
//     currentScene.hide()
//     currentScene.destroy()
//   }
//   currentScene = createStartScene()
//   currentScene.show()
// }

// Goes to the intro scene
// Called after pressing start button from start screen
// export const showIntroScene = () => {
//   if (currentScene) {
//     currentScene.hide()
//     currentScene.destroy()
//   }
//   currentScene = createIntroScene()
//   currentScene.show()
// }

// Moves from the intro scene to the main scene and resets all variables
export const showMainScene = () => {
  if (currentScene) {
    currentScene.hide()
    currentScene.destroy()
  }
  currentScene = MainScene
  currentScene.show()
}

// Moves from the main scene to the ending scene
// Called after the last level
// export const showEndScene = () => {
//   if (currentScene) {
//     currentScene.hide()
//     currentScene.destroy()
//   }
//   currentScene = createEndScene()
//   currentScene.show()
// }

const loop = GameLoop({
  update: (dt) => {
    currentScene && currentScene.update(dt)
  },
  render: () => {
    currentScene && currentScene.render()
  }
})

loop.start()

showMainScene()