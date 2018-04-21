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
import { MessageBean } from '../model/broker/message-bean';

/**
 * states
 */
export interface AppState {
  feature: MessageState;
}

export interface MessageState {
  message: MessageBean;
}

/**
 * actions
 */
export class NewMessageAction implements ActionWithPayload<MessageBean> {
  readonly type = 'NewMessageAction';
  constructor(public payload: MessageBean) { }
}

export type AllMessagesActions = NewMessageAction;

/**
 * main store for this application
 */
@Injectable()
export class BrokerStoreService {

  private getMessage: MemoizedSelector<object, MessageBean>;

  /**
   * 
   * @param _store constructor
   */
  constructor(
    private _store: Store<MessageState>
  ) {
    this.getMessage = createSelector(createFeatureSelector<MessageState>('broker'), (state: MessageState) => state.message);
  }

  /**
   * select this store service
   */
  public message(): Store<MessageBean> {
    return this._store.select(this.getMessage);
  }

  /**
   * dispatch
   * @param action dispatch action
   */
  public dispatch(action: AllMessagesActions) {
    this._store.dispatch(action);
  }

  /**
   * metareducer (Cf. https://www.concretepage.com/angular-2/ngrx/ngrx-store-4-angular-5-tutorial)
   * @param state 
   * @param action 
   */
  public static reducer(state: MessageState = { message: new MessageBean() }, action: AllMessagesActions): MessageState {

    switch (action.type) {
      /**
       * message incomming
       */
      case 'NewMessageAction':
        {
          let newState = new MessageBean();
          newState.topic = action.payload.topic;
          try {
            newState.body = JSON.parse(action.payload.body);
          } catch (Exc) {
            newState.body = action.payload.body;
          }
          return {
            message: newState
          };
        }

      default:
        return state;
    }
  }
}
