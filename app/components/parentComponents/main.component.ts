import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: ` 
                <header></header>
                <div class="container">
                    <router-outlet></router-outlet>
                </div>
                `
})
export class MainComponent {
}