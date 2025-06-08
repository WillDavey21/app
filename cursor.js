const hand = document.getElementById("hand");
const clickedIcon = document.getElementById("clicked-icon");

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  hand.style.left = `${x}px`;
  hand.style.top = `${y}px`;

  clickedIcon.style.left = `${x - 20}px`;
  clickedIcon.style.top = `${y - 20}px`;
});

document.addEventListener("mousedown", () => {
  clickedIcon.style.opacity = "1";
  clickedIcon.style.transform = "scale(1)";
});

document.addEventListener("mouseup", () => {
  clickedIcon.style.opacity = "0";
  clickedIcon.style.transform = "scale(0.5)";
});

