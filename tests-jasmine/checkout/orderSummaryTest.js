import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

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

  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    document.querySelector(".js-test-container").innerHTML = "";
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

    document.querySelector(".js-test-container").innerHTML = "";
  });
});
