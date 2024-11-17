'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(typeof (fillTank)).toBe('function');
  });

  it('If the amount is not given, then full tank is ordered.', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1);

    expect(customer.money).toBe(2968);
  });

  it('If the amount is greater than the tank can accommodate,'
    + ' pour only what will fit.', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1, 50);

    expect(customer.money).toBe(2968);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('ALWAYS fill in only what the client can pay.', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1, 50);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(38);
  });

  it('Round the poured amount by discarding number to the tenth part.', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 45, 7.345);

    expect(customer.money).toBe(671.5);
    expect(customer.vehicle.fuelRemains).toBe(37.3);
  });

  it('If the poured amount is less than 2 liters, do not pour at all.', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 5, 1);

    expect(customer.money).toBe(1000);
    expect(customer.vehicle.fuelRemains).toBe(30);
  });

  it('If the poured amount is less than 2 liters, do not pour at all.', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 49,
      },
    };

    fillTank(customer, 5, 23);

    expect(customer.money).toBe(1000);
    expect(customer.vehicle.fuelRemains).toBe(49);
  });

  it('Round the price of the purchased fuel the to'
    + ' the nearest hundredth part.', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 5.431, 11);

    expect(customer.money).toBe(940.26);
    expect(customer.vehicle.fuelRemains).toBe(50);
  });
});
