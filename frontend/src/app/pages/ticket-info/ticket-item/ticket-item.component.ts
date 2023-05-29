import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ITour } from '../../../models/ITour';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../../models/IUser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { TicketsService } from '../../../services/tickets/tickets.service';
import { PopupComponent } from './popup/popup.component';
import { IOrder } from '../../../models/IOrder';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss'],
})
export class TicketItemComponent implements OnInit, AfterViewInit, OnDestroy {

  ticket?: ITour;
  user: IUser | null;
  userForm: FormGroup;
  nearestTours?: ITour[];
  searchText: any;
  @ViewChild('ticketSearchInput') ticketSearchInput: ElementRef;
  @ViewChild('popup') popup: PopupComponent;

  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();

  ticketRestSub: Subscription;
  searchTicketSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ticketsService: TicketsService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();

    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(),
      birthDay: new FormControl(),
      age: new FormControl(),
      citizen: new FormControl(),
    });


    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId) {
      this.initTicketInfo(paramValueId);
    }
  }

  ngAfterViewInit(): void {
    const fromEventObserver = fromEvent(this.ticketSearchInput?.nativeElement, 'keyup', {passive: true});
    this.searchTicketSub = fromEventObserver
      .subscribe(() => {
        this.initSearchNearerTour(this.searchText);
        this.popup.onChange(this.searchText);
      })

    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);

  }

  ngOnDestroy(): void {
    if (this.searchTicketSub) this.searchTicketSub.unsubscribe();
  }

  initTicketInfo(id: string) {
    this.ticketsService.getTicketInfoById(id)
      .subscribe(data => {
        const [rTicket, rTours] = data;
        this.ticket = rTicket;
        this.nearestTours = rTours;
      })
  }

  initSearchNearerTour(searchText: string) {
    if (!searchText && this.ticket?._id) {
      this.initTicketInfo(this.ticket?._id);
      return;
    }

    if (this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }
    this.ticketRestSub = this.ticketsService.getToursByName(searchText)
      .subscribe((data) => {
        this.nearestTours = data;
      })
  }

  onSubmit(): void {
    console.log(this.userForm)
  }

  onSelectDate(event: any) {
    console.log(event.toLocaleString())
  }


  initTour(): void {
    const userData = this.userForm.getRawValue();
    const userId = this.userService.getUser()?.id || null;
    const postData: IOrder = {
      age: userData.age,
      birthDay: userData.birthDay,
      cardNumber: userData.cardNumber,
      tourId: this.ticket?._id || null,
      userId: userId,
    };
    this.ticketsService.sendTour(postData).subscribe(r => {
      console.log('response init tour', r);
    });
  }

  search(txt: string) {
    this.searchText = txt;
  }
}
