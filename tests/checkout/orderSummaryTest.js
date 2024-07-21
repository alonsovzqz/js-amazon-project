import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeAll((done) => {
    loadProducts(() => {
      done();
    });
  });

  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(
      ".js-test-container"
    ).innerHTML = `<div class="js-checkout-header-middle-section"></div>
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "b3e47d2f-674a-48e6-8c1b-32fd781a4b29",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "fc9127e8-21f4-4b59-9e1c-45a1d0935d2e",
        },
      ]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerHTML
    ).toContain("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerHTML
    ).toContain("$");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerHTML
    ).toContain("Intermediate Size Basketball");
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerHTML
    ).toContain("$");
  });

  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerHTML
    ).toContain("Intermediate Size Basketball");
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerHTML
    ).toContain("$");
  });

  it("updates the delivery option", () => {
    const deliveryOption3 = "4d8571a2-35fe-4f3e-abb9-89df3c5b4e72";

    document
      .querySelector(`.js-delivery-option-${productId1}-${deliveryOption3}`)
      .click();
    expect(
      document.querySelector(
        `.js-delivery-option-input-${productId1}-${deliveryOption3}`
      ).checked
    ).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual(deliveryOption3);
    expect(
      document.querySelector(".js-payment-summary-shipping").innerText
    ).toEqual("$14.98");
    expect(
      document.querySelector(".js-payment-summary-total").innerText
    ).toEqual("$63.50");
  });
});
