'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should not return anything from the function`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const result = fillTank(customer);
    expect(result).toBe(undefined);
  });

  it(`fill in only what the client can pay`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
   fillTank(customer, 10, 11);
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(0);
  });

   it(`If the 'amount' is not given, then full tank is ordered`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
   fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(0);
   });

   it(`If the 'amount' is greater than the tank can accommodate, pour only what will fit`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
   fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(680);
   });

   it(`If the poured amount is less than 2 liters, do not pour at all`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
   fillTank(customer, 10, 1);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(1000);
   });

  it(`Round the poured amount by discarding number to the tenth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
   fillTank(customer, 10, 11.867);
    expect(customer.vehicle.fuelRemains).toBe(19.8);
    expect(customer.money).toBe(882);
  });

  it(`Round the price of the purchased fuel the to the nearest hundredth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
   fillTank(customer, 12.876, 11.867);
    expect(customer.money).toBe(848.06);
  });
});
