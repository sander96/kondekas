import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-sidenav',
  moduleId: module.id,
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoriesService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }
}
