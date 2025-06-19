'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill the tank to full if amount is not specified', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 25;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should pour only what fits when amount exceeds capacity', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 35,
      },
    };

    const fuelPrice = 25;
    const amount = 45;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(60);
    expect(customer.money).toBe(1375);
  });

  it('should pour only what the customer can afford', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 5,
      },
    };

    const fuelPrice = 25;
    const amount = 45;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(25);
    expect(customer.money).toBe(0);
  });

  it('should round down poured amount to the nearest tenth', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 5,
      },
    };

    const fuelPrice = 25;
    const amount = 20.3;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(25);
    expect(customer.money).toBe(0);
  });

  it('should round price to nearest hundredth', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 25.1234;
    const amount = 5;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(874.38);
  });
});
