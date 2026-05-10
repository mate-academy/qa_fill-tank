'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');
  const fuelPrice = 10;
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

  it('should be declared', () => {
    expect(fillTank).toBeDefined();
  });

  it('should not return anything', () => {
    expect(fillTank(customer, fuelPrice)).toBeUndefined();
  });

  it('should fill to max capacity if no amount specified', () => {
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(600);
  });

  it('should not fill if amount is less than 2 liters', () => {
    fillTank(customer, fuelPrice, 1.5);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(1000);
  });

  it('should fill only what fits in the tank', () => {
    fillTank(customer, fuelPrice, 100);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(600);
  });

  it('should fill only what customer can afford', () => {
    customer.money = 100;
    fillTank(customer, fuelPrice, 40);
    expect(customer.vehicle.fuelRemains).toBe(20);
    expect(customer.money).toBe(0);
  });

  it('should discard fuel digits beyond the tenth part', () => {
    customer.money = 255;
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(35.5);
  });
});
