'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should fill entire tank if 'amount' is not given`, () => {
    const fuelPrice = 2;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, fuelPrice);

    expect(customer).toEqual({
      money: 2936,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  // write tests here
  it(`should fill entire tank if 'amount' is greater
    than the fuel tank can accomodate`, () => {
    const amount = 40;
    const fuelPrice = 2;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 2936,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fill only the amount of fuel
    that the customer can afford`, () => {
    const amount = 20;
    const fuelPrice = 2;
    const customer = {
      money: 20,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    });
  });

  it(`should not fill the tank when poured amount
    is only 2 liters or less`, () => {
    const amount = 20;
    const fuelPrice = 2;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    });
  });

  it(`should round the poured amount by discarding number
    to the tenth part after fueling`, () => {
    const fuelPrice = 2;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8.314,
      },
    };

    fillTank(customer, fuelPrice);

    expect(customer).toEqual({
      money: 2936.8,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39.914,
      },
    });
  });

  it(`should round the price of the purchased fuel
    to the nearest hundredth part`, () => {
    const fuelPrice = 1.845;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, fuelPrice);

    expect(customer).toEqual({
      money: 2940.96,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });
});
