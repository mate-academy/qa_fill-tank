'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('should be declared', () => {
    expect(fillTank).toBeDefined();
  });

  it('should be a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(
    'should refuel the specified amount'
    + 'and take the appropriate amount of money',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 10, 10);

      expect(customer.vehicle.fuelRemains).toBe(18);
      expect(customer.money).toBe(2900);
    }
  );

  it('should fill the tank to capacity if the amount is not specified', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should fill the tank to capacity if the amount exceeds it`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 100);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill in only what the client can pay', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 1000);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(0);
  });

  it('should round the poured amount'
    + 'by discarding number to the tenth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 5.5555);

    expect(customer.vehicle.fuelRemains).toBe(13.5);
  });

  it('should do not pour at all if'
    + 'the poured amount is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 1.5);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should round the price of the purchased fuel'
    + 'to the nearest hundredth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10.1234, 10);

    expect(customer.money).toBeCloseTo(2898.77, 2);
  });
});
