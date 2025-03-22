/* eslint-disable quotes */
"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  it("should be an instance of Function", () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it("should fill full tank if amount do not passed", () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 2);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(900);
  });

  it('should not overflow tank', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 2, 100);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(900);
  });

  it('should not buy more than can', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 2, 100);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(0);
  });

  it('should not poor if amount less than 2', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 2, 1);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(1000);
  });

  it('should round amount of fuel', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2, 7.346);

    expect(customer.vehicle.fuelRemains).toBe(17.3);
    expect(customer.money).toBe(985.4);
  });

  it('should round the price', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2.123476, 10);

    expect(customer.vehicle.fuelRemains).toBe(20);
    expect(customer.money).toBe(978.77);
  });
});
