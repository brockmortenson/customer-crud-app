import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'shortDate',
  standalone: true
})
export class ShortDatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const formattedValue = DateTime.fromISO(value).toLocal().toFormat('M/d/yyyy HH:mm a');
    return formattedValue;
  }

}
