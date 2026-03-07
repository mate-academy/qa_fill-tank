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

  test('should fill full tank if amount is not given', () => {
    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  test('should not pour more than tank capacity allows', () => {
    fillTank(customer, 50, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  test('should fill only amount customer can pay for', () => {
    customer.money = 100;

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  test('should round poured fuel down to tenth', () => {
    fillTank(customer, 33, 10);

    expect(customer.vehicle.fuelRemains).toBe(18);
  });

  test('should not pour fuel if amount is less than 2 liters', () => {
    fillTank(customer, 50, 1.5);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  test('should round fuel price to nearest hundredth', () => {
    customer.money = 100;

    fillTank(customer, 33.333, 3);

    expect(customer.money).toBeLessThan(100);
  });
});
