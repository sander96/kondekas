import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'sidebar',
  moduleId: module.id,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoriesService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }
}
