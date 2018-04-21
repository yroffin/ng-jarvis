/* 
 * Copyright 2017 Yannick Roffin.
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

import { Injectable } from '@angular/core';
import { ActionReducer, Action, State } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import * as _ from 'lodash';

import { ActionWithPayload } from './action-with-payload';
import { ViewBean } from '../model/view-bean';
import { DeviceBean } from '../model/device-bean';

/**
 * states
 */
export interface AppState {
    feature: ViewState;
}

export interface ViewState {
    views: Array<ViewBean>;
}

/**
 * actions
 */
export class LoadViewsAction implements ActionWithPayload<Array<ViewBean>> {
    readonly type = 'LoadViewsAction';
    constructor(public payload: Array<ViewBean>) { }
}

export class UpdateDeviceAction implements ActionWithPayload<DeviceBean> {
    readonly type = 'UpdateDeviceAction';
    constructor(public payload: DeviceBean) { }
}

export type AllViewsActions = LoadViewsAction | UpdateDeviceAction;

/**
 * main store for this application
 */
@Injectable()
export class ViewStoreService {

    private getViews: MemoizedSelector<object, Array<ViewBean>>;

    /**
     * 
     * @param _store constructor
     */
    constructor(
        private _store: Store<ViewState>
    ) {
        this.getViews = createSelector(createFeatureSelector<ViewState>('view'), (state: ViewState) => state.views);
    }

    /**
     * select this store service
     */
    public views(): Store<Array<ViewBean>> {
        return this._store.select(this.getViews);
    }

    /**
     * dispatch
     * @param action dispatch action
     */
    public dispatch(action: AllViewsActions) {
        this._store.dispatch(action);
    }

    /**
     * metareducer (Cf. https://www.concretepage.com/angular-2/ngrx/ngrx-store-4-angular-5-tutorial)
     * @param state 
     * @param action 
     */
    public static reducer(state: ViewState = { views: new Array<ViewBean>() }, action: AllViewsActions): ViewState {

        switch (action.type) {
            /**
             * message incomming
             */
            case 'LoadViewsAction':
                {
                    return {
                        views: action.payload
                    };
                }

            case 'UpdateDeviceAction':
                {
                    let views = new Array<ViewBean>()
                    _.each(state.views, (view) => {
                        _.each(view.devices, (device) => {
                            if(device.id = action.payload.id) {
                                console.error("device", device)
                                device.render = action.payload.render
                            }
                        })
                        views.push(view)
                    })
                    return {
                        views: views
                    };
                }

            default:
                return state;
        }
    }
}