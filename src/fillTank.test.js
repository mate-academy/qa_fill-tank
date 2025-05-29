'use strict';

describe('Fill-Tank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill the tank if amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expected = {
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 50);
    expect(customer).toEqual(expected);
  });

  it('should only fill what fits when amount exceeds tank capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expected = {
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 50, 50);
    expect(customer).toEqual(expected);
  });

  it('should fill only what the client can pay', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expected = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    };

    fillTank(customer, 100);
    expect(customer).toEqual(expected);
  });

  it('should not fill if resulting amount would be less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39.5,
      },
    };

    const originalState = { ...customer };

    fillTank(customer, 50, 1);

    expect(customer).toEqual(originalState);
  });

  it('should handle edge case when tank is already full', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    const originalState = { ...customer };

    fillTank(customer, 50, 10);

    expect(customer).toEqual(originalState);
  });

  it('should round fuel amount down to tenths', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 4.61);
    expect(customer.vehicle.fuelRemains).toBe(12.6);
  });
});
