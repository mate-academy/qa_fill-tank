'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');
  const fuelPrice = 50;
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

  it('function fillTank should be declared', () => {
    expect(typeof fillTank).toBe('function');
  });

  it('should fill the tank to max if amount is not provided', () => {
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should fill tank with what fit if amount is more than available', () => {
    fillTank(customer, fuelPrice, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should only fill the tank with the amount customer can afford', () => {
    customer.money = 1000;
    fillTank(customer, fuelPrice, 50);
    expect(customer.vehicle.fuelRemains).toBe(28);
    expect(customer.money).toBe(0);
  });

  it('should not fill the tank if less than 2 liters are required', () => {
    customer.money = 100;
    fillTank(customer, fuelPrice, 0.5);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(100);
  });

  it('should round down the fuel to one decimal place', () => {
    customer.money = 1000;
    fillTank(customer, fuelPrice, 20.7);
    expect(customer.vehicle.fuelRemains).toBe(28);
    expect(customer.money).toBe(0);
  });

  it('should round the price to two decimal places', () => {
    customer.money = 3000;
    fillTank(customer, 49.9999, 40);
    expect(customer.money).toBe(1400);
  });
});
