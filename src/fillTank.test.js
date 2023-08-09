'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it('should be not refuel customer if dont have enough money', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 60, 10);

    expect(customer)
      .toEqual(customer);
  });

  it('should be not refuel customer if amount is less than 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20, 1);

    expect(customer)
      .toEqual(customer);
  });

  it('should be not return anything', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 20, 1))
      .toBeUndefined();
  });

  it('if the amount is not given, refuel for affordable amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 200);

    expect(customer)
      .toEqual({
        'money': 0,
        'vehicle': {
          'fuelRemains': 23,
          'maxTankCapacity': 40,
        },
      });
  });

  it('remains should not exceed the max capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20);

    expect(customer)
      .toEqual({
        'money': 2360,
        'vehicle': {
          'fuelRemains': 40,
          'maxTankCapacity': 40,
        },
      });
  });

  it('if the amount is bigger cost more than customer can afford,'
    + 'refuel for affordable amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100, 100);

    expect(customer)
      .toEqual({
        'money': 0,
        'vehicle': {
          'fuelRemains': 38,
          'maxTankCapacity': 40,
        },
      });
  });

  it('should round values', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 5);

    const { money } = customer;
    const { fuelRemains } = customer.vehicle;

    const valuesIsRound = money === Math.floor(money)
      && fuelRemains === Math.floor(fuelRemains);

    expect(valuesIsRound)
      .toBeTruthy();
  });
});
