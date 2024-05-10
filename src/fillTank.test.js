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

  it('should fill the tank completely when enough money is available', () => {
    fillTank(customer, 2, 20);
    expect(customer.vehicle.fuelRemains).toBe(28);
    expect(customer.money).toBe(2960);
  });

  it('should fill the tank partially when enough money'
  + ' is available but limited space in the tank', () => {
    fillTank(customer, 2, 32);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2936);
  });

  it('should fill the tank partially when limited money is available', () => {
    fillTank(customer, 2, 24);
    expect(customer.vehicle.fuelRemains).toBe(32);
    expect(customer.money).toBe(2952);
  });

  it('should not fill the tank if the rounded amount is less than 2', () => {
    fillTank(customer, 100, 1);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should not fill the tank if the amount is negative', () => {
    fillTank(customer, 100, -10);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should not fill the tank if the customer has insufficient money', () => {
    fillTank(customer, 100, Infinity);
    expect(customer.vehicle.fuelRemains).toBe(38);
    expect(customer.money).toBe(0);
  });

  it('should not fill the tank if the tank is already full', () => {
    customer.vehicle.fuelRemains = 40;
    fillTank(customer, 2, Infinity);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000);
  });

  it('should round the filled amount to the nearest 0.1', () => {
    fillTank(customer, 2, 15);
    expect(customer.vehicle.fuelRemains).toBe(23);
  });

  it('should round the total price to two decimal places', () => {
    fillTank(customer, 1.234, 10);
    expect(customer.money).toBeCloseTo(2987.66);
  });
});
