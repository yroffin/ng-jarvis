/* 
 * Copyright 2016 Yannick Roffin.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import * as _ from 'lodash';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-jarvis-graph',
  templateUrl: './jarvis-graph.component.html',
  styleUrls: ['./jarvis-graph.component.css']
})
export class JarvisGraphComponent implements OnInit, AfterViewInit {

  protected _nodes: any;
  protected _edges: any;

  /**
   * internal
   */

  constructor(
  ) {
  }

  /**
   * init component
   */
  ngOnInit() {
  }

  /**
   * init component
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.update()
    }, 1000)
  }

  @Input() get nodes(): any[] {
    return this._nodes;
  }

  set nodes(val: any[]) {
    this._nodes = val;
  }

  @Input() get edges(): any[] {
    return this._edges;
  }

  set edges(val: any[]) {
    this._edges = val;
  }

  private update() {

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
      nodes: this._nodes,
      edges: this._edges
    };
    var options = {
      nodes: {
        shape: 'dot',
        size: 10
      }
    };
    var network = new Network(container, data, options);
  }

}
