import { Appliance, Clothing, Product } from "../../data/products.js";

describe("test suite: Product class", () => {
  it("checks the instance contains the correct properties and methods", () => {
    const testProduct = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
    });

    expect(testProduct instanceof Product).toEqual(true);
    expect(testProduct.name).toEqual(
      "Black and Gray Athletic Cotton Socks - 6 Pairs"
    );
    expect(testProduct.getPrice()).toEqual("$10.90");
    expect(testProduct.extraInfoHTML()).toEqual("");
  });
});

describe("test suite: Clothing class", () => {
  it("checks the instance contains the correct properties and methods", () => {
    const clothingProduct = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      sizeChartLink: "images/clothing-size-chart.png",
    });

    expect(clothingProduct instanceof Clothing).toEqual(true);
    expect(clothingProduct.name).toEqual(
      "Adults Plain Cotton T-Shirt - 2 Pack"
    );
    expect(clothingProduct.sizeChartLink).toEqual(
      "images/clothing-size-chart.png"
    );
    expect(clothingProduct.extraInfoHTML()).toContain(`
     <a href="${clothingProduct.sizeChartLink}" target="_blank">
       Size chart
     </a>
    `);
  });
});

describe("test suite: Appliance class", () => {
  it("checks the instance contains the correct properties and methods", () => {
    const applianceProduct = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197,
      },
      priceCents: 1899,
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
    });

    expect(applianceProduct instanceof Appliance).toEqual(true);
    expect(applianceProduct.name).toEqual("2 Slot Toaster - Black");
    expect(applianceProduct.instructionsLink).toEqual("images/appliance-instructions.png");
    expect(applianceProduct.warrantyLink).toEqual("images/appliance-warranty.png");
    expect(applianceProduct.extraInfoHTML()).toEqual(`
      <a href="images/appliance-instructions.png" target="_blank">
        Instructions
      </a>
      <a href="images/appliance-warranty.png" target="_blank">
        Warranty
      </a>
    `);
  });
});
