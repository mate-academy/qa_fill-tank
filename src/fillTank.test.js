"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  it("should be a function", () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it("should return nothing", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const result = fillTank(customer, 10, 40);

    expect(result).toBe(undefined);
  });

  it(`If the amount is not given,
  then full tank is ordered`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`If the amount is greater than the tank can accommodate,
  pour only what will fit.
`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 100);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`Round the poured amount by discarding number to the tenth part.`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 9.999);

    expect(customer.vehicle.fuelRemains).toBe(17.9);
  });

  it(`If the poured amount is less than 2 liters, do not pour at all`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 9.99, 1.9);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it(`If the poured amount is less than 2 liters, do not pour at all`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 9.9999, 10);

    expect(customer.money).toBe(2900);
  });
});
