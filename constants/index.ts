import { Inbox, Logs, Plus, Tally4 } from "lucide-react";

export const SidebarLinks = [
  {
    name: "Brands",
    icon: Inbox,
    subLinks: [
      { name: "Create Brand", url: "brands/add-brand", icon: Plus },
      { name: "Brands", url: "brands", icon: Tally4 },
    ],
  },
  {
    name: "Categories",
    icon: Logs,
    subLinks: [
      { name: "Create Category", url: "categories/add-category", icon: Plus },
      { name: "Categories", url: "categories", icon: Tally4 },
    ],
  },
  {
    name: "Products",
    icon: Logs,
    subLinks: [
      { name: "Create Product", url: "products/add-product", icon: Plus },
      { name: "Products", url: "products", icon: Tally4 },
    ],
  },
  {
    name: "Deals",
    icon: Logs,
    subLinks: [{ name: "Deals", url: "deals", icon: Tally4 }],
  },
  {
    name: "Delivery",
    icon: Logs,
    subLinks: [
      { name: "Add Delivery", url: "delivery/add-delivery", icon: Plus },
      { name: "Delivery", url: "delivery", icon: Tally4 },
    ],
  },
  {
    name: "Orders",
    icon: Logs,
    subLinks: [{ name: "Orders", url: "orders", icon: Tally4 }],
  },
];

export const OrderStatus = [
  { number: 0, status: "Pending" },
  { number: 7, status: "Shipped" },
  { number: 9, status: "Delivered" },
  { number: 4, status: "Cancelled" },
];
