'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill the tank to its maximum'
    + ' capacity if no amount is specified', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should not exceed the tank capacity when'
    + ' the specified amount is greater than the free space', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should only fill as much fuel as the customer can pay for', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 40);

    expect(customer.vehicle.fuelRemains).toBe(11);
  });

  it('should round the poured fuel amount down to the nearest tenth', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8.6,
      },
    };

    fillTank(customer, 10, 11.2);

    expect(customer.vehicle.fuelRemains).toBe(11.6);
  });

  it('should not pour fuel if the rounded amount is less than 2 liters', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 16, 40);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('should round the price of the'
    + ' purchased fuel to the nearest hundredth', () => {
    const customer = {
      money: 305.3,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 16.2, 40);

    expect(customer.money).toBeCloseTo(0.74, 2);
  });
});
