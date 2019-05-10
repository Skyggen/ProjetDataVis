import series from '../data/popularTv.json'
import films from '../data/popularMovie.json'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as d3 from "d3";


// select movie
const selectMovie = document.querySelector("#graphMovie");
// If randomMovie element exsists..
if(selectMovie){
	selectMovie.addEventListener("click", ()=>{
    var data = films
    drawGraph(data);
	})
}

// select show
const selectShow = document.querySelector("#graphTvShow");
// If randomMovie element exsists..
if(selectShow){
	selectShow.addEventListener("click", ()=>{
    var data = series
    drawGraph(data);
	})
}

export function drawGraph(data) {
  var margin = { top: 20, right: 0, bottom: 70, left: 80 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// add the SVG element
var svg = d3.select("#graph")

.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

  

  // set the range
  console.log(data);
  var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(.05)

  var y = d3.scaleLinear().range([height, 0]);
  const xScale = d3.scaleLinear().domain(d3.extent(data.results.map(d => d.vote_average))).range([0, width])
  const yScale = d3.scaleLinear().domain(d3.extent(data.results.map(d => d.popularity))).range([0, height])

  const circles = svg.selectAll('circle')
    .data(data.results)
    .enter().append('circle')
    .attr('r', 10)
    .attr('cy', d => yScale(d.popularity))
    .attr('cx', d => xScale(d.vote_average))



  // define the axis
  var xAxis = d3.axisBottom(x)

  var yAxis = d3.axisLeft(y)

  //add y axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .attr("fill", "black")
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
    .attr("fill", "black")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-90)")
    .attr("fill", "black");


}
