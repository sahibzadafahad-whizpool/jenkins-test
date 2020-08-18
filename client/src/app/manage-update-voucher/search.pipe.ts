import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], filterdata: string): any[] {
    if (!items) return [];
    if (!filterdata) return items;

    filterdata = filterdata.toString();
    return items.filter(searchValue => {
      let rVal =
        JSON.stringify(searchValue.roll_num).includes(filterdata) ||
        JSON.stringify(searchValue.std_name).includes(filterdata) ||
        JSON.stringify(searchValue.fee_status).includes(filterdata);
      return rVal;
    });
  }
}
