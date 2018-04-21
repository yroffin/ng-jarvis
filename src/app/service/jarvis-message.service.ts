import { Injectable } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Message } from 'primeng/primeng';
import { MessageStoreService, NewUiMessageAction } from '../store/message.store';

@Injectable()
export class JarvisMessageService {

  constructor(
    private messageStoreService: MessageStoreService
  ) {

  }

  /**
   * push a new message
   * @param message
   */
  public push(message: Message): void {
    this.messageStoreService.dispatch(new NewUiMessageAction({
      id: message.id,
      detail: message.detail,
      summary: message.summary,
      severity: message.severity
    }))
  }
}
