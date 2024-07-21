class Car {
  brand;
  model;
  speed = 0;
  isTrunkOpen = false;

  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  displayInfo() {
    console.log(
      `${this.brand} ${this.model}, Speed: ${this.speed} km/h, The trunk is: ${
        this.isTrunkOpen ? "open" : "close"
      }`
    );
  }

  go() {
    if (this.isTrunkOpen) return;

    if (this.speed >= 0 && this.speed <= 200) {
      this.speed += 5;
    }
  }

  brake() {
    if (this.speed >= 0 && this.speed <= 200) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (!this.speed > 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const toyotaCar = new Car("Toyota", "Corolla");
const teslaCar = new Car("Tesla", "Model 3");

console.log(toyotaCar);
console.log(teslaCar);

toyotaCar.displayInfo();
teslaCar.displayInfo();

toyotaCar.go();
toyotaCar.go();
toyotaCar.go();
toyotaCar.go();
toyotaCar.displayInfo();

teslaCar.go();
teslaCar.go();
teslaCar.go();
teslaCar.brake();
teslaCar.displayInfo();
