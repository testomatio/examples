---
url: "*"
title: SauceDemo overview
---

This is the Sauce Labs demo e-commerce app, a public sandbox used for testing.

App structure:
- `/` — login page (entry point)
- `/inventory.html` — product list (after login)
- `/inventory-item.html?id=N` — product detail
- `/cart.html` — shopping cart
- `/checkout-step-one.html` — checkout: shipping info
- `/checkout-step-two.html` — checkout: order summary
- `/checkout-complete.html` — order confirmation

Notes:
- The site has no real backend — orders are not actually placed.
- Authentication is required for every page except `/`.
- A hamburger menu (top-left) contains "All Items", "About", "Logout", "Reset App State".
- The cart icon (top-right) shows the current item count.
