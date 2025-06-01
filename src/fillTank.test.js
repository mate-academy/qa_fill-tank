'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should ', () => {

  });

  // write tests here
  it('amount is miss = fuelRemains all ', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should give fuel only what will fit, if ampount maxTankCapacity>', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 50;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fit fuel = money of customer', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 50;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(28);
  });

  it('should not refuel if customer can buy less than 2 liters', () => {
    const customer = {
      money: 90,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 50;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('should refuel if customer can buy = 2 liters', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 50;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(10);
  });
});
