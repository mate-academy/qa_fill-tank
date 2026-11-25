'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared ', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill full tank for no amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 50;

    const expectedCustomer = {
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    expect(fillTank(customer, fuelPrice)).toBe(undefined);

    expect(customer).toEqual(expectedCustomer);
  });

  it('should fill full tank for amount > maxTankCapacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 50;

    const amount = 50;

    const expectedCustomer = {
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    expect(fillTank(customer, fuelPrice, amount)).toBe(undefined);

    expect(customer).toEqual(expectedCustomer);
  });

  it(
    'should always round the price of the purchased' +
      +'fuel the to the nearest hundredth part',

    () => {
      const customer = {
        money: 2000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 2,
        },
      };

      const fuelPrice = 43.765432;

      const amount = 11;

      const expectedCustomer = {
        money: 1518.58,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 13,
        },
      };

      expect(fillTank(customer, fuelPrice, amount)).toBe(undefined);

      expect(customer).toEqual(expectedCustomer);
    },
  );

  it('should not pour at all, if the amount is < 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 50;

    const amount = 1;

    const expectedCustomer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, fuelPrice, amount)).toBe(undefined);

    expect(customer).toEqual(expectedCustomer);
  });

  it(
    'should round the poured amount by discarding' + 'number to the tenth part',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      const fuelPrice = 50;

      const amount = 7.19;

      const expectedCustomer = {
        money: 2645,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 15.1,
        },
      };

      expect(fillTank(customer, fuelPrice, amount)).toBe(undefined);

      expect(customer).toEqual(expectedCustomer);
    },
  );

  it('should always fill in only what the client can pay', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 2,
      },
    };

    const fuelPrice = 50;

    const amount = 60;

    const expectedCustomer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 42,
      },
    };

    expect(fillTank(customer, fuelPrice, amount)).toBe(undefined);

    expect(customer).toEqual(expectedCustomer);
  });
});
