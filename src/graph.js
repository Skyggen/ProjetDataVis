import series from '../data/popularTv.json'
import films from '../data/popularMovie.json'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as d3 from "d3";

const margin = { top: 20, right: 0, bottom: 70, left: 80 }
const width = 600 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom
const movieInfo = document.querySelector("#movieInfo");

const svg = d3.select("#graph").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define the div for the tooltip
const div = d3.select("body").append("movieInfo")
  .attr("class", "tooltip");

// select movie
const selectMovie = document.querySelector("#graphMovie");
// If randomMovie element exsists..
if (selectMovie) {
  selectMovie.addEventListener("click", () => {
    var data = films
    updateGraph(data, true);
  })
}

// select show
const selectShow = document.querySelector("#graphTvShow");
// If randomMovie element exsists..
if (selectShow) {
  selectShow.addEventListener("click", () => {
    var data = series
    updateGraph(data, false);
    
  })
}


export function updateGraph(data, fromFilm) {
  
  svg.selectAll("*").remove();
  console.log(data)
  // set the range
  var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(.05)

  var y = d3.scaleLinear().range([height, 0]);
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, width])
  const yScale = d3.scaleLinear().domain(d3.extent(data.results.map(d => d.popularity))).range([height, 0])
 
  const circles = svg.selectAll('circle')
    .data(data.results)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('cy', d => yScale(d.popularity))
    .attr('cx', d => xScale(d.vote_average))
    .on("mouseover", function (d) {
      if (fromFilm) {
        var title = d.title
         }else{
           var title = d.name
         }

      div.transition()
        .duration(100)
        .style("opacity", 1);
      div.html(`<div class="card" style="width: 15rem;">
					<img class="card-img-top" src="http://image.tmdb.org/t/p/w185/${d.poster_path}" onerror="this.onerror=null;this.src='https://societeirlande.com/wp-content/themes/consultix/images/no-image-found-360x260.png';">
					
                    <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text"><strong>VO:</strong> <span>${d.original_language} </span><strong>Note:</strong> <span>${d.vote_average} / 10</span></p>
                    <p class="card-text"><strong>Date de sortie:</strong> <span>${d.release_date}</span></p>
                    <p class="card-text"><strong>Détailles:</strong> <span>${d.overview}</span></p>
					</div>
			</div>
			</div>`)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 150) + "px");
    })
    .on("mouseout", function (d) {
      div.transition()

        .duration(100)
        .style("opacity", 0);
    });

  // define the axis
  var xAxis = d3.axisBottom(xScale)
  var yAxis = d3.axisLeft(yScale)

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

  // add x axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .attr("fill", "black")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.5em")
    .attr("dy", "1.55em")
    
    svg.append("text")
    .attr("x", 60)
    .attr("y", 10)
    .text("Vote")
    .style("font-size", "15px")
    .attr("alignment-baseline","middle")


    svg.append("text")
    .attr("x", 460)
    .attr("y", 445)
    .text("Vote")
    .style("font-size", "15px")
    .attr("alignment-baseline","middle")

}
