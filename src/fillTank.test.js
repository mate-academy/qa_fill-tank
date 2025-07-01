'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(typeof fillTank).toBe('function');
  });

  it('should have 2 required parameters', () => {
    expect(fillTank.length).toBe(2);
  });

  it('should return nothing', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 10)).toBeUndefined();
  });

  it('should return full tank if amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill tank to capacity if amount is excessive', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill in only what the client can pay', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1000, 10);
    expect(customer.vehicle.fuelRemains).toBe(11);
  });

  it('should round poured amount to tenth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1000, 10.3);
    expect(customer.vehicle.fuelRemains).toBe(11);
  });

  it('should not pour less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1000, 1.9);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('should round price to nearest hundredth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1.23456, 10);
    expect(customer.money).toBe(2987.65);
  });
});
