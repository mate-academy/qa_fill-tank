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

  it(`should return 'undefined'`, () => {
    expect(fillTank(customer, 10, 1)).toBeUndefined();
  });

  it(`should refill ordered 'amount'`, () => {
    fillTank(customer, 100, 5);

    expect(customer.money).toBe(2500);
    expect(customer.vehicle.fuelRemains).toBe(13);
  });

  it(`should refill the full tank`, () => {
    fillTank(customer, 10);

    expect(customer.money).toBe(2680);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should not overflow the tank`, () => {
    fillTank(customer, 10, 100);

    expect(customer.money).toBe(2680);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`shouldn't exceed available money limit`, () => {
    fillTank(customer, 500, 10);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(14);
  });

  it(`should round poured amount`, () => {
    fillTank(customer, 145.87);

    expect(customer.money).toBeCloseTo(9.66, 2);
    expect(customer.vehicle.fuelRemains).toBe(28.5);
  });

  it(`should round price`, () => {
    fillTank(customer, 100.15, 5);

    expect(customer.money).toBe(2499.25);
    expect(customer.vehicle.fuelRemains).toBe(13);
  });

  it(`shouldn't pour less than the minimum limit`, () => {
    fillTank(customer, 253, 1.9);

    expect(customer.money).toBe(3000);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });
});
