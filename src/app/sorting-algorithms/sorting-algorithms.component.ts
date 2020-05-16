import { Component, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-sorting-algorithms',
  templateUrl: './sorting-algorithms.component.html',
  styleUrls: ['./sorting-algorithms.component.css']
})
export class SortingAlgorithmsComponent implements OnInit {

  color = '#435591';
  array;
  margin;
  height;
  width = 1000;
  counter = 0;
  min = 20;
  max = 100;
  quantity = 50;
  innerWidth;

  private x: any;
  private y: any;
  private svg: any;

  constructor() { }

  ngOnInit(): void {
    this.clear();
    this.createArray(this.quantity, this.max, this.min, false);
    this.innerWidth = window.innerWidth;
    this.margin = { top: 20, right: (this.innerWidth / 20), bottom: 40, left: (this.innerWidth / 10) };
    this.width = (innerWidth / 1.2) - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
    this.createSvg(this.array);
  }

 

  async bubbleSort(arr) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i ; j++) {
          this.counter++;
          if (arr[j] > arr[j + 1]) {
            await this.swap(j, j + 1);
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      this.changeColor(arr.length - i - 1, 'green');
      }
    }


  async insertSort(arr) {

  }
  changeColor(el, color) {
    return new Promise(resolve => {
      setTimeout(() => {
        d3.selectAll('#index' + el + '')
        .style('fill', color);
      }, 300);
    })
    
  }

  swap(el1, el2) {
    return new Promise(resolve => {
      setTimeout(() => {
        d3.selectAll('#index' + el1 + '')
        .style('fill', 'red')
        .transition()
        .attr('x', this.x('' + el2 + '') )
        .attr('id', 'index' + (el2) + '')
        .style('fill', this.color);

        d3.selectAll('#index' + el2 + '')
        .style('fill', 'red')
        .transition()
        .attr('x', this.x('' + el1 + '') )
        .attr('id', 'index' + (el1) + '')
        .style('fill', this.color);
        resolve();
      }, 300);
    });
  }

  clear() {
    d3.selectAll('svg > *').remove();
  }

  createSvg(array) {
    this.initiateSvg(array);
  }

  private initiateSvg(array) {
      this.svg = d3.select('svg')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

      this.initiateX(array);
  }

  private initiateX(array) {

    const tempArr = [];
    for (let i = 0; i < array.length; i++) {
      tempArr.push('' + i + '');
    }
    // X axis
    this.x = d3.scaleBand()
    .domain(tempArr.map(d => d))
    .range([0, this.width]);

    this.initiateY(array);
    }

  private initiateY(array) {
      this.findMaxMin(array);

      this.y = d3.scaleLinear().domain([this.min - 5, this.max]).range([this.height, 0]);
      this.addRect(array);
    }

  private addRect(array) {
    let height;
    let add = 0;
    for (let i = 0; i < array.length; i++) {
    height =  340 - this.y(array[i]);

    if (this.array[i] === this.min) {
      add = 10;
    }
    this.svg
    .append('rect')
    .attr('id', 'index' + i + '')
    .attr('x', this.x('' + i + '') )
    .attr('y', this.y(array[i]))
    .attr('height', height )
    .attr('width', this.x.bandwidth() )
    .style('fill', this.color)
    .style('opacity', 0.5);

  }
}

findMaxMin(array) {
  this.max = array[0];
  this.min = array[0];

  for (let i = 0; i < array.length; i++) {
    if (array[i] > this.max ) {
      this.max = array[i];
    }
    if (array[i] < this.min) {
    this.min = array[i];
    }
  }
}

  createArray(n, max, min, isExists) {
    if (n < 20)  {
      n = 20;
      this.quantity = 20;
    }
    if (n > 5000) {
      n = 5000;
      this.quantity = 5000;
    }

    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr[i] = Math.floor(Math.random() * (max - min) + min);
    }

    arr[Math.floor(n / 2 )] = max;
    arr[Math.floor(n / 3)] = min;

    if (!isExists) {
      this.clear();
      this.array = arr;
    } else {
      this.array = arr;
      this.clear();
      this.createSvg(arr);
    }
  }
}
