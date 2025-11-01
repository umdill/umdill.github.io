function createHatReward(x = 0, y = 0, reward = "none") {// size is 15 skap units
  x -= 7.5;
  y -= 7.5;
  // that offset is later reverted in serialization.
  // size of hat reward is 15 skap units but for this the origin is in the middle, not top left
  const hatObject = {
    pos: {
      x,
      y
    },
    reward: reward,
    size: {
      x: 15,
      y: 15
    },
    type: "hatReward"
  };

  // Create inputs/labels
  const xInput = document.createElement("input");
  xInput.value = x;
  xInput.addEventListener("input", () => {
    hatObject.pos.x = xInput.value = Math.max(xInput.value, 0);
  });

  const yInput = document.createElement("input");
  yInput.value = y;
  yInput.addEventListener("input", () => {
    hatObject.pos.y = yInput.value = Math.max(yInput.value, 0);
  });

  const textInput = document.createElement("input");
  textInput.value = reward;
  textInput.addEventListener("input", () => {
    hatObject.reward = textInput.value;
  });

  hatObject.element = createFolder("Hat Reward Properties", [
    createFolder("Position", [
      createProperty("x", xInput, "number"),
      createProperty("y", yInput, "number")
    ]),
    createProperty("reward", textInput, "text")
  ]);
  hatObject.inputs = {
    x: xInput,
    y: yInput,
    reward: textInput
  };

  return hatObject;
}