'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('is a declared function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('completes tank refill when amount is not specified', () => {
    const customer = {
      money: 4200,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 12,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(3820);
  });

  it('limits amount based on money', () => {
    const customer = {
      money: 260,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(41);
    expect(customer.money).toBe(0);
  });

  it('limits by tank capacity even if amount is too large', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 9, 100);

    expect(customer.vehicle.fuelRemains).toBe(60);
    expect(customer.money).toBe(5000 - (40 * 9));
  });

  it('does not pour if requested amount is under 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 44,
      },
    };

    fillTank(customer, 10, 1.8);

    expect(customer.vehicle.fuelRemains).toBe(44);
    expect(customer.money).toBe(1000);
  });

  it('returns undefined', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };

    const result = fillTank(customer, 10);

    expect(result).toBeUndefined();
  });

  it('rounds fuel amount down to nearest tenth', () => {
    const customer = {
      money: 268,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10.1);

    expect(customer.vehicle.fuelRemains).toBe(36.5);
    expect(customer.money).toBeCloseTo(0.35);
  });

  it('does not pour if less than 2 liters would fit in tank', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.1,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(38.1);
    expect(customer.money).toBe(1000);
  });

  it('rounds total fuel cost to nearest hundredth', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 3.333, 3);

    expect(customer.money).toBeCloseTo(990);
    expect(customer.vehicle.fuelRemains).toBe(23);
  });

  it('handles exact pricing with decimals correctly', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 9.99, 13);

    expect(customer.money).toBeCloseTo(4870.13);
    expect(customer.vehicle.fuelRemains).toBe(43);
  });
});
