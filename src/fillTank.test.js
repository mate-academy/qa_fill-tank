'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('full tank is ordered when no amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer).toEqual({
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('if amount > tank can accommodate then pour to maxTankCapacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 40);

    expect(customer).toEqual({
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('pour no more then can pay', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 32);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 28,
      },
    });
  });

  it('should return undefined', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 25, 500)).toBe(undefined);
  });

  it('rounds poured fuel amount by discarding to tenths', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 33);

    expect(customer).toEqual({
      money: 1,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 3.0,
      },
    });
  });

  it('does not pour fuel if poured amount is less than 2 liters', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 30);

    expect(customer).toEqual({
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    });
  });

  it('rounds fuel price to the nearest hundredth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 33.3333);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 3,
      },
    });
  });
});
