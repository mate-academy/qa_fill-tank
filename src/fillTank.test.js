'use strict';

const { fillTank } = require('./fillTank');

function makeCustomer(money, maxTankCapacity, fuelRemains) {
  return {
    money,
    vehicle: { maxTankCapacity, fuelRemains },
  };
}

describe('fillTank', () => {
  describe('basic cases', () => {
    it('should fill a half-empty tank when customer has enough money', () => {
      const customer = makeCustomer(1000, 60, 30);

      fillTank(customer, 1.5);

      expect(customer.vehicle.fuelRemains).toBe(60);
      expect(customer.money).toBe(955);
    });

    it('should fill an almost empty tank', () => {
      const customer = makeCustomer(500, 40, 2);

      fillTank(customer, 2);

      expect(customer.vehicle.fuelRemains).toBe(40);
      expect(customer.money).toBe(500 - 76);
    });

    it('should fill an almost full tank', () => {
      const customer = makeCustomer(100, 60, 55);

      fillTank(customer, 1.5);

      expect(customer.vehicle.fuelRemains).toBe(60);
      expect(customer.money).toBeCloseTo(100 - 7.5, 2);
    });
  });

  describe('edge cases', () => {
    it('should do nothing when tank is already full', () => {
      const customer = makeCustomer(1000, 60, 60);

      fillTank(customer, 1.5);

      expect(customer.vehicle.fuelRemains).toBe(60);
      expect(customer.money).toBe(1000);
    });

    it('should fill completely when tank is empty', () => {
      const customer = makeCustomer(500, 40, 0);

      fillTank(customer, 2);

      expect(customer.vehicle.fuelRemains).toBe(40);
      expect(customer.money).toBe(500 - 80);
    });

    it('should do nothing when fuel price is 0', () => {
      const customer = makeCustomer(100, 60, 30);

      fillTank(customer, 0);

      expect(customer.vehicle.fuelRemains).toBe(60);
      expect(customer.money).toBe(100);
    });

    it('should do nothing when less than 2 liters can be filled', () => {
      const customer = makeCustomer(1000, 60, 59);

      fillTank(customer, 1.5);

      expect(customer.vehicle.fuelRemains).toBe(59);
      expect(customer.money).toBe(1000);
    });

    it('should do nothing when customer has no money', () => {
      const customer = makeCustomer(0, 60, 30);

      fillTank(customer, 1.5);

      expect(customer.vehicle.fuelRemains).toBe(30);
      expect(customer.money).toBe(0);
    });
  });

  describe('limited by available funds', () => {
    it('should fill only as much as customer can afford', () => {
      const customer = makeCustomer(20, 60, 0);

      fillTank(customer, 2);

      expect(customer.vehicle.fuelRemains).toBe(10);
      expect(customer.money).toBe(0);
    });

    // eslint-disable-next-line max-len
    it('should fill partial tank when money is insufficient for full tank', () => {
      const customer = makeCustomer(30, 80, 0);

      fillTank(customer, 1.5);

      expect(customer.vehicle.fuelRemains).toBe(20);
      expect(customer.money).toBe(0);
    });
  });

  describe('optional amount parameter', () => {
    it('should fill only the specified amount when amount is provided', () => {
      const customer = makeCustomer(1000, 60, 0);

      fillTank(customer, 1.5, 20);

      expect(customer.vehicle.fuelRemains).toBe(20);
      expect(customer.money).toBe(1000 - 30);
    });

    it('should not exceed tank capacity even when amount is larger', () => {
      const customer = makeCustomer(1000, 40, 20);

      fillTank(customer, 1.5, 100);

      expect(customer.vehicle.fuelRemains).toBe(40);
    });
  });

  describe('rounding behavior', () => {
    it('should floor fuel amount to 1 decimal place', () => {
      const customer = makeCustomer(1000, 60, 0);

      fillTank(customer, 3, 10.37);

      expect(customer.vehicle.fuelRemains).toBe(10.3);
    });

    it('should round price to 2 decimal places', () => {
      const customer = makeCustomer(1000, 60, 0);

      fillTank(customer, 1.3, 10);

      expect(customer.money).toBe(1000 - 13);
    });

    it('should handle price rounding precisely', () => {
      const customer = makeCustomer(1000, 60, 0);

      fillTank(customer, 1.1, 10);

      expect(customer.money).toBe(1000 - 11);
    });
  });

  describe('return value', () => {
    it('should return undefined', () => {
      const customer = makeCustomer(1000, 60, 0);

      const result = fillTank(customer, 1.5);

      expect(result).toBeUndefined();
    });

    it('should return undefined when tank is full', () => {
      const customer = makeCustomer(1000, 60, 60);

      const result = fillTank(customer, 1.5);

      expect(result).toBeUndefined();
    });
  });

  describe('various tank sizes and prices', () => {
    it('should handle large tank with high price', () => {
      const customer = makeCustomer(10000, 200, 50);

      fillTank(customer, 10);

      expect(customer.vehicle.fuelRemains).toBe(200);
      expect(customer.money).toBe(10000 - 1500);
    });

    it('should handle small tank with low price', () => {
      const customer = makeCustomer(50, 10, 0);

      fillTank(customer, 0.5);

      expect(customer.vehicle.fuelRemains).toBe(10);
      expect(customer.money).toBe(50 - 5);
    });
  });
});
