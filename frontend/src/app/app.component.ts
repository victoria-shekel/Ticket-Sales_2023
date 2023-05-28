import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth/auth.service';
import { ObservableExampleService } from './services/testing/observable-example.service';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Ticket-Sales 2023';
  constructor(private authService:AuthService,
              private observableService: ObservableExampleService,
              private config:ConfigService
  ) { }

  ngOnInit(): void {
    const mySubject = this.observableService.getSubject();
    mySubject.next('subject val1')
    mySubject.next('subject val2')

    const myBehavior = this.observableService.getBehavior();
    myBehavior.next('behavior val1');
    myBehavior.next('behavior val2');
  }
}
