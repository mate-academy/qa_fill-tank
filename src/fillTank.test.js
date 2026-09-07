'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill the tank with the requested amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2500);
  });

  it('should fill the full tank if amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should fill only what fits in the tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2750);
  });

  it('should fill only the amount the customer can afford', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 20);

    expect(customer.vehicle.fuelRemains).toBe(14);
    expect(customer.money).toBe(0);
  });

  it('should round the fuel amount down to tenths', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 33, 10);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(670);
  });

  it('should not fill the tank if the amount is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 1.5);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should round the fuel price to hundredths', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 33.333, 10);

    expect(customer.money).toBe(666.67);
  });

  it('should return nothing', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const result = fillTank(customer, 50, 10);

    expect(result).toBeUndefined();
  });
});
