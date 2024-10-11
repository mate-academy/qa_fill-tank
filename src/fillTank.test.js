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

  it('should return `undefined`', () => {
    expect(fillTank(customer, 10, 1)).toBeUndefined();
  });

  it('should fill tank fully if no amount provided', () => {
    fillTank(customer, 10);

    expect(customer.money).toBeCloseTo(3000 - (40 - 8) * 10, 2);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should not exceed tank capacity if more fuel requested', () => {
    fillTank(customer, 10, 100);

    expect(customer.money).toBeCloseTo(3000 - (40 - 8) * 10, 2);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should not exceed customer\'s available money', () => {
    fillTank(customer, 500, 10);

    expect(customer.money).toBeCloseTo(0, 2);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(
      8 + Math.floor((3000 / 500) * 10) / 10, 1
    );
  });

  it('should round fuel amount and price correctly', () => {
    fillTank(customer, 100.15, 5);

    expect(customer.money).toBeCloseTo(3000 - 5 * 100.15, 2);
    expect(customer.vehicle.fuelRemains).toBe(13);
  });

  it('should not pour fuel if rounded amount is less than 2 liters', () => {
    fillTank(customer, 253, 1.9); // minimum limit is 2

    expect(customer.money).toBe(3000);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });
});
