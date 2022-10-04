import { Pipe, PipeTransform } from '@angular/core';
import { CategoriesService } from '@money-tracker/common';
import { AsyncPipe } from '@angular/common';
import { map, take } from 'rxjs';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  constructor(
    private categoriesService: CategoriesService,
    private asyncPipe: AsyncPipe
  ) {}

  transform(categoryId: string, ...args: unknown[]): unknown {
    return this.categoriesService.categories$.pipe(
      map((categories) => {
        return (
          categories.find((category) => category.id === categoryId)?.name || ''
        );
      }),
      take(1)
    );
  }
}
