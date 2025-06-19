import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  relatedProducts: Product[] = [];
  loading: boolean = true;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loading = true;
        this.productService.getProductById(id).subscribe({
          next: (data) => {
            this.product = data;
            this.loading = false;
            this.loadRelatedProducts();
          },
          error: (err) => {
            console.error('Error loading product:', err);
            this.loading = false;
          },
        });
      } else {
        console.error('No product ID found in route parameters');
        this.loading = false;
      }
    });
  }

  loadRelatedProducts(): void {
    if (this.product) {
      console.log(this.product);
      this.productService.getRelatedProducts(this.product.id).subscribe({
        next: (products) => {
          this.relatedProducts = products;
        },
        error: (err) => {
          console.error('Error loading related products:', err);
        },
      });
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.product?.id) return;
    
    // Add the specified quantity to cart
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.increaseProductQuantity(this.product.id).subscribe({
        next: () => {
          if (i === this.quantity - 1) { // Only show alert on last addition
            alert(`Added ${this.quantity} item(s) to cart!`);
            this.quantity = 1; // Reset quantity after adding
          }
        },
        error: () => {
          alert('Failed to add to cart.');
        }
      });
    }
  }
}