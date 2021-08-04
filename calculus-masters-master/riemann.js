// CALCULUS MASTER
// Vlad Khudik, Prabin Regmi, Vuk Trumic, Nikola Vukic, Samantha Kutadzaushe, Khushbu Shah
// 05/07/2021

// holds the function given by the user
var inputFunction = "sin(x)";
// number of rectangle being displayed on the graph
var nOfRect = 10;
// starting and ending points of the function
var start, end;

// creates the graph on the html page and stores the object in the board
const board = createBoard();

// creates the riemann sum function on the graph with number of rectangle start and end values
// param: user given function
const createRiemann = (f) =>
  board.create("riemannsum", [f, () => n.Value(), () => "left", () => a.Value(), () => b.Value()], {
    fillColor: "red",
    fillOpacity: 0.3,
    strokeColor: "black",
  });

// creates a slider that is invisible on the graph
// this is used to make changes to the graph in real time
// this slider controls the start point
var a = board.create(
  "slider",
  [
    [1, 4],
    [5, 4],
    [-100, -3, 0],
  ],
  { visible: false }
);

// creates a slider that is invisible on the graph
// this is used to make changes to the graph in real time
// this slider controls the end point
var b = board.create(
  "slider",
  [
    [1, 3],
    [5, 3],
    [0, 2 * Math.PI, 100],
  ],
  { visible: false }
);

// creates a slider that is invisible on the graph
// this is used to make changes to the graph in real time
// this slider controls the number of rectangle point
var n = board.create(
  "slider",
  [
    [1, 3],
    [5, 3],
    [0, 10, 400],
  ],
  { visible: false }
);

// parses the user input function to a javascript function that is readable by jsxgraph
var f = board.jc.snippet(inputFunction, true, "x", false);

// creates the plot or the line on the graph and stores the object in a variable
var plot = createPlot(f);

// creates the riemann sum function on the graph with end,start,and number of rect
var riemann = createRiemann(f);

// handles the updating of the graph
const updateGraph = () => {
  // tries to parse the user input and if there are error do nothing
  try {
    f = board.jc.snippet(inputFunction, true, "x", false);
  } catch {}
  // removes the riemann sum function and the plot
  board.removeObject(riemann);
  board.removeObject(plot);
  // creates the riemann sum function and the plot with the new function
  plot = createPlot(f);
  riemann = createRiemann(f);
  // updates the graph
  board.fullUpdate();
};
// handles the updating of the sum
const updateSum = () => {
  //calculates the sum and displays it in the html
  $("#sum").text(` Sum = 
    ${JXG.Math.Numerics.riemannsum(f, n.Value(), "left", a.Value(), b.Value()).toFixed(4)}`);
};

// handles the event of the textbox
$(document).ready(() => {
  // defining the var to query and hold the output objects
  var mjDisplayBox, mjOutBox;
  // creates the reference to the mathjax output that hold the latex foramt
  MathJax.Hub.Queue(() => {
    mjDisplayBox = MathJax.Hub.getAllJax("math-display")[0];
    mjOutBox = MathJax.Hub.getAllJax("math-output")[0];
  });
  // listens to the event for the input
  $("#math-input").on("keyup", ({ target }) => {
    var math = $(target).val(); // gets the function from the input
    inputFunction = math; // stores the function for the graph to update
    updateGraph();
    $(this).css("color", "black"); // changes the textbox color to default
    if (math.length > 0) {
      // tries to parse and display the function in the latex format
      try {
        var tree = MathLex.parse(math),
          latex = MathLex.render(tree, "latex");
        MathJax.Hub.Queue(["Text", mjDisplayBox, latex]);
      } catch (err) {
        // if there was an error turn textbox to red
        $(this).css("color", "red");
      }
    } else {
      // if no value in the input, makes it empty
      MathJax.Hub.Queue(["Text", mjDisplayBox, ""]);
      MathJax.Hub.Queue(["Text", mjOutBox, ""]);
    }
  });
  // display the sin function in the input field on initial load
  $("#math-input").val(inputFunction);
  updateSum(); // update the sum on initial load
  sliders(); // initilize the event for the sliders
});

// handles the event of all the sliders
const sliders = () => {
  sliderChanger("n", "nVal", nOfRect, n, board, updateSum);

  sliderChanger("start", "sVal", start, a, board, updateSum);

  sliderChanger("end", "eVal", end, b, board, updateSum);
};
