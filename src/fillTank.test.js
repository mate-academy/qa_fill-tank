'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should not fill tank, because it is
     already full (not given amount)`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 50);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fill tank, money is enough
    (not given amount)`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 50);

    expect(customer).toEqual({
      money: 2500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fill tank, money is not enough
    for all capacity (not given amount)`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 50);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 36,
      },
    });
  });

  it(`should fill tank, amount is greater
     than the tank can accommodate`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 50, 15);

    expect(customer).toEqual({
      money: 2500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should not fill tank, because poured amount
    is less than 2 liters`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 50, 15);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    });
  });

  it(`should not fill tank, because price per liter is too much`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 500, 15);

    expect(customer).toEqual({
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    });
  });

  it(`should fill tank, round the price of the purchased
     fuel to the nearest hundredth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 29.888, 10);

    expect(customer).toEqual({
      money: 701.12,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });
});
