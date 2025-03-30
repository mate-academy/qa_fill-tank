/* eslint-disable max-len */
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

  it('should fill tank to full capacity when no amount specified', () => {
    const fuelPrice = 1.50;

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2952);
  });

  it('should fill requested amount when less than free space', () => {
    const fuelPrice = 2.00;

    fillTank(customer, fuelPrice, 10);
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2980);
  });

  it('should fill only available space when amount exceeds capacity', () => {
    const fuelPrice = 1.75;

    fillTank(customer, fuelPrice, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2944);
  });

  it('should fill only what customer can afford', () => {
    customer.money = 20;

    const fuelPrice = 2.50;

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(16);
    expect(customer.money).toBe(0);
  });

  it('should not fill if amount less than 2 liters', () => {
    const fuelPrice = 2.00;

    fillTank(customer, fuelPrice, 1.5);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should round fuel amount to one decimal place', () => {
    const fuelPrice = 1.33;

    fillTank(customer, fuelPrice, 10.77);
    expect(customer.vehicle.fuelRemains).toBe(18.7);
    expect(customer.money).toBeCloseTo(2985.77, 2);
  });

  it('should round price to two decimal places', () => {
    const fuelPrice = 1.555;

    fillTank(customer, fuelPrice, 5);
    expect(customer.vehicle.fuelRemains).toBe(13);
    expect(customer.money).toBeCloseTo(2992.22, 2); // Explicitly expect the rounded value
  });

  it('should not fill when affordable amount is less than 2 liters', () => {
    customer.money = 3;

    const fuelPrice = 2.00;

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(8); // unchanged (3/2 = 1.5 < 2 minimum)
    expect(customer.money).toBe(3); // unchanged
  });

  it('should handle zero amount request', () => {
    const fuelPrice = 1.50;

    fillTank(customer, fuelPrice, 0);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });
});
