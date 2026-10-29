import { camelCase } from "lodash-es";
import { message } from "../message.js";
console.log(camelCase(message));
import { Component, signal } from "@angular/core";
@Component({selector:"app-root",standalone:true,template:`<button (click)="count.set(count() + 1)">Count: {{count()}}</button>`})
export class AppComponent { count = signal(0); }
