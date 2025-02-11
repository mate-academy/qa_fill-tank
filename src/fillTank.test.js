'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('should not fill if roundedAmount < 2', () => {
    const customer = {
      money: 1,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 45,
      },
    };

    fillTank(customer, 2, 1);
    expect(customer.vehicle.fuelRemains).toBe(45);
  });

  it('should round the cost to the nearest hundredth', () => {
    const customer = {
      money: 1,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 40,
      },
    };

    fillTank(customer, 1.99, 5);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should round fuel down to the nearest tenth', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 45,
      },
    };

    fillTank(customer, 2, 3);
    expect(customer.vehicle.fuelRemains).toBe(48);
  });

  it('should not exceed max tank capacity', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 45,
      },
    };

    fillTank(customer, 2, 10);
    expect(customer.vehicle.fuelRemains).toBe(50);
  });

  it('should fill the tank completely if amount is not provided', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 30,
      },
    };

    fillTank(customer, 2);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(30);
  });

  it('should only fill what the customer can buy', () => {
    const customer = {
      money: 5,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 40,
      },
    };

    fillTank(customer, 2, 10);
    expect(customer.vehicle.fuelRemains).toBe(42.5);
    expect(customer.money).toBe(0);
  });
});
