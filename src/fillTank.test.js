'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('fills full tank if amount missing', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 100);

    expect(customer).toHaveProperty('money', 2000);
    expect(customer.vehicle).toHaveProperty('fuelRemains', 10);
  });

  it('limits pour to max capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 100, 15);

    expect(customer).toHaveProperty('money', 2000);
    expect(customer.vehicle).toHaveProperty('fuelRemains', 10);
  });

  it('limits pour to affordability', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 100, 8);

    expect(customer).toHaveProperty('money', 0);
    expect(customer.vehicle).toHaveProperty('fuelRemains', 5);
  });

  it('cuts the amount to 1 decimal', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 100, 4.89789);

    expect(customer).toHaveProperty('money', 2520);
    expect(customer.vehicle).toHaveProperty('fuelRemains', 4.8);
  });

  it('skips pour if less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 100, 1.99);

    expect(customer).toHaveProperty('money', 3000);
    expect(customer.vehicle).toHaveProperty('fuelRemains', 0);
  });

  it('rounds cost to 2 decimals', () => {
    const customer = {
      money: 3000.24,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 100.675, 5);

    expect(customer.money).toBeCloseTo(2496.86, 2);
    expect(customer.vehicle).toHaveProperty('fuelRemains', 5);
  });

  it('fills and deducts money successfully', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 100, 20);

    expect(customer).toHaveProperty('money', 1000);
    expect(customer.vehicle).toHaveProperty('fuelRemains', 25);
  });

  it('function should return undefined', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    expect(fillTank(customer, 100, 20)).toBeUndefined();
  });
});
