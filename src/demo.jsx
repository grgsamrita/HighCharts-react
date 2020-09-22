import React, { Component } from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts";
import $ from "jquery";

// Import our demo components
import Chart from "./components/Chart.jsx";

// Load Highcharts modules
require("highcharts/modules/exporting")(Highcharts);

const chartOptions = {
  legend: {
    useHTML: true,
    // Label formatter function, we place the index of the datasets into the data-index attribute
    labelFormatter: function () {
      return (
        '<span class="abc" data-index="' +
        this.index +
        '">' +
        this.name +
        `<div class='appTooltip' style='display:none;'>
        ${this.name} sample ${this.index + 1}
      </div></span>`
      );
    }
  },
  chart: {
    events: {
      load: function () {
        var chart = this,
          legend = chart.legend;
        // console.log(legend);
        for (var i = 0, len = legend.allItems.length; i < len; i++) {
          (function (i) {
            var item = legend.allItems[i].legendItem;
            // var tooltip = `<div class="appTooltip" style="display:none">
            //     This is a sample tooltip
            //   </div>`;

            item
              .on("mouseover", function (e) {
                $(this).find(".appTooltip").show();
                $(this).find(".appTooltip").attr({ dy: "-30" });
                // console.log("mouseon" + i);
              })
              .on("mouseout", function (e) {
                $(this).find(".appTooltip").hide();
                // console.log($("html").find(".appTooltip"));
                // console.log("mouseout" + i);
              });
          })(i);
        }
      }
    }
  },
  title: {
    text: ""
  },
  series: [
    {
      data: [
        [1, "Highcharts"],
        [1, "React"],
        [3, "Highsoft"]
      ],
      name: "series first",
      keys: ["y", "name"],
      type: "column"
    },
    {
      data: [
        [5, "Highcharts"],
        [2, "React"],
        [4, "Highsoft"]
      ],
      name: "series second",
      keys: ["y", "name"],
      type: "column"
    }
  ]
};

// Render app with demo chart
const App = () => (
  <div>
    <h1>Demos</h1>

    <h2>Highcharts</h2>
    <Chart options={chartOptions} highcharts={Highcharts} />
  </div>
);

render(<App />, document.getElementById("root"));
