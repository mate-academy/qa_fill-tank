'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should fill the full tank when the 'amount' is not specified`, () => {
    const customer = {
      money: 10000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 52);

    expect(customer)
      .toEqual({
        money: 7660,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 50,
        },
      });
  });

  it(`should fill the full tank when the 'amount' > 'maxTankCapacity'`, () => {
    const customer = {
      money: 10000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 52, 50);

    expect(customer)
      .toEqual({
        money: 7660,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 50,
        },
      });
  });

  it(`should fill the tank only with what the customer can pay`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 50, 35);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 25,
        },
      });
  });

  it(`should round the 'fuelRemains' `
  + `by discarding number to the tenth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 52, 10.38);

    expect(customer)
      .toEqual({
        money: 464.4,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 15.3,
        },
      });
  });

  it(`should not fill the tank `
  + `if there to a full tank are less than 2 litres`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 1.5);

    expect(customer)
      .toEqual({
        money: 1000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 10,
        },
      });
  });

  it(`should round the price of the purchased fuel `
  + `to the nearest hundredth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 52.38, 11.7);

    expect(customer)
      .toEqual({
        money: 387.15,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 21.7,
        },
      });
  });

  it(`should withdraw the 'money' after filling the tank`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 52, 15);

    expect(customer)
      .toEqual({
        money: 220,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 35,
        },
      });
  });

  it(`should update the 'fuelRemains' after filling the tank`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 52, 30);

    expect(customer)
      .toEqual({
        money: 440,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 35,
        },
      });
  });
});
