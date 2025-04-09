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

  // eslint-disable-next-line max-len
  it('should fill the tank fully if amount is not provided and customer has enough money', () => {
    fillTank(customer, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 32 * 50);
  });

  it('should fill only up to the specified amount if it fits the tank', () => {
    fillTank(customer, 50, 10);
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(3000 - 10 * 50);
  });

  it('should not exceed the tank capacity', () => {
    fillTank(customer, 50, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 32 * 50);
  });

  it('should not fill more than the customer can afford', () => {
    customer.money = 500;
    fillTank(customer, 100, 10);
    expect(customer.vehicle.fuelRemains).toBe(8 + 5);
    expect(customer.money).toBe(500 - 5 * 100);
  });

  it('should round down fuel to the nearest tenth', () => {
    customer.money = 550;
    fillTank(customer, 105, 10);
    expect(customer.vehicle.fuelRemains).toBe(8 + 5.2);
    expect(customer.money).toBe(550 - 5.2 * 105);
  });

  it('should not fill the tank if less than 2 liters can be purchased', () => {
    customer.money = 100;
    fillTank(customer, 60, 10);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(100);
  });

  it('should round price to two decimal places', () => {
    customer.money = 550;
    fillTank(customer, 105, 10);
    expect(customer.money).toBeCloseTo(550 - 5.2 * 105, 2);
  });
});
