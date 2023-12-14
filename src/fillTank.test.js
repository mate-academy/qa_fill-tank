'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it(`should tank full if amount is not taken`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 70);

    expect(customer.vehicle.fuelRemains)
      .toBe(40);
  });

  it(
    `should pour only what will fit if the 'amount' is greater than the tank`,
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 70, 50);

      expect(customer.vehicle.maxTankCapacity === customer.vehicle.fuelRemains)
        .toBeTruthy();
    });

  it(`should fill in only what the client can pay`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 40);

    expect(customer.vehicle.fuelRemains)
      .toBe(18);
  });

  it(
    `should round the poured amount by discarding number to the tenth part`,
    () => {
      const customer = {
        money: 513,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 51, 40);

      expect(customer.vehicle.fuelRemains)
        .toBe(18);
    });

  it(
    `should not pour at all if the poured amount is less than 2 liters`,
    () => {
      const customer = {
        money: 513,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 51, 1);

      expect(customer.vehicle.fuelRemains)
        .toBe(8);
    });

  it(
    `should round the price of the purchased
      fuel the to the nearest hundredth part`,
    () => {
      const customer = {
        money: 5135.20,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 50.51, 16.8);

      expect(customer.money)
        .toBe(4286.63);
    });
});
