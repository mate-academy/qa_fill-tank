'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('should fill the requested amount and withdraw money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const result = fillTank(customer, 50, 10);

    expect(result).toBeUndefined();
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2500);
  });

  it('should fill the tank completely when amount is not provided', () => {
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

  it('should pour only the amount that fits into the tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 50, 20);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2750);
  });

  it('should pour only the amount the customer can afford', () => {
    const customer = {
      money: 250,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100, 10);

    expect(customer.vehicle.fuelRemains).toBe(10.5);
    expect(customer.money).toBe(0);
  });

  it('should round the poured fuel down to one decimal place', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 5.99);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(13.9);
    expect(customer.money).toBeCloseTo(823);
  });

  it('should round affordable fuel down to one decimal place', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 33, 10);

    expect(customer.vehicle.fuelRemains).toBe(11);
    expect(customer.money).toBe(1);
  });

  // eslint-disable-next-line max-len
  it(
    'should not pour fuel when the ' + 'rounded amount is less than 2 liters',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 50, 1.99);

      expect(customer.vehicle.fuelRemains).toBe(8);
      expect(customer.money).toBe(3000);
    },
  );

  it('should pour exactly 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 2);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(2900);
  });

  it('should not pour fuel when the customer cannot afford 2 liters', () => {
    const customer = {
      money: 19.99,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(19.99);
  });

  it('should not pour fuel when less than 2 liters fit into the tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.1,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(38.1);
    expect(customer.money).toBe(3000);
  });

  it('should correctly round the fuel price to the nearest hundredth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 1.111, 3);

    expect(customer.vehicle.fuelRemains).toBe(11);
    expect(customer.money).toBeCloseTo(96.67);
  });

  it('should do nothing when the tank is already full', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000);
  });
});
