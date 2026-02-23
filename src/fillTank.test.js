'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  let customer;

  beforeEach(() => {
    customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
  });

  test('should fill full tank if amount is not provided', () => {
    fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(600);
  });

  test('should fill only what fits in the tank', () => {
    fillTank(customer, 10, 100);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(600);
  });

  test('should fill only what customer can afford', () => {
    customer.money = 100;
    fillTank(customer, 50);
    // freeSpace = 40, canBuy = 2, min = 2
    expect(customer.vehicle.fuelRemains).toBe(12);
    expect(customer.money).toBe(0);
  });

  test('should not fill if amount is less than 2 liters', () => {
    fillTank(customer, 10, 1.9);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(1000);
  });

  test('should discard to the tenth part for fuel amount', () => {
    customer.money = 100;
    fillTank(customer, 30);
    expect(customer.vehicle.fuelRemains).toBe(13.3);
    expect(customer.money).toBe(1);
  });

  test('should round price to the nearest hundredth', () => {
    fillTank(customer, 10.123, 2.5);
    expect(customer.money).toBe(974.69);
  });

  test('should handle zero money case', () => {
    customer.money = 0;
    fillTank(customer, 10, 10);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });
});
