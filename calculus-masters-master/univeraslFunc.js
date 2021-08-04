// CALCULUS MASTER
// Vlad Khudik, Prabin Regmi, Vuk Trumic, Nikola Vukic, Samantha Kutadzaushe, Khushbu Shah
// 05/07/2021

//Refactored code that can be used in all pages

// creates the empty graph with panning and zooming features
const createBoard = () => {
  return JXG.JSXGraph.initBoard("graph", {
    axis: true,
    boundingbox: [-10, 7, 10, -7],
    showCopyright: false,
    pan: {
      enabled: true,
      needShift: false,
    },
    zoom: {
      factorX: 1.25,
      factorY: 1.25,
      wheel: true,
      needShift: true,
      min: 0.001,
      max: 1000.0,
      pinchHorizontal: true,
      pinchVertical: true,
      pinchSensitivity: 7,
    },
  });
};

// creates a plot on the board with the given function
// param: function from the user input
const createPlot = (f) => {
  return board.create("functiongraph", [f], {
    strokeColor: "#00A5E0",
    strokeWidth: 3,
  });
};

// handles resizing the svg graph when the window is resized
// makes it compatible with different browsers and screens
$(window).resize(() => {
  if ($(this).width() <= 1000) {
    $("#jxgbox").css({ height: "60vh", "margin-top": "15px" });
  } else $("#jxgbox").css("height", "90vh");
  $(".JXG_navigation_button").toArray()[1].click();
});

// binds keyboard input with the page
// easily able to move around the graph
$(document).keydown((e) => {
  switch (e.key) {
    case "ArrowLeft":
      $(".JXG_navigation_button").toArray()[3].click();
      break;
    case "ArrowRight":
      $(".JXG_navigation_button").toArray()[6].click();
      break;
    case "ArrowUp":
      $(".JXG_navigation_button").toArray()[5].click();
      break;
    case "ArrowDown":
      $(".JXG_navigation_button").toArray()[4].click();
      break;
  }
});

// this handles all the slider events and changes the variables accordingly
// params: sliderId - Html id to query
//        displayId - id of the display field to show the value
//        tracker - internal variable that tracks the value
//        graphSlider - an object thats in the graph that handles the values being updated
//        board - graph object
//        param - any other functions or variables that depends on the slider, like updating the sum

const sliderChanger = (sliderId, displayId, tracker, graphSlider, board, param) => {
  var slider = document.getElementById(sliderId);
  var output = document.getElementById(displayId);
  output.innerHTML = slider.value;
  tracker = graphSlider.Value();
  slider.value = tracker;
  slider.oninput = ({ target }) => {
    output.innerHTML = target.value;
    // sets the value of the slider which chnages the graph
    // this seems like the only way to change the graph without having to rerender everything
    graphSlider.setValue(target.value);
    board.fullUpdate();
    param && param();
  };
};

// inserts header on riemann sum, limit, and tangent pages
// loads it in as the page is rendered in the browser
$(document).ready(() => {
  $(`<a href="index.html">
<div class="row justify-content-center pt-1 pb-1" style="background-color: black;">
    <div style="border: 5px solid var(--primaryBtn);">
        <div style="color: var(--secondaryBtn); font-size: 2em; padding-inline: 30px;" class="mt-2">C
        </div>
    </div>
</div>
</a>`).prependTo("body");
});
