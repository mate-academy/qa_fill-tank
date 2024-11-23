'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('If amount is empty, then full tank is ordered', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer.money).toBe(1400);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(
    'If amount is greater than the tank can accommodate,'
    + ' pour only what will fit.',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 50, 50);

      expect(customer.money).toBe(1400);
      expect(customer.vehicle.fuelRemains).toBe(40);
    }
  );

  it('ALWAYS fill in only what the client can pay', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 30);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(28);
  });

  it('If the poured amount is less than 2 liters, do not pour at all', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 1);

    expect(customer.money).toBe(1000);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('Round the poured amount by discarding number to the tenth part', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 50, 15.59);

    expect(customer.money).toBe(1225);
    expect(customer.vehicle.fuelRemains).toBe(30.5);
  });

  it('Round the price of the purchased fuel'
    + ' the to the nearest hundredth part.', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 49.99, 15);

    expect(customer.money).toBe(1250.15);
    expect(customer.vehicle.fuelRemains).toBe(30);
  });
});
