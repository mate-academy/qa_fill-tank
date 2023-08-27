'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it('should return nothing', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 100))
      .toEqual(undefined);
  });

  it('should consider the full tank as default value for amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1);

    expect(customer.vehicle.fuelRemains)
      .toEqual(40);
  });

  it('should pour only what will fit, '
    + 'if the amount is greater than the tank can accommodate', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 100);

    expect(customer)
      .toEqual({
        money: 2680,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it('should pour only what the client can pay', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 32);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 38,
        },
      });
  });

  it(
    'should rounds the poured amount by discarding number to the tenth part',
    () => {
      const customer = {
        money: 300,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 10, 20.505);

      expect(customer)
        .toEqual({
          money: 95,
          vehicle: {
            maxTankCapacity: 40,
            fuelRemains: 28.5,
          },
        });
    }
  );

  it('should not pour, if the poured amount is less than 2 liters', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer)
      .toEqual({
        money: 300,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      });
  });

  it('should round the price of the purchased fuel '
    + 'the to the nearest hundredth part', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 9.9994, 10);

    expect(customer)
      .toEqual({
        money: 200.01,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 18,
        },
      });
  });
});
