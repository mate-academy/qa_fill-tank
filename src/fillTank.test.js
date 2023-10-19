"use strict";

const { fillTank } = require("./fillTank");

describe("fillTank", () => {
  it("should fill the tank completely", () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };
    const fuelPrice = 2;
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(75);
  });

  it("should partially fill the tank", () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };
    const fuelPrice = 2;
    fillTank(customer, fuelPrice, 20);
    expect(customer.vehicle.fuelRemains).toBe(25);
    expect(customer.money).toBe(60);
  });

  it("should not pour less than 2 liters", () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };
    const fuelPrice = 5;
    fillTank(customer, fuelPrice, 5);
    expect(customer.vehicle.fuelRemains).toBe(5);
    expect(customer.money).toBe(50);
  });

  it("should pour only what the customer can pay", () => {
    const customer = {
      money: 20,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };
    const fuelPrice = 3;
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(10.83, 2);
    expect(customer.money).toBe(0);
  });
});
