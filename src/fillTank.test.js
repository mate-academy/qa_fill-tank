'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`fill the tank completely, if the 'amount' was not specified`, () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 4,
      },
    };

    fillTank(customer, 15);

    expect(customer)
      .toEqual({
        money: 735,
        vehicle: {
          maxTankCapacity: 55,
          fuelRemains: 55,
        },
      });
  });

  it(`fill the tank completely,if the 'amount' indicated is
  greater than 'maxTankCapacity'`, () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 4,
      },
    };

    fillTank(customer, 15, 60);

    expect(customer)
      .toEqual({
        money: 735,
        vehicle: {
          maxTankCapacity: 55,
          fuelRemains: 55,
        },
      });
  });

  it(`fill the tank only what the client can pay`, () => {
    const customer = {
      money: 600,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 4,
      },
    };

    fillTank(customer, 15, 55);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 55,
          fuelRemains: 44,
        },
      });
  });

  it(`should round the 'fuelRemains' by discarding number
  to the tenth part`, () => {
    const customer = {
      money: 592,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 4,
      },
    };

    fillTank(customer, 15, 33.86);

    expect(customer)
      .toEqual({
        money: 85,
        vehicle: {
          maxTankCapacity: 55,
          fuelRemains: 37.8,
        },
      });
  });

  it(`if there is less than 2 liters of empty space in the tank,
   do not pour at all`, () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 15, 1);

    expect(customer)
      .toEqual({
        money: 1500,
        vehicle: {
          maxTankCapacity: 55,
          fuelRemains: 30,
        },
      });
  });

  it(`should round the 'fuelPrice' of the purchased fuel
   to the nearest hundredth part`, () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 15.678, 20);

    expect(customer)
      .toEqual({
        money: 1186.44,
        vehicle: {
          maxTankCapacity: 55,
          fuelRemains: 50,
        },
      });
  });

  it(`should update 'money' and 'fuelRemains' of the customer `, () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 15, 25);

    expect(customer)
      .toEqual({
        money: 1125,
        vehicle: {
          maxTankCapacity: 55,
          fuelRemains: 35,
        },
      });
  });
});
