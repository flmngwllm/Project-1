//constant variables that will not change throughout
const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")
const Columns = 10
const Rows = 20
const sq = 20
const emp = '#ffffff'




//function to colors the board and squares on the canvas
function showSq(x, y, color) {
    c.fillStyle = color
    c.fillRect(x * sq, y * sq, sq, sq)

    c.strokeStyle = "#000000"
    c.strokeRect(x * sq, y * sq, sq, sq)


}



let field = []
for (h = 0; h < Rows; h++) {
    field[h] = []
    for (v = 0; v < Columns; v++) {
        field[h][v] = emp
    }
}


//function to draw the canvas to be displayed 
function drawfield() {
    for (h = 0; h < Rows; h++) {
        for (v = 0; v < Columns; v++) {
            showSq(v, h, field[h][v])
        }
    }
}

drawfield()


//block types using binary and arrays to plot the the positions and to have specific shapes drawn out to the canvas
const lBlock = [
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ],

    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
    ],

    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ],

    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ]
]
const tBlock = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],

    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
    ],

    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],

    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
    ]
]
const sBlock = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],

    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
    ],

    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ],

    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
    ]
]


const zBlock = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],

    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
    ],

    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],

    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
    ]
]
const squareBlock = [
    [
        [1, 1],
        [1, 1],
    ]
]
const blBlock = [
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
    ],


    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],


    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
    ],


    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
    ]
]

const iBlock = [
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],

    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ]
]


//saving block to variable as an arry to use later
var blocks = [
    [lBlock, "red"],
    [sBlock, "green"],
    [zBlock, "yellow"],
    [tBlock, "orange"],
    [blBlock, "pink"],
    [squareBlock, "blue"],
    [iBlock, "purple"]
]
// defining and setting colors that will be used in an array for each block that will be used
// var colors = ['blue', 'green', 'yellow', 'red', 'orange', 'pink', 'purple']


//randomizing the different blocks that will appear
function ranBlck() {
    let r = ranBlock = Math.floor(Math.random() * blocks.length)
    return new createBlocks(blocks[r][0], blocks[r][1])
}

let b = ranBlck()




//object for the blocks with color parameters 
function createBlocks(type, color) {
    this.type = type
    this.color = color

    this.shapes = 0
    this.mobileShape = this.type[this.shapes]

    //starting position of the blocks on the field
    this.y = -2
    this.x = 3

}


// 
createBlocks.prototype.fill = function (color) {
    for (h = 0; h < this.mobileShape.length; h++) {
        for (v = 0; v < this.mobileShape.length; v++) {
            if (this.mobileShape[h][v]) {
                showSq(this.x + v, this.y + h, color)
            }
        }
    }
}

//this makes the piece show up on the field
createBlocks.prototype.draw = function () {
    this.fill(this.color)
}




//this make the go away on the field
createBlocks.prototype.destroy = function () {
    this.fill(emp)
}

createBlocks.prototype.down = function () {
    if (!this.bounds(0, 1, this.mobileShape)) {
        this.destroy()
        this.y += 1;
        this.draw();

    } else {

        this.connectBl()
        b = ranBlck()

    }

}

// //hard drop still a work in progress still goes off the board
// createBlocks.prototype.hardDrop = function () {
//     if (!this.bounds(0, 1, this.mobileShape)) {
//         this.destroy()
//         this.y += 15
//         this.draw();
//     }
// }


//function to move block to the right by 1 on the x axis
createBlocks.prototype.mright = function () {
    if (!this.bounds(1, 0, this.mobileShape)) {
        this.destroy()
        this.x += 1;
        this.draw();

    }
}

//function to move the block to the left by 1 on the x axis
createBlocks.prototype.mleft = function () {
    if (!this.bounds(-1, 0, this.mobileShape)) {
        this.destroy()
        this.x -= 1;
        this.draw();
    }
}

//rotating the block to the right 
createBlocks.prototype.rotateBlockR= function() {
    let change = this.type[(this.shapes + 1) % this.type.length]
    let bounce = 0

    if (this.bounds(0, 0, change)) {
        if (this.x > Columns/2) {
            bounce = -1
        } else {
            bounce = 1
        }
    }

    if (!this.bounds(bounce, 0, change)) {
        this.undraw()
        this.x += bounce
        this.shapes = (this.shapes + 1) % this.type.length
        this.mobileShape = this.type[this.shapes]
        this.draw()
    }
}

// createBlocks.prototype.rotateBlockL = function(){
//     this.shapes = (this.shapes - 1)+this.type.length
//     this.mobileShape = this.type[this.shapes]
// } 


//COMEBACK TO LATER CANT TELL IF THIS WORKS 
createBlocks.prototype.connectBl = function () {
    for (h = 0; h < this.mobileShape.length; h++) {
        for (v = 0; v < this.mobileShape.length; v++) {
            if (!this.mobileShape[h][v]) {
                continue
            }

            if (this.y + h < 0) {
                alert("you lose")
                youlose = true
                break
            }
            field[this.y + h][this.x + v] = this.color
        }
    }
    }




//checks the field to see
createBlocks.prototype.bounds = function (x, y, blocks) {
    for (h = 0; h < blocks.length; h++) {
        for (v = 0; v < blocks.length; v++) {
            if (!blocks[h][v]) {
                continue;
            }
            let dx = this.x + x + v
            let dy = this.y + y + h

            if (dx < 0 || dx >= Columns || dy >= Rows) {
                return true;
            }
            if (dy < 0) {
                continue
            }
            if (field[dy][dx] != emp) {
                return true
            }
        }
    }
    return false
}



        // Controls using keycodes to assign each button as a movement
        document.addEventListener("keydown", gameControls)

        function gameControls(event) {
            if (event.keyCode == 37) {
                b.mleft()
            } else if (event.keyCode == 39) {
                b.mright()
            } else if (event.keyCode == 40) {
                b.down()
            } else if (event.keyCode == 32) {
                b.rotateBlockR()
            // else if (event.keyCode == 38) {
            //     b.hardDrop()}
           
            }
        }


        //function that animates the blocks and redraws them to the canvas
        let rate = Date.now()
        let youlose = false
        //using actual time to have the block drop every 1 sec
        function animate() {
            let fall = Date.now()

            let blockSpd = fall - rate
            if (blockSpd > 1000) {
                b.down()
                rate = Date.now()
            }
            if (!youlose) {
                //animates by continuous looping itself
                requestAnimationFrame(animate)
            }
            //this clears then redraws everything to the board
            // c.clearRect(0, 0, 200, 400)
            // b.draw()
        }

        animate()