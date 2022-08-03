'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should not return anything from the function', () => {
    const artem = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(artem, 55, 200)).toBe(undefined);
  });

  it('should fill a full tank', () => {
    const artem = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(artem, 55);
    expect(artem.vehicle.fuelRemains).toBe(40);
  });

  it('should pour only what the tank will fit', () => {
    const artem = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const initialAmountFuel = artem.vehicle.fuelRemains;

    fillTank(artem, 55, 99);

    const pouredFuelAmount = artem.vehicle.fuelRemains - initialAmountFuel;

    expect(pouredFuelAmount).toBe(32);
  });

  it('should ALWAYS fill in only what the client can pay', () => {
    const artem = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const initialAmountFuel = artem.vehicle.fuelRemains;

    fillTank(artem, 10);

    const pouredFuelAmount = artem.vehicle.fuelRemains - initialAmountFuel;

    expect(pouredFuelAmount).toBe(10);
  });

  it('should round the amount to the tenth part', () => {
    const artem = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 4.568,
      },
    };

    const initialAmountFuel = artem.vehicle.fuelRemains;

    fillTank(artem, 10);

    const pouredFuelAmount = artem.vehicle.fuelRemains - initialAmountFuel;

    expect(pouredFuelAmount).toBe(35.4);
  });

  it('should not pour at all, if the amount is less than 2', () => {
    const artem = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    const initialAmountFuel = artem.vehicle.fuelRemains;

    fillTank(artem, 10);

    const pouredFuelAmount = artem.vehicle.fuelRemains - initialAmountFuel;

    expect(pouredFuelAmount).toBe(0);
  });

  it('should round the price to the hundredth part', () => {
    const artem = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(artem, 10.8567);

    expect(artem.money).toBe(45.72);
  });
});
