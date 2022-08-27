'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it('should fill the full tanks with no amount', () => {
    const user = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(user, 29);
    expect(user.vehicle.fuelRemains).toEqual(40);
  });

  it('Should fill full tank if amount > maxTankCapacity', () => {
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

  it('Should fill in when the user has enough money', () => {
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

  it('The amount is rounded to the first decimal place', () => {
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

  it('DO not pour when the poured amount < 2', () => {
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
});
