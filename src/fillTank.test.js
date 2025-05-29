'use strict';

const fillTank = require('./fillTank');

describe('fillTank', () => {
  it('should be a function', () => {
    expect(typeof fillTank).toBe('function');
  });

  it('should fill full tank if amount not provided', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 20); // fuelPrice = 20

    // 10 liters × 20 = 200 → enough money → pour 10 liters
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(800);
  });

  it('should pour only what fits if amount exceeds tank capacity', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };

    fillTank(customer, 10, 10); // 10 liters requested

    // Only 5 liters will fit → 5 × 10 = 50 → enough money
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(4950);
  });

  it('should pour only what client can pay for', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 5);
    // Round down to 3.0L → 3.0 × 10 = 30
    expect(customer.vehicle.fuelRemains).toBe(3);
    expect(customer.money).toBe(0);
  });

  it('should round poured liters down to 0.1', () => {
    const customer = {
      money: 999,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 3, 333.33); // can afford 333L → round to 333.3

    expect(customer.vehicle.fuelRemains).toBe(60); // only 60 can fit
    expect(customer.money).toBeCloseTo(999 - 60 * 3, 2);
  });

  it('should NOT pour if less than 2 liters can be filled', () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 59,
      },
    };

    fillTank(customer, 10); // can pour 1L but < 2 → don't fill

    expect(customer.vehicle.fuelRemains).toBe(59);
    expect(customer.money).toBe(15);
  });

  it('should round price to 2 decimals', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 6.666, 10); // 10 × 6.666 = 66.66 → OK

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBeCloseTo(33.34, 2);
  });
});
