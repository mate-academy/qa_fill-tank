'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should fill the tank fully when no amount
     is provided and the customer has enough money`, () => {
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

  it(`should only fill the tank with the amount specified
    when there is enough space and money`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(1500);
  });

  it(`should only fill up to the maximum tank
    capacity if the amount is more than the available space`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };
    const fuelPrice = 50;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2750);
  });

  it(`should only fill what the
    customer can afford when money is limited`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(14);
    expect(customer.money).toBe(0);
  });

  it(`should not fill fuel if the
    calculated amount is less than 2 liters`, () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(39);
    expect(customer.money).toBe(50);
  });

  it(`should round the poured fuel to the nearest tenth`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 53;
    const amount = 9.567;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(19.5);
    expect(customer.money).toBe(496.5);
  });

  it(`should not exceed the customer's money even when rounding price`, () => {
    const customer = {
      money: 530,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };
    const fuelPrice = 53;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(0);
  });
});
