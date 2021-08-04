// CALCULUS MASTER
// Vlad Khudik, Prabin Regmi, Vuk Trumic, Nikola Vukic, Samantha Kutadzaushe, Khushbu Shah
// 05/07/2021

const board = createBoard();
var q1 = 1; // holds the point for the secant line
board.suspendUpdate();

var f = board.jc.snippet("x^3-4*x^2+4*x+16", true, "x", false);

// creating a point for the secant line
var qSliderGraph = board.create(
  "slider",
  [
    [1, 4],
    [5, 4],
    [-5, 1, 5],
  ],
  { visible: false }
);
var plot = createPlot(f); // plot the graph

// creating the glider so the user can drag the point to chnage the tangent line
var glider = board.create("glider", [0, 0, plot], {
  size: 5,
  name: "",
  strokeColor: "#662E9B",
  fillColor: "#662E9B",
});

// creating a point for the tangent line
// f(glider.X() + 0.0001) finds the slope of the tangent line based on the position of the glider
// 0.0001 this is the offset to create a line between the glider and the tangent point
// if this value was 0 the graph would not be drawn
var tanPoint = board.create("point", [() => glider.X() + 0.0001, () => f(glider.X() + 0.0001)], {
  size: 1,
  name: "p",
  size: 6,
});

// creating a point for the sec line
// creates the line between the tangent point and the slider value
var secPoint = board.create(
  "point",
  [() => glider.X() + qSliderGraph.Value(), () => f(glider.X() + qSliderGraph.Value())],
  {
    size: 2,
    name: "q",
  }
);

// draws the tangent line from glider and the tan point
var tangentLine = board.create("line", [glider, tanPoint], {
  strokeColor: "#EE964B",
  dash: 2,
  strokeWidth: 3,
});

// draws the sec line from tan point and the sec point
var secLine = board.create("line", [glider, secPoint], {
  strokeColor: "#08BDBD",
  dash: 2,
  strokeWidth: 3,
});

board.unsuspendUpdate(); // finally update the graph

// handles the slider event
$(document).ready(() => {
  sliderChanger("q", "qVal", q1, qSliderGraph, board);
});
