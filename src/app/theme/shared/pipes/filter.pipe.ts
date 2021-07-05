import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../../models/iproduct';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(array: IProduct[], query: string | null = null): IProduct[] {
    if (query) {
      const queryLower = query.toLowerCase();
      return array.filter(x => x.nombre.toLowerCase().includes(queryLower))
    }
    return array;
  }

}
