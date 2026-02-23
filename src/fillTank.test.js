"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  let customer;

  beforeEach(() => {
    customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
  });

  test("should return nothing (undefined)", () => {
    const result = fillTank(customer, 10, 5);
    expect(result).toBeUndefined();
  });

  test("should fill only what fits in the tank", () => {
    fillTank(customer, 10, 100);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBeCloseTo(600, 2);
  });

  test("should not fill if affordable amount rounded is < 2", () => {
    customer.money = 19.9;
    fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBeCloseTo(19.9, 2);
  });

  test("should use minimum of amount, space, and money", () => {
    customer.money = 60;
    fillTank(customer, 20, 10);
    expect(customer.vehicle.fuelRemains).toBe(13);
    expect(customer.money).toBeCloseTo(0, 2);
  });

  test("should discard to the tenth part for fuel amount", () => {
    customer.money = 100;
    fillTank(customer, 30);
    expect(customer.vehicle.fuelRemains).toBe(13.3);
    expect(customer.money).toBeCloseTo(1, 2);
  });

  test("should round price to the nearest hundredth", () => {
    fillTank(customer, 10.123, 2.5);
    expect(customer.money).toBeCloseTo(974.69, 2);
  });

  test("should handle zero money case", () => {
    customer.money = 0;
    fillTank(customer, 10, 10);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBeCloseTo(0, 2);
  });
});
