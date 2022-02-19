'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  test('Should fill full tank if amount is undefined', () => {
    const user = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(user, 29, undefined);
    expect(user.vehicle.fuelRemains).toEqual(40);
  });

  test('Should fill full tank if amount > maxTankCapacity', () => {
    const user = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(user, 29, 33);
    expect(user.vehicle.fuelRemains).toEqual(40);
  });

  test('Should fill in only what the client can pay', () => {
    const user = {
      money: 90,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(user, 30, 4);
    expect(user.vehicle.fuelRemains).toEqual(11);
  });

  test('Round the poured amount by discarding number to the tenth part', () => {
    const user = {
      money: 90,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(user, 29, 4);
    expect(user.vehicle.fuelRemains).toEqual(11.1);
  });

  test('If the poured amount is less than 2 liters, do not pour at all', () => {
    const user = {
      money: 59,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(user, 30, 2);
    expect(user.vehicle.fuelRemains).toEqual(8);
  });

  it('Round the price of the purchased fuel the to the nearest hundredth part',
    () => {
      const user = {
        money: 600,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };
      const fuelPrice = 30.393;
      const amount = 5;
      const result = Math.round(fuelPrice * amount * 100);
      const price = result / 100;

      fillTank(user, fuelPrice, amount);
      expect(price).toEqual(151.97);
    });
});
