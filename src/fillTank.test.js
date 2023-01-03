'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should change 'amount' of money and 'fuelReaims'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 22);

    expect(customer)
      .toEqual({
        money: 2780,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 30,
        },
      });
  });

  it(`should fill the tank fully if 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 2600,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  // eslint-disable-next-line
  it(`should fill the tank fully if 'amount' is more than tank can accommodate`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 20, 20);

    expect(customer)
      .toEqual({
        money: 800,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  // eslint-disable-next-line
  it(`should fill the tank fully if 'amount' is more than tank can accommodate`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 20, 20);

    expect(customer)
      .toEqual({
        money: 800,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it(`should fill in only what customer can buy`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 50, 20);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 30,
        },
      });
  });

  it(`if amount less than 2 liters order is declined`, () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 50, 1);

    expect(customer)
      .toEqual({
        money: 500,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 20,
        },
      });
  });

  it(`if customer can by less than 2 liters order is declined`, () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 20, 10);

    expect(customer)
      .toEqual({
        money: 15,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 20,
        },
      });
  });

  it(`should round 'amount' to the tenth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 30, 14.625);

    expect(customer)
      .toEqual({
        money: 562,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 34.6,
        },
      });
  });

  it(`should round 'price' to nearest hundrets`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 15.775, 10);

    expect(customer)
      .toEqual({
        money: 842.25,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 30,
        },
      });
  });
});
