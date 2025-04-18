'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  // eslint-disable-next-line max-len
  it('should fill tank completely if the `amount` is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1500);
  });

  // eslint-disable-next-line max-len
  it('should NOT pour if the amount that can be poured is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 50, 5);

    expect(customer.vehicle.fuelRemains).toBe(39);
    expect(customer.money).toBe(3000);
  });

  it('should fill in only what the client can pay', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(12);
    expect(customer.money).toBe(0);
  });

  // eslint-disable-next-line max-len
  it('should round the poured amount by discarding number to the tenth part', () => {
    const customer = {
      money: 123,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(12.4);
    expect(customer.money).toBeCloseTo(123 - (2.4 * 50), 2);
  });

  // eslint-disable-next-line max-len
  it('should not pour at all if the poured amount is less than 2 liters', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(39);
    expect(customer.money).toBe(30);
  });

  // eslint-disable-next-line max-len
  it('should round the price of the purchased fuel to the nearest hundredth part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 33.333);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBeCloseTo(0.01, 2);
  });
});
