'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  test('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  test(`should refills to full tank
  if the 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 35);

    expect(customer.vehicle.fuelRemains)
      .toEqual(40);
  });

  test(`should refill to full tank
  if the 'amount' is greater than the tank can accommodate`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 35, 48);

    expect(customer.vehicle.fuelRemains)
      .toBe(40);
  });

  test(`should not pour at all
    if the client does not have money at all`, () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 35, 15);

    expect(customer.vehicle.fuelRemains)
      .toBe(20);
  });

  test(`should fill in only what the client can pay`, () => {
    const customer = {
      money: 350,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 35, 15);

    expect(customer.vehicle.fuelRemains)
      .toBe(30);
  });

  test(`should don't pour at all
    if the poured amount is less than 2 liters`, () => {
    const customer = {
      money: 35,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 35, 1);

    expect(customer.vehicle.fuelRemains)
      .toBe(20);
  });

  test(`should don't pour at all if a customer 
    has less money than is needed for two liters of fuel`, () => {
    const customer = {
      money: 60,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 35, 2);

    expect(customer.vehicle.fuelRemains)
      .toBe(10);
  });

  test(`should don't pour at all if a customer 
    doesn't has enough free space for 2 liters of fuel`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.2,
      },
    };

    fillTank(customer, 35);

    expect(customer.vehicle.fuelRemains)
      .toBe(38.2);
  });

  test(`should round the poured amount
    by discarding number to the tenth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 35, 17.67);

    expect(customer.vehicle.fuelRemains)
      .toBe(25.6);
  });

  test(`should round the price of the purchased fuel
   the to the nearest hundredth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 35.72, 10.5);

    expect(customer.money)
      .toBe(624.94);
  });

  test(`should update the rest money after the pour `, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 35, 10);

    expect(customer.money)
      .toBe(650);
  });

  test(`should update the rest fuelRemains after the pour `, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 35, 10);

    expect(customer.vehicle.fuelRemains)
      .toBe(20);
  });

  // write tests here
});
