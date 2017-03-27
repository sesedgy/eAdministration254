import { Component } from '@angular/core';

@Component({
    selector: 'main-component',
    template: ` 
                <header></header>
                <div class="main-container ace-save-state" id="main-container">
                <div id="sidebar" class="sidebar responsive ace-save-state">                    
                    <sidebar></sidebar>
                </div>
                    <div class="main-content">
                        <div class="main-content-inner">
                            <div class="page-content">
                                <router-outlet></router-outlet>
                            </div>
                        </div>
                    </div>
                </div>
                `
})
export class MainComponent {
}