'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('should be declared as a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill a full tank if amount is not given', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1000 - 300); // 30 * 10
  });

  it('should not exceed max tank capacity', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 10, 5);

    expect(customer.vehicle.fuelRemains).toBe(39); // 1л < 2л, не заправляє
    expect(customer.money).toBe(1000);
  });

  it('should not fill if canBuy < 2 liters after rounding', () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 5); // 15 / 10 = 1.5 → мало

    expect(customer.vehicle.fuelRemains).toBe(0);
    expect(customer.money).toBe(15);
  });

  it(
    'should fill only what is possible if amount > tank and money limit',
    () => {
      const customer = {
        money: 500,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 40,
        },
      };

      fillTank(customer, 10, 15); // 10 літрів максимум по баку

      expect(customer.vehicle.fuelRemains).toBe(50);
      expect(customer.money).toBe(500 - 100); // 10л * 10
    });

  it('should round fuel to 1 decimal and price to 2 decimals', () => {
    const customer = {
      money: 12,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2.345);

    expect(customer.vehicle.fuelRemains).toBe(15.1); // округлено до 1 знаку
    expect(customer.money).toBeCloseTo(12 - 11.96, 2); // 5.1 * 2.345 = 11.96
  });

  it('should not fill fuel if result < 2 liters after rounding', () => {
    const customer = {
      money: 5,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 4);

    expect(customer.vehicle.fuelRemains).toBe(10); // 1.25л < 2 → нічого
    expect(customer.money).toBe(5);
  });
});
