export interface Product   {
  _id: string,
  subcategoryId: string,
  productId: string,
  name: string,
  description: string,
  images: Array<string>,
  price: number,
  quantity: number,
  quantitySold: number,
  averageRating: number,
  totalRatings: number
}