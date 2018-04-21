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

import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { MatSnackBar } from '@angular/material';
import { Message } from 'primeng/primeng';

import { JarvisDataDeviceService } from '../../service/jarvis-data-device.service';
import { JarvisDataViewService } from '../../service/jarvis-data-view.service';

/**
 * data model
 */
import { DeviceBean } from '../../model/device-bean';
import { ViewBean } from '../../model/view-bean';
import { Oauth2Bean, MeBean } from '../../model/security/oauth2-bean';
import { Store } from '@ngrx/store/src/store';
import { ViewStoreService, LoadViewsAction, UpdateDeviceAction } from '../../store/view.store';

@Component({
  selector: 'app-jarvis-desktop',
  templateUrl: './jarvis-desktop.component.html',
  styleUrls: ['./jarvis-desktop.component.css']
})
export class JarvisDesktopComponent implements OnInit {

  public viewStream: Store<Array<ViewBean>>;
  myViews: ViewBean[];

  constructor(
    private snackBar: MatSnackBar,
    private jarvisDataDeviceService: JarvisDataDeviceService,
    private jarvisDataViewService: JarvisDataViewService,
    private viewStoreService: ViewStoreService
  ) {
    this.viewStream = this.viewStoreService.views()

    this.viewStream.subscribe(
      (element: ViewBean[]) => {
        this.myViews = element;
        // Analyze all devices and ask for render it if a render device
        _.each(this.myViews, (view) => {
          _.each(view.devices, (device) => {
            if (device.template != "" && device.render == null) {
              console.error("=device",device)
              jarvisDataDeviceService.Task(device.id, 'render', {})
              .subscribe(
                (render: any) => {
                  // fix view data
                  device.render = render
                  this.viewStoreService.dispatch(new UpdateDeviceAction(device))
                },
                (error: any) => {
                  console.error("Error while loading views");
                },
                () => {
                });
                      }
          })
        })
      },
      error => {
        console.error(error);
      },
      () => {
      }
    );

  }

  ngOnInit() {
    /**
     * load views from store
     */
    this.loadViews();
  }

  /**
   * get profile
   */
  public loadViews(): void {
    /**
     * load views
     */
    this.jarvisDataViewService.Task('*', 'GET', {})
      .subscribe(
      (data: ViewBean[]) => {
        // fix view data
        this.viewStoreService.dispatch(new LoadViewsAction(data))
      },
      (error: any) => {
        console.error("Error while loading views");
      },
      () => {
      });
  }

  /**
   * implement touch on device
   * @param device 
   */
  private touch(device: DeviceBean): void {
    this.jarvisDataDeviceService.Task(device.id, "execute", {})
      .subscribe(
      (data: any) => {
        /**
         * notify snackbar
         */
        this.snackBar.open('Touch', device.name, {
          duration: 2000,
        });
      }
      );
  }
}
