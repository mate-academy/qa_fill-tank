'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should fuel what fits
     if 'amount' is bigger than 'maxTankCapacity'`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 1000);

    expect(customer).toStrictEqual({
      money: 600,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`if 'amount' is not given, should fuel what fits`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10);

    expect(customer).toStrictEqual({
      money: 600,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fuel only what customer can pay`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 1000);

    expect(customer).toStrictEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    });
  });

  it(`should round 'amount' to the tenth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 5.55);

    expect(customer).toStrictEqual({
      money: 945,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5.5,
      },
    });
  });

  it(`if amount < 2 should not pour at all`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 1.9);

    expect(customer).toStrictEqual({
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    });
  });

  it(`'price' should be rounded to the nearest hundredth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10.17, 11.94);

    expect(customer).toStrictEqual({
      money: 878.98,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 11.9,
      },
    });
  });

  it(`should calculate correctly, if 'fuelRemains' > 0`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20.1,
      },
    };

    fillTank(customer, 10, 5.5);

    expect(customer).toStrictEqual({
      money: 945,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 25.6,
      },
    });
  });

  it(`should not pour at all when 'amount' < 2,
        even if customer has enough money`, () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20.1,
      },
    };

    fillTank(customer, 10, 1.5);

    expect(customer).toStrictEqual({
      money: 15,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20.1,
      },
    });
  });

  it(`should not pour at all when 'amount' > 2,
        but customer can not afford on more than 2 liters`, () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20.1,
      },
    };

    fillTank(customer, 10, 50);

    expect(customer).toStrictEqual({
      money: 15,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20.1,
      },
    });
  });
});
