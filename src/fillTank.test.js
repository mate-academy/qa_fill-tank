'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should fill the vehicle to full tank when
    amount is not provided (larger capacity and money)`, () => {
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

    expect(customer.money).toBe(1400);
  });

  it(`should only pour what will fit if
    the requested amount exceeds the tank capacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    const fuelPrice = 50;
    const requestedAmount = 30;

    fillTank(customer, fuelPrice, requestedAmount);

    expect(customer.vehicle.fuelRemains).toBe(40);

    expect(customer.money).toBe(2000);
  });

  it(`should only fill what the customer can afford,
    even if the requested amount or tank capacity is greater`,
  () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 50;
    const requestedAmount = 30;

    fillTank(customer, fuelPrice, requestedAmount);

    expect(customer.vehicle.fuelRemains).toBe(20);

    expect(customer.money).toBe(0);
  });

  it(`should only fill what the customer can afford,
    truncating the poured amount to the nearest tenth`,
  () => {
    const customer = {
      money: 505,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 50;
    const requestedAmount = 30;

    fillTank(customer, fuelPrice, requestedAmount);

    expect(Math.floor(customer.vehicle.fuelRemains)).toBe(20);

    expect(customer.money).toBe(0);
  });

  it(`should not fill if the poured amount
     is less than 2 liters, after truncation`,
  () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    const fuelPrice = 50;
    const requestedAmount = 30;

    fillTank(customer, fuelPrice, requestedAmount);

    expect(customer.vehicle.fuelRemains).toBe(39);

    expect(customer.money).toBe(50);
  });

  it(`should correctly round the price
    of the purchased fuel to the nearest hundredth`,
  () => {
    const customer = {
      money: 1050,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    const fuelPrice = 47.45;
    const requestedAmount = 10;

    fillTank(customer, fuelPrice, requestedAmount);

    expect(customer.vehicle.fuelRemains).toBe(40);

    expect(customer.money).toBe(575.50);
  });
});
