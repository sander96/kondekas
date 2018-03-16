import {Component, OnInit} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Category } from "../../core/models/category.model";
import { Observable } from "rxjs/Observable";
import { TranslateService } from "@ngx-translate/core";
import { NgForm } from "@angular/forms";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {catchError} from "rxjs/operators";

declare var $: any;

@Component({
  moduleId: module.id,
  templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnInit{
  categories: Observable<Category[]>;
  selectedCategory: Category;
  selectedSubcategory: Category;

  constructor(private http: HttpClient,
              private translateService: TranslateService) {}

  ngOnInit(): void {
    this.categories = this.getCategories();
  }

  private getCategories(): Observable<Category[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept-Language': this.translateService.currentLang
      })
    };

    return this.http.get<Category[]>('api/category', httpOptions);
  }

  newProduct: InternalProduct = new InternalProduct();
  thumbnail: File;
  additionalImages: Array<File> = [];

  addProduct(form: NgForm) {
    if (form.valid) {
      let categoryPath = encodeURIComponent(this.selectedCategory.path);
      let subcategoryPath = encodeURIComponent(this.selectedSubcategory.path);
      let productPath = encodeURIComponent(this.newProduct.en_name);

      let productUploadUrl = `api/product/${categoryPath}/${subcategoryPath}/${productPath}`;

      const formData: any = new FormData();
      const thumbnail: any = this.thumbnail;
      const files: Array<File> = this.additionalImages;
      console.log(files);

      formData.append('thumbnail', thumbnail, thumbnail.name);

      for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
      }

      for (let property in this.newProduct) {
        if (this.newProduct.hasOwnProperty(property)) {
          formData.append(property, this.newProduct[property]);
        }
      }

      this.http.post<any>(productUploadUrl, formData)
          .pipe(catchError(this.handleError))
          .subscribe((res) => {
            console.log(JSON.stringify(res));
          });

      this.newProduct = new InternalProduct();
      form.reset();
    }
  }

  onThumbnailChangeEvent(fileInput: any) {
    this.thumbnail = <File>fileInput.target.files[0];
  }

  onAdditionalFileChangeEvent(fileInput: any) {
    this.additionalImages = <Array<File>>fileInput.target.files;
  }

  newCategory: InternalCategory = new InternalCategory();

  addCategory(form: NgForm) {
    if (form.valid) {
      let categoryUrl = encodeURIComponent(this.newCategory.en);

      let body = new URLSearchParams();
      body.set('en_name', this.newCategory.en);
      body.set('et_name', this.newCategory.et);

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };

      this.http.post<any>('api/category/' + categoryUrl, body.toString(), httpOptions)
          .pipe(catchError(this.handleError))
          .subscribe(response => {
            console.log(JSON.stringify(this.newCategory));
            if (this.newCategory.subcategories && this.newCategory.subcategories.length > 0) {
              this.uploadModalSubcategories(categoryUrl, form);
            } else {
              $("#addCategoryModal").modal("hide");
              this.categories = this.getCategories();
              form.reset();
            }
          });
    } else {
      console.log("Form invalid.");
    }
  }

  private uploadModalSubcategories(categoryUrl: string, form: NgForm) {
    this.newCategory.subcategories.forEach((subCat, index) => {
      let subcategoryUrl = encodeURIComponent(subCat.en);

      let body = new URLSearchParams();
      body.set('en_name', subCat.en);
      body.set('et_name', subCat.et);

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };

      this.http.post<any>("/api/category/" + categoryUrl + "/" + subcategoryUrl,
                                                             body.toString(), httpOptions)
          .pipe(catchError(this.handleError))
          .subscribe(() => {
            if (index === this.newCategory.subcategories.length - 1) {
              $("#addCategoryModal").modal("hide");
              this.categories = this.getCategories();
              form.reset();
            }
          });
    });
  }

  resetModal() {
    this.newCategory.et = undefined;
    this.newCategory.en = undefined;
    this.newCategory.subcategories = [];
  }

  addSubCategoryFromModal() {
    this.newCategory.subcategories.push(new InternalCategory());
  }

  removeSubCategoryFromModal(index: number) {
    this.newCategory.subcategories.splice(index, 1);
  }

  newSubCategory: InternalCategory = new InternalCategory();

  addSubCategory(form: NgForm) {
    if (form.valid && this.selectedCategory) {
      let uploadUrl = encodeURIComponent(this.selectedCategory.path) + "/";
      uploadUrl += encodeURIComponent(this.newSubCategory.en);

      let body = new URLSearchParams();
      body.set('en_name', this.newSubCategory.en);
      body.set('et_name', this.newSubCategory.et);

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };

      this.http.post<any>("/api/category/" + uploadUrl,
          body.toString(), httpOptions)
          .pipe(catchError(this.handleError))
          .subscribe(() => {
            $("#addSubCategoryModal").modal("hide");
            this.categories = this.getCategories();
            this.newSubCategory = new InternalCategory();
            form.reset();
          });
    }
  }

  parseName(urlEncodedName: string): string {
    return decodeURIComponent(urlEncodedName);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
        'Something bad happened; please try again later.');
  }
}

class InternalCategory {
  et: string = "";
  en: string = "";
  subcategories: InternalCategory[] = [];
}

class InternalProduct {
  et_name: string;
  en_name: string;
  et_description: string;
  en_description: string;
  price: number;
  quantity: number;
}