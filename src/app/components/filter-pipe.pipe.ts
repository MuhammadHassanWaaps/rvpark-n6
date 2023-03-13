import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(items: any[], term: string): any {
    // I am unsure what id is here. did you mean title?
    return items.filter(item => item.title.indexOf(term) !== -1);
}

}
