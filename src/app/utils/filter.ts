import { NgModule, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], key: string, value: string): any {
    const keys = key.split("||");
    if (!value) {
      return items;
    }
    return items.filter((item) => {
      let match = false;
      keys.forEach((key) => {
        if (item[key].toLowerCase().indexOf(value.toLowerCase()) > -1) {
          match = true;
          return;
        }
      });
      return match;
    });
  }
}
