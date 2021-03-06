function init() {
  var canvas = document.getElementById("mycanvas");
  W = canvas.width = 1200;
  H = canvas.height = 600;
  pen = canvas.getContext("2d");
  game_over = false;
  cs = 66; //cell size
  score = 5;

  // Create an Image object for food
  food_img = new Image();
  food_img.src = "Assets/apple.png";

  trophy = new Image();
  trophy.src = "Assets/trophy.png";

  food = getRandomFood();

  snake = {
    init_len: 5,
    color: "blue",
    cells: [],
    direction: "right",

    createSnake: function () {
      for (var i = this.init_len - 1; i >= 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },
    drawSnake: function () {
      for (var i = 0; i < this.cells.length; i++) {
        pen.fillStyle = this.color;
        pen.fillRect(
          this.cells[i].x * cs,
          this.cells[i].y * cs,
          cs - 2, // to have demarkation
          cs - 2
        );
      }
    },

    updateSnake: function () {
      //Update Snake according to the direction property
      //check if snake has eaten food increase the length ofthe snake and generate new food object

      var headX = this.cells[0].x;
      var headY = this.cells[0].y;

      if (headX == food.x && headY == food.y) {
        food = getRandomFood();
        score++;
      } else {
        this.cells.pop();
      }

      var nextX, nextY;
      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == "down") {
        nextX = headX;
        nextY = headY + 1;
      } else {
        nextX = headX;
        nextY = headY - 1;
      }
      this.cells.unshift({ x: nextX, y: nextY });

      /*Write a Logic that prevents snake from going out*/
      var last_x = Math.round(W / cs);
      var last_y = Math.round(H / cs);

      if (
        this.cells[0].y < 0 ||
        this.cells[0].x < 0 ||
        this.cells[0].x > last_x ||
        this.cells[0].y > last_y
      ) {
        game_over = true;
      }
    },
  };

  snake.createSnake();
  function keyPressed(e) {
    //Conditional Statements
    if (e.key == "ArrowRight") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft") {
      snake.direction = "left";
    } else if (e.key == "ArrowUp") {
      snake.direction = "up";
    } else {
      snake.direction = "down";
    }
  }

  //Add an event listener on the document object
  document.addEventListener("keydown", keyPressed);
}

function draw() {
  pen.clearRect(0, 0, W, H); // erase the old frame
  snake.drawSnake();

  pen.fillStyle = food.color;
  pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);

  pen.drawImage(trophy, 20, 20, cs, cs);
  pen.fillStyle = "blue";
  pen.font = "20px Roboto";
  pen.fillText(score, 50, 50);
}

function update() {
  snake.updateSnake();
}

function getRandomFood() {
  var foodX = Math.round((Math.random() * (W - cs)) / cs);
  var foodY = Math.round((Math.random() * (H - cs)) / cs);

  var food = {
    x: foodX,
    y: foodY,
    color: "red",
  };
  return food;
}

function gameloop() {
  if (game_over == true) {
    clearInterval(f);
    alert("Game Over");
  }
  draw();
  update();
}

init();

var f = setInterval(gameloop, 100);
