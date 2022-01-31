'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('customer has enougth money and fill not full tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 10);

    expect([
      customer.money,
      customer.vehicle.fuelRemains,
    ]).toEqual([2700, 18]);
  });

  it('customer has enougth money and fill full tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 32);

    expect([
      customer.money,
      customer.vehicle.fuelRemains,
    ]).toEqual([2040, 40]);
  });

  it('If the `amount` is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30);

    expect(
      customer.vehicle.fuelRemains,
    ).toBe(40);
  });

  it('If the `amount` is more than tank capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 100);

    expect(
      customer.vehicle.fuelRemains,
    ).toBe(40);
  });

  it('If the `customer` does not have enough money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 300, 20);

    expect(
      customer.vehicle.fuelRemains,
    ).toBe(18);
  });

  it('should round the balance in the tank down to tenths', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 10.56);

    expect([
      customer.money,
      customer.vehicle.fuelRemains,
    ]).toEqual([2685, 18.5]);
  });

  it('should not pour, if the poured amount is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 1.9);

    expect([
      customer.money,
      customer.vehicle.fuelRemains,
    ]).toEqual([3000, 8]);
  });

  it(`should round the price of the purchased fuel 
    to the nearest hundredth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30.1111, 10);

    expect([
      customer.money,
      customer.vehicle.fuelRemains,
    ]).toEqual([2698.89, 18]);
  });
});
