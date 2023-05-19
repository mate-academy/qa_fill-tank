'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it('should do nothing if customer has no money', () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 20);

    expect(customer)
      .toEqual(customer);
  });

  it('should work if amount is not given', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer)
      .toEqual({
        money: 3400,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it('should work if amount is greater than the tank can accommodate', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 40);

    expect(customer)
      .toEqual({
        money: 3400,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it('should fill only what the client can pay', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 32);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 28,
        },
      });
  });

  it('should round the poured amount by '
  + 'discarding number to the tenth part', () => {
    const customer = {
      money: 140,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 14,
      },
    };

    fillTank(customer, 10, 9.47);

    expect(customer)
      .toEqual({
        money: 46,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 23.4,
        },
      });
  });

  it('should not pour if amount less than 2 liters', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 25,
      },
    };

    fillTank(customer, 50, 1);

    expect(customer)
      .toEqual(customer);
  });

  it('should round the price of the purchased fuel '
  + 'the to the nearest hundredth part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 11.775, 10);

    expect(customer)
      .toEqual({
        money: 882.25,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 25,
        },
      });
  });
});
