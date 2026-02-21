"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it("should not return anything", () => {
    const result = fillTank(customer, 50, 10);

    expect(result).toBeUndefined();
  });

  it("should fill full tank if amount is not given", () => {
    fillTank(customer, 50);

    // tank can fit 32 liters (40 - 8)
    const poured = 32;
    const expectedSpent = Number((poured * 50).toFixed(2));

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBeCloseTo(3000 - expectedSpent, 2);
  });

  it("should not pour more than tank capacity allows", () => {
    fillTank(customer, 50, 100);

    const poured = 32; // capacity limited
    const expectedSpent = Number((poured * 50).toFixed(2));

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBeCloseTo(3000 - expectedSpent, 2);
  });

  it("should not pour more than customer can afford", () => {
    customer.money = 100; // can buy 2 liters at price 50

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBeCloseTo(0, 2);
  });

  it("should discard digits after tenth part", () => {
    customer.money = 333; // 333 / 50 = 6.66 → 6.6 liters

    fillTank(customer, 50, 10);

    const poured = 6.6;
    const expectedSpent = Number((poured * 50).toFixed(2));

    expect(customer.vehicle.fuelRemains).toBeCloseTo(14.6, 1);
    expect(customer.money).toBeCloseTo(333 - expectedSpent, 2);
  });

  it("should not pour fuel if less than 2 liters", () => {
    customer.money = 50; // 1 liter

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(50);
  });

  it("should correctly round price to nearest hundredth", () => {
    fillTank(customer, 33.333, 10);

    const poured = 10;
    const expectedSpent = Number((poured * 33.333).toFixed(2));

    expect(customer.money).toBeCloseTo(3000 - expectedSpent, 2);
  });

  it("should correctly handle complex scenario", () => {
    customer.money = 500;
    customer.vehicle.fuelRemains = 30;

    const initialMoney = customer.money;
    const initialFuel = customer.vehicle.fuelRemains;

    fillTank(customer, 40, 20);

    const capacityLimit = 40 - initialFuel; // 10
    const affordable = initialMoney / 40; // 12.5

    const poured =
      Math.floor(Math.min(20, capacityLimit, affordable) * 10) / 10;

    const expectedSpent = Number((poured * 40).toFixed(2));

    expect(customer.vehicle.fuelRemains).toBeCloseTo(initialFuel + poured, 1);

    expect(customer.money).toBeCloseTo(initialMoney - expectedSpent, 2);
  });
});
