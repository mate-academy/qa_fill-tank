"use strict";

const { fillTank } = require("./fillTank");

describe("fillTank", () => {
  it("should fill the tank with the full tank capacity if no amount is given", () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(40, 2);
    expect(customer.money).toBe(20);
  });

  it("should fill the tank with the given amount if it fits in the tank and the customer can pay", () => {
    const customer = {
      money: 150,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 15);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(25, 2);
    expect(customer.money).toBe(120);
  });

  it("should fill the tank only with the remaining capacity if the given amount exceeds the tank capacity", () => {
    const customer = {
      money: 150,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 50);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(40, 2);
    expect(customer.money).toBe(10);
  });

  it("should round the filled amount and the price of purchased fuel", () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 1.234;

    fillTank(customer, fuelPrice, 15);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(25, 2);
    expect(customer.money).toBeCloseTo(85.35, 2);
  });

  it("should not pour fuel if the requested amount is less than 2 liters", () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 0.5);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(100);
  });

  it("should not pour fuel if the customer can't afford it", () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 15);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(10);
  });
});
