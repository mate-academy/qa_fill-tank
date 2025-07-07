'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should calculate money and fuel correctly', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 47,
      },
    };

    fillTank(customer, 2.5);

    expect(customer).toEqual({
      money: 22.5,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 50,
      },
    });
  });

  it('fills tank partially if customer has not enough money', () => {
    const customer = {
      money: 5,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2.5);
    expect(customer.vehicle.fuelRemains).toBe(12);
    expect(customer.money).toBe(0);
  });

  it('rounds fuel to nearest 0.1 down', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 2.53);
    expect(customer.vehicle.fuelRemains).toBe(3.9);
  });

  it('does nothing when amount = 0', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2.5, 0);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(100);
  });

  it('fills only what fits if amount and money allow more', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };

    fillTank(customer, 2.5, 10);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(87.5);
  });
});
