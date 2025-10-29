"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");
  let customer;
  beforeEach(() => {
    customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };
  });

  it("fuelPrice 1 and amount 10 liters", () => {
    expect(customer).toHaveProperty("money");
    expect(customer).toHaveProperty("vehicle");
    expect(customer).toHaveProperty("vehicle.maxTankCapacity");
    expect(customer).toHaveProperty("vehicle.fuelRemains");
    expect(customer.money).toBe(3000);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(8);

    fillTank(customer, 1, 10);

    expect(customer.money).toBe(2990);
    expect(customer.vehicle.fuelRemains).toBe(18);

    expect(isObject(customer)).toBeTruthy();
  });

  it("fuelPrice 1.11 and amount is not given", () => {
    expect(customer).toHaveProperty("money");
    expect(customer).toHaveProperty("vehicle");
    expect(customer).toHaveProperty("vehicle.maxTankCapacity");
    expect(customer).toHaveProperty("vehicle.fuelRemains");
    expect(customer.money).toBe(3000);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(8);

    fillTank(customer, 1.11);

    expect(customer.money).toBe(2964.48);
    expect(customer.vehicle.fuelRemains).toBe(40);

    expect(isObject(customer)).toBeTruthy();
  });

  it("fuelPrice 0.99 and amount > tank volume", () => {
    expect(customer).toHaveProperty("money");
    expect(customer).toHaveProperty("vehicle");
    expect(customer).toHaveProperty("vehicle.maxTankCapacity");
    expect(customer).toHaveProperty("vehicle.fuelRemains");
    expect(customer.money).toBe(3000);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(8);

    fillTank(customer, 0.99, 100);

    expect(customer.money).toBe(2968.32);
    expect(customer.vehicle.fuelRemains).toBe(40);

    expect(isObject(customer)).toBeTruthy();
  });

  it("fuelPrice 100 and full tank ", () => {
    expect(customer).toHaveProperty("money");
    expect(customer).toHaveProperty("vehicle");
    expect(customer).toHaveProperty("vehicle.maxTankCapacity");
    expect(customer).toHaveProperty("vehicle.fuelRemains");
    expect(customer.money).toBe(3000);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(8);

    fillTank(customer, 100);

    expect(customer.money).toBe(0);

    expect(customer.vehicle.fuelRemains).toBe(38);

    expect(isObject(customer)).toBeTruthy();
  });

  it("decimal fuelPrice and amount ", () => {
    expect(customer).toHaveProperty("money");
    expect(customer).toHaveProperty("vehicle");
    expect(customer).toHaveProperty("vehicle.maxTankCapacity");
    expect(customer).toHaveProperty("vehicle.fuelRemains");
    expect(customer.money).toBe(3000);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(8);

    fillTank(customer, 1.23456789, 12.3456789);

    expect(customer.money).toBe(2984.81); // to the nearest hundredth part

    expect(customer.vehicle.fuelRemains).toBe(20.3); // to the tenth part

    expect(isObject(customer)).toBeTruthy();
  });

  it("not tank if amount < 2 ", () => {
    expect(customer).toHaveProperty("money");
    expect(customer).toHaveProperty("vehicle");
    expect(customer).toHaveProperty("vehicle.maxTankCapacity");
    expect(customer).toHaveProperty("vehicle.fuelRemains");

    expect(customer.money).toBe(3000);
    expect(customer.vehicle.maxTankCapacity).toBe(40);
    expect(customer.vehicle.fuelRemains).toBe(8);

    fillTank(customer, 1, 1.99);

    expect(customer.money).toBe(3000);

    expect(customer.vehicle.fuelRemains).toBe(8);

    expect(isObject(customer)).toBeTruthy();
  });

  it("expect undefined with no return", () => {
    const result = fillTank(customer, 1, 1.99);
    expect(result).toBeUndefined();
  });
});

function isObject(value) {
  return value instanceof Object && value !== null && !Array.isArray(value);
}
