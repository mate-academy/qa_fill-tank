'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill tank & debited money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 10);

    expect(customer.money)
      .toBe(2900);
    expect(customer.vehicle.fuelRemains)
      .toBe(18);
  });

  it('should fill full tank if amount undefined', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10);

    expect(customer.money)
      .toBe(2600);
    expect(customer.vehicle.fuelRemains)
      .toBe(40);
  });

  it('should fill full tank if amount > maxTankCapacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 100);

    expect(customer.money)
      .toBe(2600);
    expect(customer.vehicle.fuelRemains)
      .toBe(40);
  });

  it('fill in only what the client can pay', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer.money)
      .toBe(0);
    expect(customer.vehicle.fuelRemains)
      .toBe(10);
  });


  it('should round the price of the purchased fuel' +
    'to the nearest hundredth part', function () {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 10,
        },
      };

      fillTank(customer, 50.375, 3);

      expect(customer.money)
        .toBe(2848.87);
    });

  it('should round the poured amount' +
    'by discarding number to the tenth part', function () {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 10,
        },
      };

      fillTank(customer, 10, 9.57);

      expect(customer.vehicle.fuelRemains)
        .toBe(19.5);
    });

  it('if the poured amount is less than 2 liters, ' +
    'do not pour at all', function () {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 10,
        },
      };

      fillTank(customer, 10, 1.5);

      expect(customer.vehicle.fuelRemains)
        .toBe(10);
      expect(customer.money)
        .toBe(3000);
    });
});
