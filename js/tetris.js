import BLOCKS from "./blocks.js";

// DOM
const playground = document.querySelector(".playground > ul");

// setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// Variables
let downInterval;
let isGameOver = false;
let tempMovingItem;
const movingItem = {
  type: "tree",
  direction: 0,
  top: 0,
  left: 0,
};

init();

// functions
function init() {
  tempMovingItem = { ...movingItem };
  // tempMovingItem = movingItem;
  //   movingItem.type = "gogo";
  //   console.log(tempMovingItem);
  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  generateNewBlock();
}
function generateNewBlock() {
  renderBlocks();
}

// render block
function renderBlocks() {
  const { type, direction, top, left } = tempMovingItem;
  // 이전 클래스 제거
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove(type, "moving");
  });

  BLOCKS[type][direction].some((block) => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const isEmpty = checkEmpty(target);
    if (isEmpty) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...movingItem };
      renderBlocks();
      return true;
    }
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
}
function checkEmpty(target) {
  if (!target) {
    return false;
  }
  return true;
}
// moveBlock
function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks();
}
function changeDirection() {
  const currDirection = tempMovingItem.direction;
  currDirection === 3
    ? (tempMovingItem.direction = 0)
    : (tempMovingItem.direction += 1);

  renderBlocks();
}

// add 1 row
function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < GAME_COLS; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}

// event handling
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 40: // top
      moveBlock("top", 1);
      break;
    case 39: // right
      moveBlock("left", 1);
      break;
    case 37: // left
      moveBlock("left", -1);
      break;
    case 38: // up
      changeDirection();
      break;
    default:
      break;
  }
});
