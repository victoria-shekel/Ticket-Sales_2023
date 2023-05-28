import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IConfig} from "../../models/IConfig";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static config: IConfig;
  constructor(private httpClient: HttpClient ) { }

  configLoad (): void {
    const jsonFile = `assets/config/config.json`;
    this.httpClient.get<IConfig>(jsonFile).subscribe(
      (data)=>{
        if (data && typeof(data) === 'object'){
          ConfigService.config = data;
          console.log('--CONFIGURATION_LOADED--',ConfigService.config)
        }
      },
      (err)=>{
        console.log(err);
      })
  }

  loadPromise(): Promise<any> {
    const jsonFile = `assets/config/config.json`;
    const configPromise = new Promise<IConfig>((resolve, reject) => {
      this.httpClient.get<IConfig>(jsonFile).toPromise().then((response) => {
        if (response && typeof (response) === 'object') {
          ConfigService.config = response;
          const config = ConfigService.config;
          if (config) {
            // set origin host
            resolve(config);
          } else {
            reject('Ошибка при инициализации конфига - неверный формат ' + config);
          }
        } else {
          reject('Ошибка при инициализации конфига - неверный формат ответа ' + response);
        }
      }).catch((response: any) => {
        reject(`Ошибка при загрузки файла '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });

    const promiseArr = [configPromise];
    return Promise.all(promiseArr);
  }
}
