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

  it('should fill up to requested amount if enough space and money', () => {
    fillTank(customer, 50, 10);
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2500);
  });

  it('should fill full tank if amount is not passed', () => {
    fillTank(customer, 60);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 32 * 60);
  });

  it('should fill only what client can afford', () => {
    customer.money = 100;
    fillTank(customer, 50, 5);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should round fuel down to the nearest tenth', () => {
    customer.money = 3000;
    fillTank(customer, 123.45, 4.4);
    expect(customer.vehicle.fuelRemains).toBe(12.4);
    expect(customer.money).toBeCloseTo(3000 - 4.4 * 123.45, 2);
  });

  it('should not fill if calculated amount is less than 2 liters', () => {
    customer.money = 30;
    fillTank(customer, 20, 10);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(30); // Should remain unchanged
  });

  it('should fill only what fits even if clients can afford more', () => {
    customer.vehicle.fuelRemains = 39.5;
    fillTank(customer, 10, 5);
    expect(customer.vehicle.fuelRemains).toBe(39.5);
    expect(customer.money).toBe(3000);
  });
});
