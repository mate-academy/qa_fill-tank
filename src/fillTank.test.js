'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should return undefined', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 0)).toBeUndefined();
  });

  it(`should full tank when 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20);

    expect(customer).toEqual({
      money: 2360,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should tank 'maxTankCapacity' - 'fuelRemains'`
    + `if 'amount' > 'maxTankCapacity'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 55, 45);

    expect(customer).toEqual({
      money: 1240,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should always fill in <= 'money'`, () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20, 32);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    });
  });

  it(`should round poured 'amount' to the tenth part`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20, 11.11);

    expect(customer).toEqual({
      money: 1778,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 19.1,
      },
    });
  });

  it(`should not to refuel if 'amount' < 2`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20, 1);

    expect(customer).toEqual({
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`should round 'fuelPrice' to the nearest hundredth part`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 11.11, 32);

    expect(customer).toEqual({
      money: 1644.48,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });
});
