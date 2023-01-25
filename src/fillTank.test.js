'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill full tank, if amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 6);

    expect(customer).toEqual({
      money: 2808,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should pour only what will fit, if amount is greater tank capacity',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 35,
        },
      };

      fillTank(customer, 5, 10);

      expect(customer).toEqual({
        money: 2975,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
    });

  it('should not fill, if customer can`t pay',
    () => {
      const customer = {
        money: 4,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 35,
        },
      };

      fillTank(customer, 5, 10);

      expect(customer).toEqual({
        money: 4,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 35,
        },
      });
    });

  it('should round the poured amount by discarding number to the tenth part.',
    () => {
      const customer = {
        money: 2500,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 30,
        },
      };

      fillTank(customer, 5, 3.556);

      expect(customer).toEqual({
        money: 2482.5,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 33.5,
        },
      });
    });

  it('should not fill, if poured amount less than 2 liters',
    () => {
      const customer = {
        money: 2500,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 39,
        },
      };

      fillTank(customer, 5, 10);

      expect(customer).toEqual({
        money: 2500,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 39,
        },
      });
    });

  it('should round the price of the fuel the to the nearest hundredth part',
    () => {
      const customer = {
        money: 2500,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 20,
        },
      };

      fillTank(customer, 3.336, 3.32);

      expect(customer).toEqual({
        money: 2488.99,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 23.3,
        },
      });
    });
});
