'use strict';

describe(`'fillTank' function`, () => {
  const { fillTank } = require('./fillTank');

  it(`should fill to full tank if 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 60);

    expect(customer).toEqual({
      money: 1080,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fill only available tank space
    if 'amount' exceeds capacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 60, 40);

    expect(customer).toEqual({
      money: 1080,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fill only what the 'customer' can pay for`, () => {
    const customer = {
      money: 960,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 60, 40);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 24,
      },
    });
  });

  it(`should round poured 'amount' down to the nearest tenth`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 60, 25.68);

    expect(customer).toEqual({
      money: 1464,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 33.6,
      },
    });
  });

  it(`should not pour if rounded 'amount' is less than 2 'liters'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 60, 1.8);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`should round the 'price' to the nearest hundredth`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 60.125, 10.1);

    expect(customer).toEqual({
      money: 2392.74,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18.1,
      },
    });
  });
});
