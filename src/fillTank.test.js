'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  test('fills full tank when no amount is given', () => {
    fillTank(customer, 50); // 50 per liter, no amount specified

    // Free space = 32L, but canBuy = 3000 / 50 = 60L → limited by tank
    // Should fill 32L exactly
    expect(customer.vehicle.fuelRemains).toBeCloseTo(40);
    expect(customer.money).toBeCloseTo(3000 - (32 * 50), 2);
  });

  test('does not exceed tank capacity when amount > free space', () => {
    fillTank(customer, 10, 50); // wants 50L but tank has space for 32L
    expect(customer.vehicle.fuelRemains).toBeCloseTo(40);
    expect(customer.money).toBeCloseTo(3000 - (32 * 10), 2);
  });

  test('fills only what customer can afford', () => {
    customer.money = 200; // can afford 20L at 10 per L
    fillTank(customer, 10, 50);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(8 + 20);
    expect(customer.money).toBeCloseTo(0, 2);
  });

  test('rounds down fuel to 0.1L precision', () => {
    fillTank(customer, 7, 3.456); // requests 3.456L
    // Rounded down to 3.4L
    expect(customer.vehicle.fuelRemains).toBeCloseTo(8 + 3.4);
    expect(customer.money).toBeCloseTo(3000 - (3.4 * 7), 2);
  });

  test('does not fill if rounded amount < 2L', () => {
    fillTank(customer, 5, 1.999); // rounded to 1.9 < 2
    expect(customer.vehicle.fuelRemains).toBe(8); // unchanged
    expect(customer.money).toBe(3000); // unchanged
  });

  test('rounds fuel cost to nearest hundredth', () => {
    fillTank(customer, 7.123, 5);

    const spent = 5 * 7.123;

    const roundedSpent = Math.round(spent * 100) / 100;

    expect(customer.money).toBeCloseTo(3000 - roundedSpent, 2);
  });

  test('fills correct amount when limited by both money and tank', () => {
    customer.money = 500;
    fillTank(customer, 20, 50);
    // canBuy = 25L, free space = 32L → should fill 25L
    expect(customer.vehicle.fuelRemains).toBeCloseTo(8 + 25);
    expect(customer.money).toBeCloseTo(0, 2);
  });
});
