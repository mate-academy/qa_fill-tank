'use strict';

describe('fillTank', () => {
  // customer, priceFuel, amount Fuel
  const { fillTank } = require('./fillTank');

  it(
    'should ' +
      'Round the poured amount by discarding number to the tenth part.' +
      '12.34 -> 12.3',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 3, 12.34);

      expect(customer.vehicle.fuelRemains).toBe(20.3);
    },
  );

  it(
    'should ' +
      'Round the price of the purchased fuel the to the nearest' +
      ' hundredth part' +
      '7.001 -> 7.00',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 7.001, 5);

      expect(customer.money).toBe(2964.99);
    },
  );

  it('should not buy fuel if liters less than 2 liters ', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 10, 1)).toBeUndefined();
  });

  it('should If the amount is not given, then full tank is ordered', () => {
    const customer = {
      money: 30000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(29040);
  });

  it('should pour only what fits into the tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2936);
  });

  it('should fill in only what the client can pay', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 300, 10);

    expect(customer.money).toBe(0);
  });
});
