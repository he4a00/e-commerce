export type User = {
  fullName: string;
  email: string;
  password: string;
};

export type Brand = {
  brandName: string;
  brandID?: string;
  productLength?: number;
};

export type BrandResult = {
  result: [{ brandName: string; brandId: string }];
};

export type Cateogry = {
  categoryName: string;
  categoryImage: string;
  parentID: string;
};

export type Category_I = {
  _id: string;
  categoryName: string;
  imageUrl?: string;
};

export type Create_Product = {
  ProductID?: string;
  ProductFiles?: File[];
  ProductName: string;
  ProductDescription: string;
  ProductPrice: number;
  Discount: number;
  StockQuantity: number;
  WarrantyPeriod?: number;
  Color?: string;
  ModelNumber: number;
  BrandID: string;
  CategoryID: string;
};

export type Product = {
  productID: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  discount: number;
  stockQuantity: number;
  productFilesUrl: string[];
  avgRating: number;
  brandName: string;
  categoryName: string;
  warrantyPeriod: number;
  color: string;
  modelNumber: number;
  productPriceAfterDiscount?: number;
  productInWishlist?: boolean;
};

export type Deal = {
  dealID?: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  productID: string;
  totalOrders?: number;
  totalReviews?: number;
  avgRating?: number;
  productName?: string;
  isActive?: boolean;
  productPrice?: number;
  brandName?: string;
  categoryName?: string;
  productImageUrl?: string;
  isInStock?: boolean;
  productPriceAfterDiscount?: number;
  producttID?: string;
};


export type ParentCategory = {
  categoryID: string;
  categoryImageURL: string;
  categoryName: string;
};

export type Add_Review = {
  ProductID?: string;
  ReviewText: string;
  Rating: number;
};

export type Add_TO_Cart = {
  productID: string;
  price: number;
  productName: string;
  quantity: number;
  pictureUrl: string;
  brandName: string;
};

export type Add_Delivery_Method = {
  deliveryMethodID?: string;
  shortName: string;
  price: number;
  deliveryTime: string;
  description: string;
};

export type Add_Address = {
  addressID?: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  addressLine2: string;
  fullName?: string;
};

export type Add_Order = {
  addressID: string;
  deliveryMethodID: string;
  orderItems: [
    {
      productID: string;
      quantity: number;
      price: number;
    }
  ];
};


export interface Order {
  orderID: string;
  orderDate: string;
  orderItems: {
    orderItemID: string;
    price: number;
    productImage: string;
    productName: string;
    quantity: number;
  }[];
  deliveryMethod: {
    price: number
  };
  orderNumber: string;
  orderStatus: string;
  totalPrice: number;
  userName?: string
}
