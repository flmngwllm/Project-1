var canvas = document.querySelector('canvas')

var scHeight = 600
var scWidth = 300

canvas.width = scWidth
canvas.height = scHeight

var c = canvas.getContext("2d")
c.fillStyle = 'black'

const lBlock =[ [0, 1, 0]
               [0, 1, 0]
               [0, 1, 1]
]
const tBlock = [[0, 1, 0]
               [1, 1, 1]
               [0, 0, 0]
]
const sBlock= [[0, 1, 1]
              [0, 1, 0]
              [1, 1, 0]
]
const zBlock=  [[1, 1, 0]
                [0, 1, 0]
                [0, 1, 1]
]
const squareBlock = [[0, 1, 0]
                    [0, 1, 0]
                    [0, 1, 1]
]
const blBlock = [[0, 1, 0]
                [0, 1, 0]
                [1, 1, 1]
]
const iBlock = [[0, 1, 0]
                [0, 1, 0]
                [0, 1, 0]
                [0, 1, 0]
]

var blocks = [lBlock, sBlock, zBlock, tBlock, blBlock, squareBlock, iBlock]

var colors = ['blue', 'green', 'yellow', 'red', 'orange', 'pink', 'purple']




