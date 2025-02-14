'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill the tank to full capacity when no amount is given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 5;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - ((40 - 8) * 5));
  });

  it('should fill only what the tank can accommodate', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };
    const fuelPrice = 5;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - (5 * 5));
  });

  it('should fill only what the customer can pay for', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 5;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(0);
  });

  it('should not fill if the amount is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 5;
    const amount = 1.5;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should round the poured amount to the nearest tenth', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 5;
    const amount = 7.67;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(15.6);
    expect(customer.money).toBe(3000 - (7.6 * 5));
  });

  it('should round the price to the nearest hundredth', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 5.666;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBeCloseTo(2943.34, 2);
  });
});
