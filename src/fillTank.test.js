'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`If the poured amount is less than 2 liters, do not pour at all`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1600, 3);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it(`If the 'amount' is not given, then full tank is ordered`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`If the 'amount' is greater than the tank can accommodate,`
    + `pour only what will fit`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 35);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`ALWAYS fill in only what the client can pay`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 500, 10);
    expect(customer.vehicle.fuelRemains).toBe(14);
  });

  it(`Round the poured amount by discarding number to the tenth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 190.53);
    expect(customer.vehicle.fuelRemains).toBe(23.7);
  });

  it(`Round the price of the purchased fuel the to`
    + `the nearest hundredth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 45.47, 9.39);
    expect(customer.money).toBe(2577.13);
  });
});
