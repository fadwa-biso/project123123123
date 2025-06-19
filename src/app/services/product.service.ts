import {Injectable} from '@angular/core'; //injectable to allow this service to be injected into components
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{ Observable } from 'rxjs';       //observable handling asynchoronous data
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn:'root'             //root means this service is available throughout the application
})

export class ProductService{

private apiUrl = environment.apiUrl;
private productsApiUrl=this.apiUrl+'/products';
  constructor(private http: HttpClient) { }       //injecting HttpClient to make HTTP requests

  getAllProducts(){//async function to fetch all products
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(this.productsApiUrl, { headers });
  }

  getProductById(id: string): Observable<Product> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Product>(`${this.productsApiUrl}/${id}`, { headers });
  }

  createProduct(product:Product): Observable<Product>{
    return this.http.post<Product>(this.productsApiUrl,product);
  }

  updateProductById(id:string, product: Product):Observable<Product>{
    return this.http.put<Product>(`${this.productsApiUrl}/${id}`,product);
  }

  deleteProductById(id:string):Observable<any>{
    return this.http.delete(`${this.productsApiUrl}/${id}`);
  }

  getRelatedProducts(productId: string): Observable<Product[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(`${this.productsApiUrl}/related/${productId}`, { headers });
  }

  getFeaturedProducts(): Observable<Product[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(`${this.productsApiUrl}/featured`, { headers });
  }

  // Add more products to the database
  seedMoreProducts(): Observable<any> {
    const moreProducts = [
      // Bedroom Furniture
      {
        name: "Victorian Mahogany Four-Poster Bed",
        price: 2899.99,
        description: "Magnificent mahogany four-poster bed with intricate carved details and luxurious velvet canopy. Features hand-carved posts and ornate headboard.",
        category: "bedroom",
        quantity: 3,
        images: ["https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
        featured: true
      },
      {
        name: "Antique Victorian Wardrobe",
        price: 1899.99,
        description: "Spacious Victorian wardrobe with mirrored doors and intricate woodwork. Perfect for storing your finest garments in style.",
        category: "bedroom",
        quantity: 2,
        images: ["https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
        featured: false
      },
      {
        name: "Victorian Marble-Top Nightstand",
        price: 599.99,
        description: "Elegant nightstand with genuine marble top and carved wooden base. Features two drawers with brass handles.",
        category: "bedroom",
        quantity: 8,
        images: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        featured: false
      },
      {
        name: "Victorian Vanity Table with Mirror",
        price: 1299.99,
        description: "Beautiful vanity table with ornate mirror and multiple drawers. Perfect for your morning routine with Victorian elegance.",
        category: "bedroom",
        quantity: 4,
        images: ["https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        featured: true
      },

      // Living Room Furniture
      {
        name: "Victorian Chesterfield Sofa",
        price: 3299.99,
        description: "Classic Chesterfield sofa in rich burgundy leather with deep button tufting and rolled arms. A timeless piece of luxury.",
        category: "living-room",
        quantity: 2,
        images: ["https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
        featured: true
      },
      {
        name: "Victorian Wing-Back Armchair",
        price: 1599.99,
        description: "Stately wing-back armchair upholstered in fine velvet with carved wooden legs. Perfect for reading by the fireplace.",
        category: "living-room",
        quantity: 6,
        images: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        featured: false
      },
      {
        name: "Victorian Coffee Table with Marble Inlay",
        price: 899.99,
        description: "Ornate coffee table featuring marble inlay and carved wooden base. A centerpiece for any Victorian living room.",
        category: "living-room",
        quantity: 5,
        images: ["https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
        featured: false
      },
      {
        name: "Victorian Bookcase with Glass Doors",
        price: 2199.99,
        description: "Impressive bookcase with glass doors and adjustable shelves. Features intricate carved details and brass hardware.",
        category: "living-room",
        quantity: 3,
        images: ["https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        featured: true
      },

      // Dining Room Furniture
      {
        name: "Victorian Dining Table for 12",
        price: 4299.99,
        description: "Grand dining table that seats 12 people comfortably. Features extending leaves and ornate pedestal base.",
        category: "dining-room",
        quantity: 1,
        images: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        featured: true
      },
      {
        name: "Victorian Dining Chairs Set of 6",
        price: 1899.99,
        description: "Set of six matching dining chairs with upholstered seats and carved backs. Elegant and comfortable for formal dining.",
        category: "dining-room",
        quantity: 2,
        images: ["https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
        featured: false
      },
      {
        name: "Victorian China Cabinet",
        price: 2799.99,
        description: "Magnificent china cabinet with glass shelves and mirrored back. Perfect for displaying your finest china and crystal.",
        category: "dining-room",
        quantity: 2,
        images: ["https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
        featured: true
      },
      {
        name: "Victorian Sideboard with Wine Storage",
        price: 1999.99,
        description: "Elegant sideboard with built-in wine storage and serving surface. Features carved details and brass hardware.",
        category: "dining-room",
        quantity: 3,
        images: ["https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        featured: false
      },

      // Accessories
      {
        name: "Victorian Crystal Chandelier",
        price: 3599.99,
        description: "Stunning crystal chandelier with 12 lights and hundreds of crystal drops. Creates magnificent lighting for any room.",
        category: "accessories",
        quantity: 2,
        images: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        featured: true
      },
      {
        name: "Victorian Ornate Mirror",
        price: 799.99,
        description: "Large ornate mirror with gilded frame and intricate carved details. A statement piece for any Victorian interior.",
        category: "accessories",
        quantity: 8,
        images: ["https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
        featured: false
      },
      {
        name: "Victorian Grandfather Clock",
        price: 4999.99,
        description: "Majestic grandfather clock with Westminster chimes and brass pendulum. A timeless piece that commands attention.",
        category: "accessories",
        quantity: 1,
        images: ["https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
        featured: true
      },
      {
        name: "Victorian Persian Rug",
        price: 2299.99,
        description: "Authentic Persian rug with intricate patterns and rich colors. Hand-woven with the finest materials.",
        category: "accessories",
        quantity: 4,
        images: ["https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg",
        featured: false
      },
      {
        name: "Victorian Fireplace Screen",
        price: 599.99,
        description: "Ornate fireplace screen with brass frame and decorative mesh. Adds safety and style to your fireplace.",
        category: "accessories",
        quantity: 6,
        images: ["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"],
        thumbnail: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        featured: false
      }
    ];

    return this.http.post(`${this.productsApiUrl}/seed`, { products: moreProducts });
  }
}