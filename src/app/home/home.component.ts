import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  margin = { top: 20, right: 40, bottom: 40, left: 120 };
  width = 880 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;
  value;
  command;
  min = 1;
  max = 100;
  index;
  status = '';
  delay = 1;

  array;

  quantity = 20;

  private x: any;
  private y: any;
  private svg: any;


  constructor() { }

  ngOnInit() {
    this.createArray();
    this.createSvg();
  }

  createSvg() {
    this.initiateSvg();
  }


  async insert() {
    if(this.command === 'delete') {

      d3.selectAll('#index' + (this.index) + '')
      .transition()
      .style('fill', '#435591');
    }
    if (this.array[this.index] && this.value) {
    this.array.push(0);

    d3.selectAll('svg > *').remove();
    this.createSvg();

    this.command = 'insert';
    
    await this.pushItems(this.array.length - 2, this.array.length - 1);

    for (let i = this.array.length - 2 ; i >= this.index; i--) {
        this.array[i + 1] = this.array[i];
        await this.pushItems(i - 1, i);
      }

    this.array[this.index] = this.value;
    d3.selectAll('svg > *').remove();

    this.createSvg();
    this.status =  this.value + ' has added into the array at index ' + this.index + '.Time complexity is 0(n).Because we have to shift all the indexes one to right after' + this.index + '.(Worst Case)';
    } else {
      this.status = 'You have to provide a value and valid index for insertion.';
    }
  }

  pushItems(el1, el2) {
    return new Promise(resolve => {
      setTimeout(() => {
        d3.selectAll('#index' + el1 + '')
          .style('fill', 'red')
          .transition()
          .attr('x', this.x('' + el2 + '') )
          .attr('id', 'index' + (el2) + '')
          .style('fill', 'green');

        resolve();
      }, 300);
    });
  }


  delete() {
    if (this.command === 'push') {
      d3.selectAll('#index' + (this.array.length - 1) + '')
      .transition()
      .style('fill', '#435591');
    }

    if (this.command === 'insert') {
      d3.selectAll('rect')
      .transition()
      .style('fill', '#435591');
    }

    this.command = 'delete';
    if (this.array[this.index]) {
      const item = this.array[this.index];
      this.shiftItems(this.index);
      this.status = item + ' has deleted from the array at index ' + this.index + '.Time complexity is O(n).Because we have to shift all the indexes one to left after '
      + this.index + '.' + '(Worst Case)';

    }
    else  {
      this.status = 'There is no element to delete at the index';
  }
}



async shiftItems(index) {
  let count = 0;
  for (let i = index; i < this.array.length - 1; i++) {
      this.array[i] = this.array[i + 1];
      await this.swapItems(this.index , i + 1, count++);
    }


  // tslint:disable-next-line: no-unused-expression
  new Promise(resolve => {
  setTimeout(() => {
    d3.selectAll('svg > *').remove();
    this.createSvg();
  }, 300);
  this.array.pop();
});

}

swapItems(el1, el2, count) {
  return new Promise(resolve => {
    setTimeout(() => {
      el1 += count;
      d3.selectAll('#index' + el1 + '')
        .style('fill', 'red')
        .transition()
        .attr('x', this.x('' + el2 + '') )
        .attr('id', 'index' + (el2) + '')
        .style('fill', 'green');

      d3.selectAll('#index' + el2 + '')
        .style('fill', 'red')
        .transition()
        .attr('x', this.x('' + el1 + '') )
        .attr('id', 'index' + (el1) + '')
        .style('fill', 'green');
      resolve();
    }, 300);
  });
}



  createArray() {
    this.command = 'create';
    const newArray = [];
    for (let i = 0; i < this.quantity; i++) {
       newArray.push(Math.floor(Math.random() * (this.max - this.min) + this.min));
    }

    this.array = newArray;
    d3.selectAll('svg > *').remove();

    this.createSvg();
  }

  pushArray() {
    this.delay = 1;
    this.command = 'push';
    if (this.value) {
    this.array.push(this.value);

    d3.selectAll('svg > *').remove();
    this.createSvg();

    this.status = this.value + ' has just pushed into the array.Time complexity: O(1).Because we only add one value to the end of the array.';
    }
  }


  popArray() {
    this.command = 'pop';
    if (this.array.length === 0) {
      this.status = 'There is no element in the array to pop';
      return 0;
    }
    d3.selectAll('#index' + (this.array.length - 1) + '')
        .style('fill', 'red')
        .transition()
        .delay(599)
        .remove();

    this.delay = 1200;

    const popItem = this.array.pop();


    setTimeout(() => {
      d3.selectAll('svg > *').remove();
    }, 1200);

    this.createSvg();

    this.status = popItem + ' has just popped out of the array.Time complexity: O(1).Because we only pop one value from the end of the array and delete it';
  }


  private initiateSvg() {
    setTimeout(() => {
      this.svg = d3.select('svg')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

      this.initiateX(this.array);
    }, this.delay);
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
    this.svg
    .append('g')
    .attr('transform', 'translate(0,' + this.height + ')')
    .call(d3.axisBottom(this.x));

    // X Label
    this.svg.append('text')
    .attr('text-anchor', 'end')
    .attr('x', this.width)
    .attr('y', this.height + this.margin.top + 20)
    .text('Indexes');

    this.initiateY(this.array);

    }

    private initiateY(array) {
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

      this.y = d3.scaleLinear().domain([this.min, this.max]).range([this.height, 0]);
      this.svg.append('g')
      .call(d3.axisLeft(this.y));

      this.svg.append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', -this.margin.left + 20)
      .attr('x', -this.margin.top)
      .text('Values');
      this.addRect(this.array);
    }

  private addRect(array) {
      let color = '#435591';
      let height;
      for (let i = 0; i < array.length; i++) {
      height =  340 - this.y(array[i]);

      color = '#435591';
      // tslint:disable-next-line: one-variable-per-declaration

      if (this.command === 'push' && this.array.length - 1 === i) {
        color = '#d70000';
      }

      else if (this.command === 'insert' && this.index === i) {
        color = '#d70000';
      }

      if (this.array[i] === this.min) {
        height = 5;
      }

      this.svg
      .append('rect')
      .attr('id', 'index' + i + '')
      .attr('x', this.x('' + i + '') )
      .attr('y', this.y(array[i]))
      .attr('height', height )
      .attr('width', this.x.bandwidth() )
      .style('fill', color)
      .style('opacity', 0.5);

    }

  }

}
