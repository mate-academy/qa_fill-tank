'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('should fill the tank to its maximum capacity if no amount is given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - (32 * fuelPrice));
  });

  it('should fill the tank only up to the amount given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(28);
    expect(customer.money).toBe(3000 - (20 * fuelPrice));
  });

  it('should not fill the tank if the customer cannot afford the amount of fuel', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(100);
  });

  it('should not fill the tank if the amount is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    };
    const fuelPrice = 10;
    const amount = 2;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(38);
    expect(customer.money).toBe(3000);
  });
});
