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
        JSON.stringify(searchValue.parent_phoneNum).includes(filterdata) ||
        JSON.stringify(searchValue.parent_cnic).includes(filterdata);
      return rVal;
    });
  }
}
