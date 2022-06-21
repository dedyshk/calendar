import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { __values } from 'tslib';
import { DateService } from '../shared/date.service';
  
interface Day{
  value:moment.Moment
  active: boolean // показывает сегодня
  disabled:boolean //В дргом месяцу 
  selected:boolean //День который мы вабрали 
}

interface Week{
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendar:Week[] | undefined

  constructor(private dateSerice:DateService) { }

  ngOnInit() {
    this.dateSerice.date.subscribe(this.generate.bind(this));    //При изменении поля вызывается определенный метод
  }

  generate(now:moment.Moment){
    const startDay = now.clone().startOf('month').startOf('week')
    const endDay = now.clone().endOf('month').endOf('week')

    const date = startDay.clone().subtract(1,'day')

    const calendar = []

    while(date.isBefore(endDay,'day'))
    {
      calendar.push
      ({
        days:Array(7)
         .fill(0)
         .map(()=> {
            const value = date.add(1,'day').clone()
            const active =moment().isSame(value,'date')
            const disabled = now.isSame(value,'month')
            const selected = now.isSame(value,'date')

              return{
               value,active,disabled,selected
              }
            })
     })
    }
    this.calendar = calendar
  }
  select(day:moment.Moment){
    this.dateSerice.changeDate(day);
  }
}
