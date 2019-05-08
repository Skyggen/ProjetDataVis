//import series from '../data/popularTv.json'
import films from '../data/popularMovie.json'

d3 = require('d3')
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

var url = "https://api.themoviedb.org/3/movie/popular?language=fr&api_key=e0c090ad9289504f572875f449a5f944"

function getJSON() {
  var resp = [];
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'jsonp',
    success : function(data) {
      console.log(data);
      resp.push(data) //put it in an array if you really want to
      drawGraph2(films); //calling a function with your array
    }
  })
}


export function drawGraph2(films){
  console.log("hello")
  var margin = {top: 20, right: 0, bottom: 70, left: 80},
  width = 600 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;



// set the range
var x = d3.scaleBand()
.rangeRound([0,width])
.padding(.05)

var y = d3.scaleLinear().range([height, 0]);


// define the axis
// define the axis
var xAxis = d3.axisBottom(x)

var yAxis = d3.axisLeft(y)
.ticks(10);


// add the SVG element
var svg = d3.select("#graph").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
  "translate(" + margin.left + "," + margin.top + ")");


// load the data
var data = films;
d3.json(data).then(function(data){ 

      //draw bars
      /**
svg.selectAll("*").remove();
        x.domain(data.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.sum; })]);
  svg.selectAll("bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr('fill',"url(#svgGradient)")
  .attr("x", function(d) { return x(d.year); })
  .attr("width", x.bandwidth()/1.2)
  .attr("y", function(d) { return y(d.sum); })
  .attr("height", function(d) { return height - y(d.sum); });
*/

//add y axis
    svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
    .attr("fill","black")
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -80)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Popularity");

    // add x axis
  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
    .attr("fill","black")
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", "-.55em")
  .attr("transform", "rotate(-90)")
    .attr("fill","black");


});
}