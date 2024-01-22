'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should return nothing', () => {
    expect(fillTank(
      {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      },
      50
    )).toBe(undefined);
  });

  it('should change quantity of money and fuel', () => {
    const tank = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(tank, 50);

    expect(tank).toHaveProperty('money', 1400);

    expect(tank.vehicle)
      .toHaveProperty('fuelRemains', tank.vehicle.maxTankCapacity);
  });

  it('should not change quantity of money and fuel', () => {
    const tank = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(tank, 50, 1);

    expect(tank).toHaveProperty('money', 3000);
    expect(tank.vehicle).toHaveProperty('fuelRemains', 8);
  });

  it('should change quantity of money and fuel', () => {
    const tank = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(tank, 50, 20);

    expect(tank).toHaveProperty('money', 2000);
    expect(tank.vehicle).toHaveProperty('fuelRemains', 28);
  });
});
