import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'shortDate',
  standalone: true
})
export class ShortDatePipe implements PipeTransform {

  transform(value: string | DateTime): string {
    if (!value) {
      return '';
    }

    const format = 'M/d/yyyy h:mm a';
    const formattedValue = typeof value === 'string' ? DateTime.fromISO(value).toLocal().toFormat(format) : value.toFormat(format);
    return formattedValue;
  }

}
