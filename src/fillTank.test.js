'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`'amount' is undefined -> order full tank`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 1);

    expect(customer).toEqual({
      money: 3000 - 40 * 1,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`'amount' > remain tank volume -> order full tank`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 1, 50);

    expect(customer).toEqual({
      money: 3000 - 40 * 1,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`'money' < 'price' -> fill in only what the client can pay`, () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 2, 50);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 15,
      },
    });
  });

  it(`round fuel amount to the tenth part`, () => {
    const customer = {
      money: 215,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 100);

    expect(customer).toEqual({
      money: 5,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 2.1,
      },
    });
  });

  it(`'amount' < 2 -> don't fill`, () => {
    const customer = {
      money: 190,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 100);

    expect(customer).toEqual({
      money: 190,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    });
  });

  it(`round 'price' to the hundredth  part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 7.7,
      },
    };

    const price = 53.99;
    const fillAmount = customer.vehicle.maxTankCapacity
      - customer.vehicle.fuelRemains;

    fillTank(customer, price);

    expect(customer).toEqual({
      money: 1000 - Math.round(fillAmount * price * 100) / 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 10,
      },
    });
  });
});
