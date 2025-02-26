"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  it("should be declared", () => {
    expect(fillTank).toBeDefined();
  });

  it("should corretly fill given amount", () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 4, 10);

    expect(customer).toHaveProperty("vehicle.fuelRemains", 30);
  });

  it("should withdraw money", () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 40, 5);

    expect(customer).toHaveProperty("money", 3800);
  });

  it("shouldn't pour at all if amount is less than 2", () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 3, 1);

    expect(customer).toHaveProperty("vehicle.fuelRemains", 20);
  });

  it("should fully fill the tank if amount is not given", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 6);

    expect(customer).toHaveProperty("vehicle.fuelRemains", 40);
  });

  it(`should fully fill the tank, if 'amount' > 'maxTankCapacity'`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 100);

    expect(customer).toHaveProperty("vehicle.fuelRemains", 30);
  });

  it("should fill only what client can pay", () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 40);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 30,
      },
    });
  });
});
