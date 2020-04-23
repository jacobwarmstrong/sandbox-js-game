class Paddle {
    constructor(gameWidth, gameHeight) {
        this.width = 150;
        this.height = 30;
        this.gameWidth = 800;
        
        this.maxSpeed = 10;
        this.speed = 0;
        
        this.position = {
            x: gameWidth / 2 - this.width / 2,
            y: gameHeight - this.height - 10,
        }
    }
    
    draw(context) {
        context.fillStyle = "#000000";
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    
    update(deltaTime) {
        this.position.x += this.speed;
        
        if(this.position.x < 0) this.position.x = 0;
        if(this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
    }
    
    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    
    moveRight() {
        this.speed = this.maxSpeed;
    }
    
    stop() {
        this.speed = 0;
    }
}

class InputHandler {
    constructor(paddle) {
        document.addEventListener('keydown', (event => {
            switch(event.keyCode) {
                case 37:
                    paddle.moveLeft();
                    break;
                    
                case 39:
                    paddle.moveRight();
                    break;
            }
        }));
        
        document.addEventListener('keyup', (event => {
            switch(event.keyCode) {
                case 37:
                    if(paddle.speed < 0)
                      paddle.stop();
                    break;
                    
                case 39:
                    if(paddle.speed > 0)
                      paddle.stop();
                    break;
            }
        }));
    }
}


class Ball {
    constructor(gameWidth, gameHeight) {
        this.image = document.getElementById('ball');
        this.position = {x:10, y:10};
        this.speed = {x: 2, y: 2};
        this.size = 24;
        
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        
        this.gravity = 0.06;
        this.potentialEnergy = 1;
    }
    
    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
    
    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        
        if( (this.position.x + this.size) > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }
        
        if ( (this.position.y + this.size) > this.gameHeight || this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }
        
        if (this.speed.y < 0 ) {
            this.speed.y = this.speed.y - ((this.speed.y * this.potentialEnergy) * this.gravity);
            this.potentialEnergy = this.potentialEnergy - this.gravity;
            
        }
        
        if (this.speed.y > 0) {
            this.speed.y = this.speed.y + (this.speed.y * this.gravity);
        }
    }
}

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    //clear screen
    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    paddle.update(deltaTime);
    ball.update(deltaTime);
    paddle.draw(context);
    ball.draw(context);
    
    requestAnimationFrame(gameLoop);
}
/*END CLASSES AND FUNCTIONS*/


/*VARIABLES AND CONSTANTS*/
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let canvas = document.getElementById('game-screen');
let context = canvas.getContext('2d');

let timestamp = 0
let lastTime = 15;

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball = new Ball(GAME_WIDTH, GAME_HEIGHT);

paddle.draw(context);

new InputHandler(paddle);

requestAnimationFrame(gameLoop(timestamp));
        
