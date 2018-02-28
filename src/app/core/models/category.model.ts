export interface Category   {
    path: string,
    name: string,
    subcategories: Category[]
}