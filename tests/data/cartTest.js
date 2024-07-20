import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("add an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "b3e47d2f-674a-48e6-8c1b-32fd781a4b29",
        },
      ]);
    });
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });

  it("add a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });
});

describe("test suite: removeFromCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "b3e47d2f-674a-48e6-8c1b-32fd781a4b29",
        },
      ]);
    });
    loadFromStorage();
  });

  it("remove a productId that is in the cart", () => {
    removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });

  it("remove a productId that is NOT in the cart", () => {
    removeFromCart("2");

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).not.toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });
});

describe("test suite: updateDeliveryOption", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "b3e47d2f-674a-48e6-8c1b-32fd781a4b29",
        },
      ]);
    });
    loadFromStorage();
  });

  it("updates the delivery option of a product in the cart", () => {
    updateDeliveryOption(productId1, "4d8571a2-35fe-4f3e-abb9-89df3c5b4e72");

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual(
      "4d8571a2-35fe-4f3e-abb9-89df3c5b4e72"
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });

  it('updates the delivery option of a productId that is NOT in the cart', () => {
    updateDeliveryOption('1', "4d8571a2-35fe-4f3e-abb9-89df3c5b4e72");

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).not.toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });

  it('updates the delivery option of a deliveryOptionId that does NOT exist', () => {
    updateDeliveryOption(productId1, '1');

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).not.toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });
});
