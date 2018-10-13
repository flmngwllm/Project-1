
//constant variables that will not change throughout
const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")
const Columns = 10
const Rows = 20
const sq = 20
const emp = '#ffffff'

//function to colors the board and squares on the canvas
function showSq(x,y,color){
    c.fillStyle = color
    c.fillRect(x*sq,y*sq,sq,sq)

    c.strokeStyle = "#000000"
    c.strokeRect(x*sq,y*sq,sq,sq)


}



let field = []
for( h = 0;  h < Rows; h++){
    field[h] = []
    for (v = 0; v < Columns; v++){
        field[h][v] = emp
    } 
}


//function to draw the canvas to be displayed 
function drawfield(){
    for(h = 0; h < Rows; h++){
        for(v = 0; v < Columns; v++){
            showSq(v,h,field[h][v])
        }
    }
}

drawfield()


//block types using binary and arrays to plot the the positions and to have specific shapes drawn out to the canvas
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
// defining and setting colors that will be used in an array for each block that will be used
var colors = ['blue', 'green', 'yellow', 'red', 'orange', 'pink', 'purple']

//randomizing colors using math.random by through the length of the array
ranColor = colors[Math.floor(Math.random() * colors.length)]

//randomizing the different blocks that will appear
ranBlock = blocks[Math.floor(Math.random() * blocks.length)]


// Controls using keycodes to assign each button as a movement
document.addEventlistner("keydown", controller)

//object for the blocks
function createBlocks(blocks ,colors){
    this.blocks = blocks
    this.colors = colors 

    this.shapes = 0
    this.mobileShape = this.blocks[this.mobileShape]

    this.y = -2
    this.x =3

}





