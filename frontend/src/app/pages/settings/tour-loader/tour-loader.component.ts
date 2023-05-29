import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { TicketsService } from '../../../services/tickets/tickets.service';

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss'],
})

export class TourLoaderComponent implements OnInit {
  tourForm: FormGroup;
  tourImg: File;
  tmp: any;
  @ViewChild('imgEl') imgEl: ElementRef;
  @ViewChild('inputFileEl') inputFileEl: ElementRef;

  constructor(
    private readonly messageService: MessageService,
    private readonly ticketsService: TicketsService,
  ) {
  }

  ngOnInit(): void {
    this.tourForm = new FormGroup(
      {
        name: new FormControl('', {validators: Validators.required}),
        description: new FormControl('', [Validators.required, Validators.minLength(10)]),
        operator: new FormControl(),
        price: new FormControl(),
        img: new FormControl(),
      }
    )
  }

  createTour(form: NgForm) {
    const file = this.inputFileEl.nativeElement.files[0];
    if (!file) {
      alert('file is empty');
      return;
    }
    const formObj = form.value;
    let formData = new FormData();
    if (typeof formObj === 'object') {
      for (let key in formObj) {
        formData.append(key, formObj[key]);
      }
    }
    formData.append('img', file);
    this.ticketsService.createTour(formData)
      .subscribe(
        (data) => {
          console.log(data)
          this.messageService.add({
            severity: 'success',
            summary: `Тур успешно загружен (${data.img})`,
          })
        }
      )

  }

  selectFile(ev: any) {
    if (!(ev.target.files.length > 0)) {
      alert('files is empty')
      return;
    }

    this.tourImg = ev.target.files[0];
    let fr = new FileReader();
    console.log(this.imgEl)
    fr.onload = () => {
      this.imgEl.nativeElement.src = fr.result as string;
    }
    fr.readAsDataURL(this.tourImg);
  }
}
