//constant variables that will not change throughout
const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")
canvas.width = 200
canvas.height = 400
const Columns = 10
const Rows = 20
const sq = 20
const emp = '#ffffff'
const Points = document.querySelector("score1")
var score = 0
var music = document.querySelector(".me")

//function to colors the board and squares on the canvas
function showSq(x, y, color) {
    c.fillStyle = color
    c.fillRect(x * sq, y * sq, sq, sq)

    c.strokeStyle = "#ffffff"
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


//randomizing the different blocks that will appear
function ranBlck() {
    let r = ranBlock = Math.floor(Math.random() * blocks.length)
    //come back later
    // let rc = ranColo = Math.floor(Math.random() * color.length)
    return new createBlocks(blocks[r][0], blocks[r][1])
}

let b = ranBlck()




//object for the blocks with color parameters 
function createBlocks(type, color) {
    this.type = type
    this.color = color

    this.shapes = 0
    this.mobileShape = this.type[this.shapes]

    //starting position of the blocks to start above the field
    this.y = -3
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
//stacks and locks blocks
        this.connectBl()
    //randomize blocks that appear
        b = ranBlck()

    }

}

// //hard drop still a work in progress still goes off the board
createBlocks.prototype.hardDrop = function () {
    if (!this.bounds(0, 1, this.mobileShape)) {
        this.destroy()
        this.y += 15
        this.draw();
    }
}


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
createBlocks.prototype.rotateBlockR = function () {
    let change = this.type[(this.shapes + 1) % this.type.length]
    let bounce = 0

    if (this.bounds(0, 0, change)) {
        if (this.x > Columns / 2) {
            bounce = -1
        } else {
            bounce = 1
        }
    }

    if (!this.bounds(bounce, 0, change)) {
        this.destroy()
        this.x += bounce
        this.shapes = (this.shapes + 1) % this.type.length
        this.mobileShape = this.type[this.shapes]
        this.draw()
    }
}

//counld neve get it to rotate twice without disappearing
// createBlocks.prototype.rotateBlockL = function(){
//     this.shapes = (this.shapes - 1)+this.type.length
//     this.mobileShape = this.type[this.shapes]
// } 


//locks the blocks so they can stack on each other
createBlocks.prototype.connectBl = function () {
    for (h = 0; h < this.mobileShape.length; h++) {
        for (v = 0; v < this.mobileShape.length; v++) {
            //emp
            if (!this.mobileShape[h][v]) {
                continue
            }

            if (this.y + h < 0 ) {
                 music.pause()
                var audio = new Audio('SD.mp3');
                audio.play();
                alert("you lose")

                //stop loop
                youlose = true
                break
            }
        
            field[this.y + h][this.x + v] = this.color
        }
    }

    //checks to see if what square is not empty this clears the lines when they get full

    for (h = 0; h < Rows; h++) {
        let fullRow = true
        for (v = 0; v < Columns; v++) {
            fullRow = fullRow && (field[h][v] != emp)
        }
        if (fullRow) {
            for (y = h; y > 1; y--) {
                for (v = 0; v < Columns; v++) {
                    field[y][v] = field[y - 1][v]
                }
                var audio = new Audio('megadestroy.mp3');
                audio.play();
            }
            for (v = 0; v < Columns; v++) {
                field[0][v] = emp
            }
        }
       
            
        
            
        
    }
    
    drawfield();
}



var box = 1
var barrier = 2
//
createBlocks.prototype.bounds = function (x, y, blocks) {
    for (h = 0; h < blocks.length; h++) {
        for (v = 0; v < blocks.length; v++) {

            if (!blocks[h][v]) {
                continue;
            }
            let dx = this.x + x + v
            let dy = this.y + y + h
            //keeps the blocks within its bounds
            if (dy >= Rows || dx < 0 || dx >= Columns) {
                return box;
            }
            //keeps from breaking the whole game by skipping loop
            if (dy < 0) {
                continue
            }
            if (field[dy][dx] != emp) {
                return barrier
            }
        }
    }
    return 0
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
    } else if (event.keyCode == 38) {
       b.hardDrop()
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
    
}
var newGame = document.querySelector('.newGame')
var start = document.querySelector('.start') 

//not working yet but its to start a new game
newGame.addEventListener('click',function(){
destroy()
    createBlocks()
ranBlck()
 animate()
})

//will run the game when start button is clicked
start.addEventListener('click', function(){
   var music = document.querySelector(".me")
    music.play()
    animate()
    
})



const con = document.querySelector('.back')
//making screen responsive fo background
con.width = window.innerWidth
con.height= window.innerHeight
const can = con.getContext('2d')
let cell = []
// setting the number of items
let numcell = 100
let time = Date.now()

//function for randomcolors
function ranColors(){
let Rcolors = ['blue', 'green', 'yellow', 'red', 'orange', 'pink', 'purple']
return Rcolors[Math.floor(Math.random()* Rcolors.length)]
}


// function that sets the drop rate, rotation speed and creating each piece to fill the canvas
function update (){
    let flow = Date.now()
    ft = flow - time

    for( let i = cell.length -1; i >= 0; i--){
        let c = cell[i]

        if(c.y > con.height){
            cell.splice(i, 1)
            continue
        }
        c.y += c.grav * ft
        c.spin += c.spinspeed * ft
    }

    while (cell.length < numcell){
        cell.push(new Cell(Math.random()*con.width, -20))
    }
    time = flow
    setTimeout(update, 1)
}

//function to draw to the canvas when called
function drawC(){
    can.clearRect(0,0, con.width, con.height)
// loop that goes over and applies to the squares
    cell.forEach(function (c){
    can.save()
    can.fillStyle = c.color
    can.translate(c.x +c.size /2, c.y + c.size / 2 )
    can.rotate(c.spin)
    can.fillRect(-c.size / 1, -c.size/ 1, c.size, c.size)
    can.restore()
})
 requestAnimationFrame(drawC)
}


function Cell(x,y){
    this.x = x
    this.y = y
    this.color = ranColors()
    this.size = (Math.random()* 0.5 + 0.75)*15
    this.spin = (Math.PI*2) * Math.random()
    this.spinspeed = (Math.PI*2) * (Math.random() - 0.5) * 0.001
    this.grav = (Math.random()* 0.5 + 0.62)*0.1

}

while (cell.length < numcell){
    cell.push(new Cell(Math.random()* con.width, Math.random() * con.height ))
}

update()
drawC()

