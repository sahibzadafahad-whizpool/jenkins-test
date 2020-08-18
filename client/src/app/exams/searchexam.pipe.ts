import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "examfilter"
})
export class SearchExamPipe implements PipeTransform {
  transform(items: any[], filterdata: string): any[] {
    if (!items) return [];
    if (!filterdata) return items;

    filterdata = filterdata.toString();
    return items.filter(searchValue => {
      let rVal =
        JSON.stringify(searchValue.exam_name).includes(filterdata) ||
        JSON.stringify(searchValue.exam_type).includes(filterdata);
      return rVal;
    });
  }
}
