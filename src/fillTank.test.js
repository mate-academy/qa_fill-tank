"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  it("should not return a value", () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    };
    const fuelPrice = 50;
    expect(fillTank(customer, fuelPrice, 30)).toBe(undefined);
  });
  it(`should fill the full tank if 'amount' is not given`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    };
    const fuelPrice = 50;
    fillTank(customer, fuelPrice);
    const fuelAdded = 40 - 38;
    const totalCost = Math.round(fuelAdded * fuelPrice * 100) / 100;
    expect(customer.money).toBe(100 - totalCost);
    expect(customer.vehicle.fuelRemains).toEqual(
      customer.vehicle.maxTankCapacity
    );
    // expect(customer.money).toBe(100 - fuelPrice * 2);
  });
  it("should only fill the amount the customer can afford", () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50;
    fillTank(customer, fuelPrice, 30);
    const affordableFuel = Math.floor((1000 / 50) * 10) / 10;
    expect(customer.vehicle.fuelRemains).toBe(8 + affordableFuel);

    const totalCost = Math.round(affordableFuel * fuelPrice * 100) / 100;
    expect(customer.money).toBe(1000 - totalCost);
  });

  it("should not pour at all if the poured amount is less than 2 liters", () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice, 1.5);
    expect(customer.vehicle.fuelRemains).toBe(38);
    expect(customer.money).toBe(1000);
  });

  it('should round the fuel amount down to the nearest tenth', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 47.23;
    fillTank(customer, fuelPrice, 5.278);

    const expectedFuelAdded = Math.floor(5.278 * 10) / 10;
    expect(customer.vehicle.fuelRemains).toBe(8 + expectedFuelAdded);
  });
  it('should round the cost to the nearest hundredth', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 47.235;
    const amount = 5.2;
    fillTank(customer, fuelPrice, amount);

    const price = Math.round(amount * fuelPrice * 100) / 100;
    expect(customer.money).toBe(1000 - price);
  });
  it('should not change the object if amount = 0', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 0);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(1000);
  });
  it('should not change the object if amount < 0', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, -2);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(1000);
  });
});
