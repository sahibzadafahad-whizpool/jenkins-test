import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

// search by student roll num or cnic
export class SearchPipe implements PipeTransform {
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
        JSON.stringify(searchValue.roll_num).includes(filterdata) ||
        JSON.stringify(searchValue.std_name).includes(filterdata);
      return rVal;
    });
  }
}
