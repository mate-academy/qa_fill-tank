'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');
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

  test('fills full tank when amount is not provided', () => {
    fillTank(customer, 50); // fuelPrice = 50 per liter
    // Free space = 32 liters, money allows buying 60L, so 32L should be filled
    // Rounded to 32.0, cost = 32 * 50 = 1600
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  test('fills only what fits if amount exceeds tank space', () => {
    fillTank(customer, 50, 50); // wants 50L, only 32L space
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  test('fills only what customer can afford', () => {
    customer.money = 500; // can afford only 10L
    fillTank(customer, 50); // wants full tank (32L), but can only afford 10L
    // Rounded to 10.0, cost = 500
    expect(customer.vehicle.fuelRemains).toBe(18); // 8 + 10
    expect(customer.money).toBe(0);
  });

  test('does not fill if rounded amount is less than 2L', () => {
    customer.money = 60; // can afford only 1.2L, rounded down to 1.2 -> 1.2
    fillTank(customer, 50); // would fill 1.2L but rounded = 1.2, < 2L, so skip
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(60);
  });

  test('rounds down to nearest tenth liter', () => {
    customer.money = 1550; // can afford 31L
    fillTank(customer, 50); // 32L free space, 31L affordable
    // Rounded to 31.0
    expect(customer.vehicle.fuelRemains).toBe(8 + 31); // 39
    expect(customer.money).toBe(0);
  });

  test('rounds fuel price to nearest hundredth', () => {
    customer.money = 1000;
    fillTank(customer, 33.3333); // can afford 30L
    // Rounded = 30.0, cost = 999.999, rounded to 1000.00
    expect(customer.vehicle.fuelRemains).toBe(38);
    expect(customer.money).toBe(0);
  });

  test('fills minimum 2L if available', () => {
    customer.money = 100; // price 50, can buy 2L
    fillTank(customer, 50);
    expect(customer.vehicle.fuelRemains).toBe(10); // 8 + 2
    expect(customer.money).toBe(0);
  });

  test('fills what’s affordable even when requested less', () => {
    customer.money = 1000; // can afford 20L
    fillTank(customer, 50, 10); // only wants 10L
    expect(customer.vehicle.fuelRemains).toBe(18); // 8 + 10
    expect(customer.money).toBe(500);
  });
});
