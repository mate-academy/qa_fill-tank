'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should decrease the correct amount of money', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20);

    expect(customer.money).toBe(360);
  });

  it('should fill the full tank if amount was not provided', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20);

    expect(customer).toStrictEqual({
      money: 2360,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 40,
      },
    });
  });

  it(`should fill the full tank `
  + `if amount is greater than maxTankCapacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20, 55);

    expect(customer).toStrictEqual({
      money: 2360,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 40,
      },
    });
  });

  it('should only fill if the customer has enough money', () => {
    const customer = {
      money: 5,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20, 55);

    expect(customer).toStrictEqual({
      money: 5,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 8,
      },
    });
  });

  it('should round the poured amount to the tenth part', () => {
    const customer = {
      money: 5843,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 12,
      },
    };

    fillTank(customer, 20, 12.23443215);

    expect(customer.vehicle.fuelRemains).toBe(24.2);
  });

  it(`should not pour at all `
  + `if the poured amount is less than 2 liters`, () => {
    const customer = {
      money: 7777,
      vehicle: {
        maxTankCapacity: 77,
        fuelRemains: 7,
      },
    };

    fillTank(customer, 20, 1);

    expect(customer.vehicle.fuelRemains).toBe(7);
  });

  it(`should round the price of the purchased fuel `
  + `to the nearest hundredth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10.214, 3);

    expect(customer.money).toBe(2969.36);
  });
});
