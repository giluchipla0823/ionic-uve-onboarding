
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-basic',
  templateUrl: './calendar-basic.page.html',
  styleUrls: ['./calendar-basic.page.scss'],
})
export class CalendarBasicPage implements OnInit {

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  eventSource: Array<any> = [];
  viewTitle: string;
  isToday: boolean;
  calendar: any;
  cellHeight: number;

  constructor(
    private host: ElementRef,
  ) { }

  ngOnInit() {
    this.settingCalendar();
  }

  ngAfterViewInit(): void {
    const cellHeightPropertyValue = getComputedStyle(this.host.nativeElement).getPropertyValue('--week-calendar-cell-height') || '100';

    this.cellHeight = Number(cellHeightPropertyValue.replace(/[^0-9]/g, ''));
  }

  loadEvents(): void {
    this.eventSource = this.createRandomEvents();
  }

  onViewTitleChanged(title: string): void {
    console.log('onViewTitleChanged', { title });
    this.viewTitle = title;
  }

  onEventSelected(event: any): void {
    console.log(
      'Event selected:' +
      event.startTime +
      '-' +
      event.endTime +
      ',' +
      event.title
    );
  }

  changeMode(mode: CalendarMode): void {
    this.calendar.mode = mode;
  }

  slidePrev(): void {
    this.myCal.slidePrev();
  }

  slideNext(): void {
    this.myCal.slideNext();
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    console.log(
      'Selected time: ' +
      ev.selectedTime +
      ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) +
      ', disabled: ' +
      ev.disabled
    );

    console.log(ev.events);
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createRandomEvents() {
    const events = [];

    const appointments = [
      {
        title: 'Event 1',
        startTime: "2022-12-12T14:30:00.000Z",
        endTime: "2022-12-12T18:30:00.000Z",
        allDay: false
      },
      {
        title: 'Event 2',
        startTime: "2022-12-13T11:00:00.000Z",
        endTime: "2022-12-13T11:30:00.000Z",
        allDay: false
      },
      {
        title: 'Event 3',
        startTime: "2022-12-13T11:30:00.000Z",
        endTime: "2022-12-13T12:00:00.000Z",
        allDay: false
      },
    ]

    appointments.forEach(item => {
      const { title, allDay, startTime, endTime } = item;
      const { startOffset, endOffset } = this.getCalculateOffsetEvent(item);

      events.push({
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        allDay,
        startOffset,
        endOffset
      });
    });

    return events;
  }

  onRangeChanged(ev: any) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
  }

  markDisabled = (date: Date) => {
    const current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  getNameDate(date: string) {
    return moment(date).format('dddd');
  }

  getNumberDate(date: string) {
    return moment(date).format('D');
  }

  getStylesWeekviewEvent(displayEvent: any, hourParts: number) {
    const event = displayEvent.event;

    displayEvent.startOffset = event.startOffset;
    displayEvent.endOffset = event.endOffset;

    const { startIndex, endIndex, overlapNumber, startOffset, endOffset, position } = displayEvent;

    const calculateTop = (this.cellHeight * startOffset / hourParts) + (startOffset === 0 ? 2 : 1);
    const calculateHeight = (this.cellHeight * (endIndex - startIndex - (endOffset + startOffset) / hourParts)) - (startOffset === 0 ? 0 : 4);

    return {
      top: calculateTop + 'px',
      left: 100 / overlapNumber * position + '%',
      width: 100 / overlapNumber + '%',
      height: calculateHeight + 'px'
    }
  }

  private settingCalendar() {
    this.calendar = {
      mode: 'month' as CalendarMode,
      step: 60 as Step,
      currentDate: new Date(),
      dateFormatter: {
        formatMonthViewDay: function (date: Date) {
          return date.getDate().toString();
        },
        formatMonthViewDayHeader: function (date: Date) {
          return 'MonMH';
        },
        formatMonthViewTitle: function (date: Date) {
          return 'testMT';
        },
        formatWeekViewDayHeader: function (date: Date) {
          return 'MonWH';
        },
        formatWeekViewTitle: function (date: Date) {
          return 'testWT';
        },
        formatWeekViewHourColumn: function (date: Date) {
          return 'testWH';
        },
        formatDayViewHourColumn: function (date: Date) {
          return 'testDH';
        },
        formatDayViewTitle: function (date: Date) {
          return 'testDT';
        },
      },
      lockSwipes: false,
      sliderOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        threshold: 50
      }
    };
  }

  private getCalculateOffsetEvent(event: any): any {
    const { startTime, endTime } = event;

    const startDate = new Date(startTime);
    const compareStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours());
    const endDate = new Date(endTime);
    const compareEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours());

    let startOffset = 0;
    let endOffset = 0;

    if (startDate.getTime() > compareStartDate.getTime()) {
      startOffset = ((startDate.getMinutes()) / 60);
    }

    if (endDate.getTime() > compareEndDate.getTime()) {
      endOffset = ((60 - endDate.getMinutes()) / 60);
    }

    return {
      startOffset,
      endOffset,
    }
  }

}
