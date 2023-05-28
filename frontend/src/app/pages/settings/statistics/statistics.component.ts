import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../../services/settings/settings.service';
import { IStatisticUser } from '../../../models/IStatistic';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  headers = [ 'Логин', 'Имя', 'Город','Компания' ]
  statistics: IStatisticUser[] = [];

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.getStatisticUser()
      .subscribe((data) => {
        this.statistics = data;
      });
  }
}
