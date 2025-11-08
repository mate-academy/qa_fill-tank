'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should not return anything', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 25, 100)).toBe(undefined);
  });

  it('should fill up the tank if amount is not passed', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1);

    expect(customer.vehicle.fuelRemains)
      .toBe(customer.vehicle.maxTankCapacity);
  });

  it('should not pour more fuel than the tank can hold', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1, 100);

    expect(customer.vehicle.fuelRemains)
      .toBe(customer.vehicle.maxTankCapacity);
  });

  it('fills only affordable fuel if not enough money', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains)
      .toBe(12);
  });

  it('skips fill if less than 2L affordable', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 1);

    expect(customer.vehicle.fuelRemains)
      .toBe(8);
  });

  it('rounds fuel to nearest tenth', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 5.55);

    expect(customer.vehicle.fuelRemains)
      .toBe(13.5);
  });

  it('cost is rounded to nearest hundredth', () => {
    const initialMoney = 100;
    const fuelPrice = 13.333333333;

    const customer = {
      money: initialMoney,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 10,
      },
    };

    fillTank(customer, fuelPrice);

    const expectedMoneyRemains = 0.00;

    expect(customer.money).toBe(expectedMoneyRemains);
  });
});
