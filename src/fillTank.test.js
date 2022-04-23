'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should order a full tank if amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 15);

    expect(customer).toEqual({
      money: 2520,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill only as much as will fit if amount > maxTankCapacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 15, 42);

    expect(customer).toEqual({
      money: 2520,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('should fill only amount which customer can pay for', () => {
    const customer = {
      money: 420,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 15, 32);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 36,
      },
    });
  });

  it('should round the poured amount by discarding number to the tenth part',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 15, 3.6);

      expect(customer).toEqual({
        money: 2946,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 11.6,
        },
      });
    });

  it('should not fill tank if amount < 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 15, 1);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it('should fill the rounded amount for fuel in hundredths', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 15.5, 11);

    expect(customer).toEqual({
      money: 2829.5,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 19,
      },
    });
  });
});
