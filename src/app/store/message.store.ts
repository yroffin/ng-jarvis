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
import { Message } from 'primeng/primeng';

/**
 * states
 */
export interface AppState {
  feature: MessageUiState;
}

export interface MessageUiState {
  msg: Message;
}

/**
 * actions
 */
export class NewUiMessageAction implements ActionWithPayload<Message> {
  readonly type = 'NewUiMessageAction';
  constructor(public payload: Message) { }
}

export type AllMessageUiActions = NewUiMessageAction;

/**
 * main store for this application
 */
@Injectable()
export class MessageStoreService {

  private getMessage: MemoizedSelector<object, Message>;

  /**
   * 
   * @param _store constructor
   */
  constructor(
    private _store: Store<MessageUiState>
  ) {
    this.getMessage = createSelector(createFeatureSelector<MessageUiState>('message'), (state: MessageUiState) => state.msg);
  }

  /**
   * select this store service
   */
  public message(): Store<Message> {
    return this._store.select(this.getMessage);
  }

  /**
   * dispatch
   * @param action dispatch action
   */
  public dispatch(action: AllMessageUiActions) {
    this._store.dispatch(action);
  }

  /**
   * metareducer (Cf. https://www.concretepage.com/angular-2/ngrx/ngrx-store-4-angular-5-tutorial)
   * @param state 
   * @param action 
   */
  public static reducer(state: MessageUiState = { msg: {} }, action: AllMessageUiActions): MessageUiState {

    switch (action.type) {
      /**
       * message incomming
       */
      case 'NewUiMessageAction':
        {
          let newState = <Message>{};
          newState.id = action.payload.id;
          newState.severity = action.payload.severity;
          newState.summary = action.payload.summary;
          newState.detail = action.payload.detail;
          return {
            msg: newState
          };
        }

      default:
        return state;
    }
  }
}
