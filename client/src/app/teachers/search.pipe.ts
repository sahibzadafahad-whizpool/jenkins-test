import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

// search by teacher phone num or cnic
export class TeachersSearchPipe implements PipeTransform {
  transform(items: any[], filterdata: string): any[] {
    if (!items) {
      return [];
    }
    if (!filterdata) {
      return items;
    }

    filterdata = filterdata.toString();
    return items.filter(searchValue => {
      const rVal =
        JSON.stringify(searchValue.phone_num).includes(filterdata) ||
        JSON.stringify(searchValue.teacher_cnic).includes(filterdata);
      return rVal;
    });
  }
}
