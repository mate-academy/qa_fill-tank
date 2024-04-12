'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it(`should fill maxTankCapacity without amount`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should fill maxTankCapacity when amount > maxTankCapacity`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;
    const amount = 41;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should fill only the amount, the customer can afford`, () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;
    const amount = 30;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(28);
  });

  it(`should round floor filled amount to decimals`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;
    const amount = 20.7777;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(28.7);
  });

  it(`should not fill the customer when amount < 2`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;
    const amount = 1.9;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it(`should round cost of filled fuel to nearest hundredth`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 9.555;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(404.45);
  });
});
