var canvas = document.querySelector('canvas')

var scHeight = 600
var scWidth = 300
var Columns = 10
var Rows = 20
var emp = 'white'

canvas.width = scWidth
canvas.height = scHeight

var c = canvas.getContext("2d")
c.fillStyle = 'black'


let field = []
for( h = 0;  h < Rows; h++){
    field[h] = []
    for (v = 0; v < Columns; v++){
        field[h][v] = emp
    } 
}

function drawfield(){
    for(h = 0; h < Rows; h++){
        for(v = 0; v < Columns; v++){
            
        }
    }
}


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
const squareBlock =[[1, 1]
                    [1, 1]
                    
]
const blBlock = [[0, 1, 0]
                 [0, 1, 0]
                 [1, 1, 0]
]
const iBlock = [[0, 1, 0]
                [0, 1, 0]
                [0, 1, 0]
                [0, 1, 0]
]

var blocks = [lBlock, sBlock, zBlock, tBlock, blBlock, squareBlock, iBlock]

var colors = ['blue', 'green', 'yellow', 'red', 'orange', 'pink', 'purple']


ranColor = colors[Math.floor(Math.random() * colors.length)]

ranBlock = blocks[Math.floor(Math.random() * blocks.length)]



document.addEventlistner("keydown", controller)



