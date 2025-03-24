'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be defined', () => {
    expect(fillTank).toBeDefined();
  });

  it('should be an instance of function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should return undefined', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 10,
      },
    };

    expect(fillTank(customer, 50, 50)).toBeUndefined();
  });

  it('should fill customer to max tack capasity without amount arg', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(60);
  });

  it('should fill customer to max tack capasity if amount > capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 100);

    expect(customer.vehicle.fuelRemains).toBe(60);
  });

  it('should fill only what can be paid', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(12);
  });

  it('should round the poured amount to the tenth part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 50, 3.66);

    expect(customer.vehicle.fuelRemains).toBe(3.6);
  });

  it('should not pour if poured amount < 2', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 50, 1.7);

    expect(customer.vehicle.fuelRemains).toBe(0);
  });

  it('should round the purchased fuel price to the hundredth part', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 0,
      },
    };

    const price = 50.666;

    fillTank(customer, price, 2);

    expect(customer.money).toBe(200 - parseFloat((2 * price).toFixed(2)));
  });
});
