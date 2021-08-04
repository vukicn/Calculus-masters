// CALCULUS MASTER
// Vlad Khudik, Prabin Regmi, Vuk Trumic, Nikola Vukic, Samantha Kutadzaushe, Khushbu Shah
// 05/07/2021

// defining array of equation being used for this functionality
var eq = ["-x^3-4*x^2+4*x+16", "tan(x)", "x+5"];

var index = 0, // initial index
  l = 0, // initial point for the limit
  piece, // holds the piecewise function
  piecePoint1, // holds the end point for piecewise function
  piecePoint2; // holds the end point for piecewise function

const board = createBoard();

var f = board.jc.snippet(eq[index], true, "x", false);

var plot = createPlot(f);

var point = board.create("point", [l, l], { name: "", fixed: true, size: 5 });

// handles the new function provides by the user
const updateGraph = () => {
  // creates the new function
  f = board.jc.snippet(eq[index], true, "x", false);
  // remove the old plot
  board.removeObject(plot);
  if (index > 1) {
    pieceWise(); // do piecewise if its the 3rd equation
  } else {
    // remove all of piecewise functionality
    board.removeObject(piece);
    board.removeObject(piecePoint1);
    board.removeObject(piecePoint2);
    // create a new plot
    plot = createPlot(f);
    // hide the piecewise latex
    $("#math-display2").css("display", "none");
    $("#math-display3").css("display", "none");
    $("#math-display1").css("display", "block");
  }
  board.fullUpdate();
};

// calculates the limit for the given equation
const limit = () => {
  // remove the initial point
  board.removeObject(point);
  if (index > 1) {
    var y = 0;
    // if point is grater then 2 use first equation to calculate the limit
    // because limit does not exist at f(x) = 2
    if (Number(l) > 2) y = plot.Y(Number(l));
    else if (Number(l) <= 2) y = piece.Y(Number(l));
    point = board.create("point", [Number(l), y], {
      name: "",
      fixed: true,
      fillColor: "#170A1C",
      strokeColor: "#170A1C",
      size: 5,
    });
    // show dne if point is at 2 on the limit text
    $("#limit").text(` Limit = ${Number(l) == 2 ? "DNE" : y}`);
  } else {
    point = board.create("point", [Number(l), plot.Y(Number(l))], {
      name: "",
      fixed: true,
      fillColor: "#170A1C",
      strokeColor: "#170A1C",
      size: 5,
    });
    // if function at f(x) == infinity then show dne else show the limit at the point
    $("#limit").text(` Limit = ${plot.Y(Number(l)) == Infinity ? "DNE" : plot.Y(Number(l))}`);
  }
};

$(document).ready(() => {
  // handles the slider event for this function
  var lSlider = document.getElementById("l");
  var loutput = document.getElementById("lVal");
  loutput.innerHTML = lSlider.value;
  lSlider.value = l;
  lSlider.oninput = ({ target }) => {
    loutput.innerHTML = target.value;
    l = target.value;
    limit(); // recalculate limit after slider change
  };
  limit(); // calculate limit on initial load
  // hide piecewise functions at initial load
  $("#func2").hide();
  $("#func3").hide();
});
// handles updating the function to plot
// called when the dropdown value is chnaged
const updateFunction = (currIndex) => {
  // gets the index of the current value in dropdown
  $(`#func${index + 1}`).hide();
  index = Number(currIndex.value - 1);
  $(`#func${index + 1}`).show();
  updateGraph();
  limit();
  updateLatex();
};

// parse text input and render the latex format in the html
const updateLatex = () => {
  var mjDisplayBox = MathJax.Hub.getAllJax("math-display")[0];
  try {
    var tree = MathLex.parse(eq[index]),
      latex = MathLex.render(tree, "latex");
    MathJax.Hub.Queue(["Text", mjDisplayBox, latex]);
  } catch (err) {}
};
// creates all the plot and points for the piecewise function
const pieceWise = () => {
  plot = board.create("functiongraph", [(x) => x + 5, 2, 99999], {
    strokeColor: "#D36582",
    strokeWidth: 3,
  }); // first function with given bounds
  piece = board.create("functiongraph", [(x) => -(1 / 2) * x + 3, 2, -99999], {
    strokeColor: "#D36582",
    strokeWidth: 3,
  }); // first 2nd function with given bounds
  piecePoint1 = board.create("point", [2, 7], {
    name: "",
    fixed: true,
    fillColor: "#07A0C3",
    strokeColor: "#07A0C3",
  }); // filled point at the end to show a limit exists
  piecePoint2 = board.create("point", [2, 2], {
    name: "",
    fixed: true,
    showInfobox: false,
    fillColor: "#FFFFFC",
    strokeColor: "#07A0C3",
  }); // empty point at the end to show "hole"
  // show the latex format for piecewise function
  $("#math-display1").css("display", "none");
  $("#math-display2").css("display", "block");
  $("#math-display3").css("display", "block");
};
