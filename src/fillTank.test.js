'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`fuelRemains should be equal to maxTankCapacity `
    + `if the amount is not given`, () => {
    const fuelPrice = 10;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it(`fuelRemains should be equal to maxTankCapacity `
    + `if the amount is greater than the tank can accommodate`, () => {
    const amount = 50;
    const fuelPrice = 10;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('should fill only what the client can pay', () => {
    const amount = 10;
    const fuelPrice = 1000;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(11);
  });

  it(`should round the poured amount by discarding number `
    + `to the tenth part`, () => {
    const amount = 10;
    const fuelPrice = 1230;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(10.4);
  });

  it('should not pour if amount is less than 2 liters', () => {
    const amount = 1;
    const fuelPrice = 100;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it(`should round the price of the purchased fuel the `
    + `to the nearest hundredth part`, () => {
    const amount = 5.105;
    const fuelPrice = 70.4;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(2640.96);
  });
});
