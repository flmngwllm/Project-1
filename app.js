
//constant variables that will not change throughout
const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")
const Columns = 10
const Rows = 20
const sq = 20
const emp = '#ffffff'
const y =0


// // Controls using keycodes to assign each button as a movement
//  document.addEventlistner("keydown", controller)


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
const lBlock =[[
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
               [[0, 1, 0],
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
const sBlock= [
              [[0, 1, 1],
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


const zBlock= [ [[1, 1, 0],
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
const squareBlock =[
    [               [1, 1],
                    [1, 1],
]
]
const blBlock = [[
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

const iBlock = [[
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
    [lBlock, "red"], [sBlock, "green"], [zBlock, "yellow"], [tBlock, "orange"], [blBlock, "pink"], [squareBlock,"blue"], [iBlock,"purple"]
]
// defining and setting colors that will be used in an array for each block that will be used
// var colors = ['blue', 'green', 'yellow', 'red', 'orange', 'pink', 'purple']


//randomizing the different blocks that will appear
function ranBlock(){ 
    let r = ranBlock = Math.floor(Math.random() * blocks.length)
    return new createBlocks(blocks[r][0],blocks[r][1]) 
}

let b = ranBlock()




//object for the blocks with color parameters 
function createBlocks(type ,color){
    this.type = type
    this.color = color 

    this.shapes = 0
    this.mobileShape = this.type[this.shapes]

    this.y = 3
    this.x =3

}

createBlocks.prototype.fill = function(color){
    for(h= 0; h < this.mobileShape.length; h++){
        for(v = 0; v < this.mobileShape.length; v++){
if(this.mobileShape[h][v]){
    showSq(this.x + v, this.y + h, color)
}
        }
    }
}

//this makes the piece show up on the field
createBlocks.prototype.draw = function(){
    this.fill(this.color)
}

b.draw()


//this make the go away on the field
createBlocks.prototype.destroy = function(){
    this.fill(emp)
}

createBlocks.prototype.down = function(){
    
    this.y += 1;
    this.draw();
}

createBlocks.prototype.hardDrop = function(){
    this.y+= 15
    this.draw();
} 
//function to move block to the right by 1 on the x axis
createBlocks.prototype.mright = function(){
    this.x+= 1;
    this.draw();
}

//function to move the block to the left by 1 on the x axis
createBlocks.prototype.mleft = function(){
    this.x-= 1;
    this.draw();
}

//rotating the block to the right 
createBlocks.prototype.rotateBlockR = function(){
    this.shapes = (this.shapes + 1)%this.type.length
    this.mobileShape = this.type[this.shapes]
}

// createBlocks.prototype.rotateBlockL = function(){
//     this.shapes = (this.shapes - 1)+this.type.length
//     this.mobileShape = this.type[this.shapes]
// } 


//checks the field to see
createBlocks.prototype.bounds = function(x,y,block){
    for(h= 0; h < this.blocks.length; h++){
        for(v = 0; v < this.blocks.length; v++){
if(!block[h][v]){
    continue;
}
let dx = this.x + x + v
let dy = this.y + y + h 

if (dx < 0 || dx >= Columns || dy >= Rows ){
    return true;
}
if (dy < 0){
    continue
}
if (field[dy][dx]!= emp){
    return true
}
}
        }
    return false
}


//COMEBACK TO LATER CANT TELL IF THIS WORKS 
// createBlocks.prototype.connectBl = function(){
//     for(h= 0; h < this.mobileShape.length; h++){
//         for(v = 0; v < this.mobileShape.length; v++){
//         if(!this.mobileShape[h][v]){
//             continue
// }

//     if(this.y + h < -1){
//         break
//     }
//         }
    
// }
// }

 // Controls using keycodes to assign each button as a movement
 document.addEventListener("keydown", gameControls)

 function gameControls(event){
     if(event.keyCode == 37){
        b.mleft()
     }else if(event.keyCode == 39){
        b.mright()
     }else if(event.keyCode == 40){
        b.down()
     }else if(event.keyCode == 38){
         b.hardDrop()
     }else if(event.keyCode == 32){
        b.rotateBlockR()
     }
 } 

 
//function that animates the blocks and redraws them to the canvas
let rate = Date.now()
//using actual time to have the block drop every 1 sec
function animate(){
    let fall = Date.now()
    let blockSpd = fall - rate
    if(blockSpd > 1000){
        b.down() 
        rate=Date.now()
    }
    //animates by continuous looping itself
    requestAnimationFrame(animate)
    //this clears then redraws everything to the board
    c.clearRect(0 ,0 ,200 ,400)
    b.draw()
}

animate()