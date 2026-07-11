---
title: "Building bowlit: A Subscription-Based Tiffin Service Logistics Platform"
date: "2026-03-15"
summary: "An in-depth look at how we built bowlit, a batch-delivery and centralized kitchen logistics platform using Next.js, Supabase, and Tailwind CSS."
---

When I founded **bowlit**, my goal was simple: provide high-quality, subscription-based tiffin services with absolute reliability. But as we scaled, we quickly realized that cooking good food is only half the battle. The real challenge lies in the logistics of batch delivery and kitchen scheduling.

To solve this, we built a custom centralized kitchen and logistics management dashboard. Here's a breakdown of how the architecture works and the lessons we learned along the way.

## Why a Custom Solution?

While off-the-shelf delivery options exist, subscription tiffins have unique requirements:
1. **Recurring schedules**: Customers buy monthly packages (e.g., 5 days a week, lunch only).
2. **Batch routing**: Deliveries are grouped geographically into single-driver batches rather than on-demand individual dispatches.
3. **Kitchen scaling**: Preparing 500 meals of the same item simultaneously requires exact timing data.

## The Tech Stack

We chose a highly efficient, production-ready stack to launch quickly:
- **Framework**: Next.js (App Router) for static rendering and fast client loading.
- **Database**: Supabase (PostgreSQL) for relational customer/order tracking.
- **Realtime**: Supabase Realtime for live delivery driver tracking.
- **Styling**: Tailwind CSS for a minimal, clean, utility-first layout.

### Dispatch Allocation Algorithm

A key part of our application is assigning deliveries to optimal routes. Here is a simplified version of our route-batching logic:

```typescript
interface Delivery {
  id: string;
  zipCode: string;
  meals: number;
}

interface Route {
  driverId: string;
  deliveries: Delivery[];
}

export function batchDeliveries(deliveries: Delivery[], maxPerRoute = 15): Route[] {
  // Sort deliveries by Zip Code to group them geographically
  const sorted = [...deliveries].sort((a, b) => a.zipCode.localeCompare(b.zipCode));
  const routes: Route[] = [];
  
  let currentDeliveries: Delivery[] = [];
  let routeIndex = 1;

  for (const delivery of sorted) {
    currentDeliveries.push(delivery);
    
    if (currentDeliveries.length >= maxPerRoute) {
      routes.push({
        driverId: `driver-batch-${routeIndex++}`,
        deliveries: currentDeliveries
      });
      currentDeliveries = [];
    }
  }

  // Pick up any remaining items
  if (currentDeliveries.length > 0) {
    routes.push({
      driverId: `driver-batch-${routeIndex}`,
      deliveries: currentDeliveries
    });
  }

  return routes;
}
```

> "Logistics is not about finding the shortest path once; it's about building a consistent rhythm that drivers and kitchen staff can repeat day after day."
> — *bowlit Operations Manual*

## Current Status

Today, **bowlit** coordinates deliveries to hundreds of subscribers every weekday. The platform automatically handles cancellations, address modifications, and dietary shifts in real-time. By moving our data architecture to Supabase, we decreased routing compute times by 40% and improved delivery window accuracy to 95%.

Next up, we are exploring machine-learning-based demand forecasting to reduce ingredients waste in the centralized kitchen even further.
