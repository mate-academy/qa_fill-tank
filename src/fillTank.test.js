'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`fills exact amount if enough money and space`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 32);

    expect(customer).toEqual({
      money: 1720,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`fills to max if amount exceeds capacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 35);

    expect(customer).toEqual({
      money: 1720,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`fills to max if enough money, no amount`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40);

    expect(customer).toEqual({
      money: 1720,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`fills partially if not enough money, no amount`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10.5,
      },
    });
  });

  it('skips fill if amount < 2L ', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 1);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`skips fill if money not enough for 2L`, () => {
    const customer = {
      money: 60,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 5);

    expect(customer).toEqual({
      money: 60,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`fills partially if money not enough for amount but enough > 2L`, () => {
    const customer = {
      money: 85,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 5);

    expect(customer).toEqual({
      money: 1,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10.1,
      },
    });
  });

  it(`handles decimal fuel price`, () => {
    const customer = {
      money: 287.34,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30.213, 5);

    expect(customer).toEqual({
      money: 136.27,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 13,
      },
    });
  });

  it(`handles decimal amount`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 5.5);

    expect(customer).toEqual({
      money: 245,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 13.5,
      },
    });
  });
});
