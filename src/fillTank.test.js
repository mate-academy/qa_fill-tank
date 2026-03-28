'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill the requested amount of fuel', () => {
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

  it('should fill the tank fully if amount is not given', () => {
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

  it('should fill only free space if requested amount is too big', () => {
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
      money: 180,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(13.6);
    expect(customer.money).toBe(0);
  });

  it('should round fuel down to one decimal place', () => {
    const customer = {
      money: 333,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(16.6);
    expect(customer.money).toBe(3);
  });

  it('should not fill fuel if rounded amount is less than 2 liters', () => {
    const customer = {
      money: 90,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(90);
  });

  it('should round fuel price to nearest hundredth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 33.333, 3);

    expect(customer.vehicle.fuelRemains).toBe(13);
    expect(customer.money).toBe(0);
  });

  it('should not return anything', () => {
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
