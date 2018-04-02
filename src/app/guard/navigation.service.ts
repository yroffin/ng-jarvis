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

import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class NavigationGuard implements CanActivate {

  protected current: ActivatedRouteSnapshot;

  constructor() {
  }

  public canActivate(destination: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.current = destination;
    return true;
  }

  public getUrl(): string {
    return this.current.url[0].path;
  }
}
