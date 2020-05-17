import { Component, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-sorting-algorithms',
  templateUrl: './sorting-algorithms.component.html',
  styleUrls: ['./sorting-algorithms.component.css']
})
export class SortingAlgorithmsComponent implements OnInit , OnDestroy{

  color = 'blue';
  isWorking = false;
  array;
  legacyArr;
  margin;
  height;
  width = 1000;
  counter = 0;
  min = 20;
  max = 100;
  quantity = 50;
  innerWidth;
  status;

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

  ngOnDestroy() {
    this.isWorking = false;
  }


  stop() {
    this.isWorking = false;
    this.counter = 0;
    this.status = '';
  }

  async bubbleSort(arr) {
    this.clear();
    this.createSvg(this.array);
    this.counter = 0;
    this.isWorking = true;
    this.status = 'Bubble sort is running';
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      if (this.isWorking === true) {
      for (let j = 0; j < arr.length - i ; j++) {
        if (this.isWorking === true) {

          this.counter++;
          if (arr[j] > arr[j + 1]) {
            await this.swap(j, j + 1, this.color, this.color);
            this.array = arr;
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        } else { break; }
      }
      await this.changeColor(arr.length - i - 1, 'green', 30);
      } else { break; }
      }
    this.isWorking = false;
    }


  async selectionSort(arr) {
    this.clear();
    this.createSvg(this.array);
    this.counter = 0;
    this.isWorking = true;
    this.status = 'Selection sort is running';
    const length = arr.length;

    for (let i = 0; i < length; i++) {
      if (this.isWorking === true) {
        let minIndex = i;
        let tempMin = arr[i];
        for (let j = i + 1; j < length; j++) {
          if (this.isWorking === true) {
          this.counter++;
          await this.changeColor(j, 'red', 10);

          if (arr[j] < tempMin) {
            await this.changeColor(minIndex, this.color, 10);
            minIndex = j;
            tempMin = arr[j];
            await this.changeColor(j, 'yellow', 10);
          }
          else {
            await this.changeColor(j, this.color, 10);
          }
        }
        else { break; }
        }

        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        await this.swap(i, minIndex, this.color, 'green');
        this.array = arr;
      } else { break; }
  }

    this.isWorking = false;
}

async insertion(arr) {
  this.clear();
  this.createSvg(this.array);
  this.counter = 0;
  this.isWorking = true;
  this.status = 'Insertion sort is running';
  const length = this.array.length;

  for (let i = 0; i < length; i++) {
      if (this.isWorking === true) {
      if (arr[i] < arr[0]) { // If current element is smaller than first element, swap them
        const first = arr[0];
        arr[0] = arr[i];
        arr[i] = first;
        await this.swap(0, i, 'green', 'green');
        this.array = arr;
        i--;
      } else {
      for (let j = i; j > 0; j--) {
        this.counter++;
        if (this.isWorking) {
        if (arr[j] < arr[j - 1]) {
          const temp = arr[j];
          arr[j] = arr[j - 1];
          arr[j - 1] = temp;
          await this.swap(j, j - 1, 'yellow', 'green');
          this.array = arr;
        } else {
          await this.changeColor(j, 'green', 30);
          break;
        }
        // tslint:disable-next-line: max-line-length
        // If previous element is smaller than the current element,so since left of this current element is sorted already,there is no smaller element than current element
      }
      else { break; }
    }
  }
  } else { break; }
  }

  this.isWorking = false;
  this.array = arr;
  console.log(arr);
}

  changeColor(el, color, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        d3.selectAll('#index' + el + '')
        .transition()
        .duration(0)
        .style('fill', color);
        resolve();
      }, delay);
    });

  }

  swap(el1, el2, color1, color2) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.isWorking === false) {
          reject();
        }
        else {
        d3.selectAll('#index' + el1 + '')
        .style('fill', 'red')
        .transition()
        .duration(0)
        .attr('x', this.x('' + el2 + '') )
        .attr('id', 'index' + (el2) + '')
        .style('fill', color1);

        d3.selectAll('#index' + el2 + '')
        .style('fill', 'red')
        .transition()
        .duration(0)
        .attr('x', this.x('' + el1 + '') )
        .attr('id', 'index' + (el1) + '')
        .style('fill', color2);
        resolve();
        }
      }, 50);
    });
  }

  clear() {
    d3.selectAll('#sort > *').remove();
  }

  createSvg(array) {
    this.initiateSvg(array);
  }

  private initiateSvg(array) {
      this.svg = d3.select('#sort')
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
    this.stop();
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
      this.legacyArr = arr;
    } else {
      this.array = arr;
      this.legacyArr = arr;
      this.clear();
      this.createSvg(arr);
    }
  }
}
