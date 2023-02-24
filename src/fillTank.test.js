'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('calculates 10 litres per 10  ', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 10);

    expect(customer)
      .toEqual({
        money: 2900,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 18,
        },
      });
  });

  it('fullTank without amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 2680,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it(`'amount' is greater than the tank can accommodate`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 2900,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it(`ALWAYS fill in only what the client can pay`, () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 35,
        },
      });
  });

  it(`Round the poured amount by discarding number to the tenth part.`, () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40.111,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 99,
        vehicle: {
          maxTankCapacity: 40.111,
          fuelRemains: 40.1,
        },
      });
  });

  it(`If the poured amount is less than 2 liters, do not pour at all`, () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 200,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 39,
        },
      });
  });

  it(`Round the price of the purchased fuel the to the nearest hundredth part`,
    () => {
      const customer = {
        money: 200,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 30,
        },
      };

      fillTank(customer, 10.001, 20);

      expect(customer)
        .toEqual({
          money: 99.99,
          vehicle: {
            maxTankCapacity: 40,
            fuelRemains: 40,
          },
        });
    });
});
