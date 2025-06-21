'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  describe(`with 'amount'`, () => {
    it(`enough money`, () => {
      const customer = {
        money: 4000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100, 2);

      expect(customer.money).toBe(3800);
      expect(customer.vehicle.fuelRemains).toBe(10);
    });

    it(`not enough money`, () => {
      const customer = {
        money: 200,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100, 4);

      expect(customer.money).toBe(0);
      expect(customer.vehicle.fuelRemains).toBe(10);
    });

    it(`not enough space`, () => {
      const customer = {
        money: 1000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 35,
        },
      };

      fillTank(customer, 100, 10);

      expect(customer.money).toBe(500);
      expect(customer.vehicle.fuelRemains).toBe(40);
    });

    it(`'amount' less than two litres`, () => {
      const customer = {
        money: 1000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100, 1);

      expect(customer.money).toBe(1000);
      expect(customer.vehicle.fuelRemains).toBe(8);
    });
  });

  describe(`without 'amount'`, () => {
    it(`enough money`, () => {
      const customer = {
        money: 4000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100);

      expect(customer.money).toBe(800);
      expect(customer.vehicle.fuelRemains).toBe(40);
    });

    it(`not enough money`, () => {
      const customer = {
        money: 200,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100);

      expect(customer.money).toBe(0);
      expect(customer.vehicle.fuelRemains).toBe(10);
    });
  });

  describe('rounding behavior', () => {
    let customer;

    beforeEach(() => {
      customer = {
        money: 437,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 10,
        },
      };

      fillTank(customer, 45.75);
    });

    it('should round filled fuel down to the nearest 0.1', () => {
      expect(customer.vehicle.fuelRemains).toBe(19.5);
    });

    it('should round money spent to the nearest 0.01', () => {
      expect(customer.money).toBeCloseTo(2.37, 2);
    });
  });

  describe('filled less than two liters', () => {
    it(`money less than for two litres`, () => {
      const customer = {
        money: 100,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 100);

      expect(customer.money).toBe(100);
      expect(customer.vehicle.fuelRemains).toBe(8);
    });

    it(`available space less than 2 liters`, () => {
      const customer = {
        money: 10000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 39,
        },
      };

      fillTank(customer, 100);

      expect(customer.money).toBe(10000);
      expect(customer.vehicle.fuelRemains).toBe(39);
    });
  });
});
