'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  let customer;

  beforeEach(() => {
    customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
  });

  it('fills tank to full when amount not provided', () => {
    fillTank(customer, 2); // amount not provided
    expect(customer.vehicle.fuelRemains).toBeCloseTo(50);
    expect(customer.money).toBeCloseTo(20);
  });

  it('truncates and fills requested amount when < free space and affordable', () => { ... }); 
    fillTank(customer, 2, 5);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(15);
    expect(customer.money).toBeCloseTo(90);
  });

  it('caps fill when amount exceeds free space', () => {
    fillTank(customer, 2, 100);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(50);
    expect(customer.money).toBeCloseTo(20);
  });

  it('fills exactly free space when amount equals free space', () => {
    fillTank(customer, 2, 40);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(50);
    expect(customer.money).toBeCloseTo(20);
  });

  it('truncates fuel to 0.1 (discard extra precision)', () => {
    customer.money = 10;
    customer.vehicle.fuelRemains = 0;
    fillTank(customer, 3); // 10/3 ≈ 3.333 → 3.3
    expect(customer.vehicle.fuelRemains).toBeCloseTo(3.3);
  });

  it('rounds price to 2 decimal places correctly', () => {
    customer.money = 10;
    customer.vehicle.fuelRemains = 0;
    fillTank(customer, 3); // fuel = 3.3 → cost = 9.9
    expect(customer.money).toBeCloseTo(0.10);
  });

  it('rounds price correctly near 0.005 boundary - down', () => {
    customer.money = 10.004;
    customer.vehicle.fuelRemains = 0;
    fillTank(customer, 1); // 10.004/1 = 10.004 L → truncated 10.0
    expect(customer.money).toBeCloseTo(0.00);
  });

  it('rounds price correctly near 0.005 boundary - up', () => {
    customer.money = 10.005;
    customer.vehicle.fuelRemains = 0;
    fillTank(customer, 1); // 10.005 L → truncated 10.0
    expect(customer.money).toBeCloseTo(0.01);
  });

  it('does not fill tank if truncated amount < 2.0 L', () => {
    customer.money = 3;
    fillTank(customer, 2); // can buy 1.5 L < 2 → no fill
    expect(customer.vehicle.fuelRemains).toBeCloseTo(10);
    expect(customer.money).toBeCloseTo(3);
  });

  it('fills minimum 2.0 L if truncation allows', () => {
    customer.money = 4.1;
    fillTank(customer, 2); // 4.1/2 = 2.05 → truncated 2.0 → pour
    expect(customer.vehicle.fuelRemains).toBeCloseTo(12);
    expect(customer.money).toBeCloseTo(0.1);
  });

  it('does nothing if tank already full', () => {
    customer.vehicle.fuelRemains = 50;
    fillTank(customer, 2, 10);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(50);
    expect(customer.money).toBeCloseTo(100);
  });

  it('does nothing if customer has no money', () => {
    customer.money = 0;
    fillTank(customer, 2, 10);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(10);
    expect(customer.money).toBeCloseTo(0);
  });

  it('does nothing if insufficient funds to buy at least 2 L', () => {
    customer.money = 3.9;
    fillTank(customer, 2, 10); // can buy 1.95 → truncated 1.9 < 2 → no fill
    expect(customer.vehicle.fuelRemains).toBeCloseTo(10);
    expect(customer.money).toBeCloseTo(3.9);
  });

  it('returns undefined explicitly', () => {
    const result = fillTank(customer, 2, 5);
    expect(result).toBeUndefined();
  });
});

