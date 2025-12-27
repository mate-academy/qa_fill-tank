'use strict';
/* eslint-disable max-len */

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  const getCustomer = (money, maxTankCapacity, fuelRemains) => {
    return {
      money,
      vehicle: {
        maxTankCapacity,
        fuelRemains,
      },
    };
  };

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should full tank a vehicle if amount is not given', () => {
    const customer = getCustomer(3000, 40, 8);
    const fuelPrice = 40;

    fillTank(customer, fuelPrice);

    expect(customer)
      .toEqual({
        money: 1720,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it('should pour only what will fit if amount exceeds tank capacity', () => {
    const customer = getCustomer(3000, 40, 32);
    const fuelPrice = 40;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer)
      .toEqual({
        money: 2680,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it('should pour only what client can pay', () => {
    const customer = getCustomer(400, 40, 8);
    const fuelPrice = 40;
    const amount = 32;

    fillTank(customer, fuelPrice, amount);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 18,
        },
      });
  });

  it('should round the poured amount by discarding number to the tenth part', () => {
    const customer = getCustomer(270, 40, 0);
    const fuelPrice = 40;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer)
      .toEqual({
        money: 2,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 6.7,
        },
      });
  });

  it('should round the price of the purchased fuel to the nearest hundredth part', () => {
    const customer = getCustomer(3000, 40, 0);
    const fuelPrice = 37.777;
    const amount = 15;

    fillTank(customer, fuelPrice, amount);

    expect(customer)
      .toEqual({
        money: 3000 - 566.66,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 15,
        },
      });
  });

  it('should not pour at all if the poured amount is less than 2 liters', () => {
    const customer = getCustomer(3000, 40, 0);
    const fuelPrice = 40;
    const amount = 1;

    fillTank(customer, fuelPrice, amount);

    expect(customer)
      .toEqual({
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 0,
        },
      });
  });

  it('should not pour at all if the poured amount is less than 2 liters', () => {
    const customer = getCustomer(50, 40, 0);
    const fuelPrice = 40;

    fillTank(customer, fuelPrice);

    expect(customer)
      .toEqual({
        money: 50,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 0,
        },
      });
  });
});
