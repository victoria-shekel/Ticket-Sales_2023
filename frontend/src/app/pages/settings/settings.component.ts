import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {AuthService} from "../../services/auth/auth.service";
import {ObservableExampleService} from "../../services/testing/observable-example.service";
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {SettingsService} from "../../services/settings/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  isTouched:boolean = false;
  subjectForSubscribe = new Subject();

  constructor(
    private authService:AuthService,
    private messageService:MessageService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.settingsService.loadUserSettings()
      .pipe(takeUntil(this.subjectForSubscribe))
      .subscribe((data)=>{
        console.log('settingsDataObservable',data);
    });
    this.settingsService.getSettingsSubjectObservable()
      .pipe(takeUntil(this.subjectForSubscribe))
      .subscribe(
        (data)=>{
          console.log('settingsDataSubject',data);
        });
  }

  ngOnDestroy(): void {
    this.subjectForSubscribe.next(true);
    this.subjectForSubscribe.complete();
  }
}
