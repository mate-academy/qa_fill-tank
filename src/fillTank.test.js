'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  let customer;

  beforeEach(() => {
    customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
  });

  it('should return undefined', () => {
    const result = fillTank(customer, 10, 20);

    expect(result).toBeUndefined();
  });

  describe('when amount is not given', () => {
    it('should fill to full capacity if customer can afford it', () => {
      fillTank(customer, 10);
      expect(customer.vehicle.fuelRemains).toBe(50);
      expect(customer.money).toBe(600);
    });

    it('should fill only up to what customer can pay', () => {
      customer.money = 150;
      fillTank(customer, 10);
      expect(customer.vehicle.fuelRemains).toBe(25);
      expect(customer.money).toBe(0);
    });
  });

  describe('when amount is given', () => {
    it('should pour the requested amount if affordable and fits', () => {
      fillTank(customer, 10, 20);
      expect(customer.vehicle.fuelRemains).toBe(30);
      expect(customer.money).toBe(800);
    });

    it('should pour only what fits if amount exceeds capacity', () => {
      fillTank(customer, 10, 50);
      expect(customer.vehicle.fuelRemains).toBe(50);
      expect(customer.money).toBe(600);
    });

    it('should pour only what customer can pay if unaffordable', () => {
      customer.money = 150;
      fillTank(customer, 10, 30);
      expect(customer.vehicle.fuelRemains).toBe(25);
      expect(customer.money).toBe(0);
    });
  });

  describe('rounding of poured amount (discarding to tenth part)', () => {
    it('should round the poured amount down to the tenth part', () => {
      fillTank(customer, 10, 20.456);
      expect(customer.vehicle.fuelRemains).toBeCloseTo(30.4, 10);
      expect(customer.money).toBe(796);
    });

    it('should round down when constrained by money', () => {
      customer.money = 25.55;
      fillTank(customer, 10, 30);
      expect(customer.vehicle.fuelRemains).toBeCloseTo(12.5, 10);
      expect(customer.money).toBeCloseTo(0.55, 10);
    });

    it('should round down when constrained by tank capacity', () => {
      customer.vehicle.maxTankCapacity = 12.34;
      fillTank(customer, 10);
      expect(customer.vehicle.fuelRemains).toBeCloseTo(12.3, 10);
      expect(customer.money).toBe(977);
    });
  });

  describe('minimum poured amount (less than 2 liters)', () => {
    it('should not pour at all if rounded amount is < 2 liters', () => {
      const initialCustomer = JSON.parse(JSON.stringify(customer));

      fillTank(customer, 10, 1.99);
      expect(customer).toEqual(initialCustomer);
    });

    it('should pour if the rounded amount is exactly 2 liters', () => {
      fillTank(customer, 10, 2.0);
      expect(customer.vehicle.fuelRemains).toBe(12.0);
      expect(customer.money).toBe(980);
    });

    it('should not pour if customer can afford < 2 liters', () => {
      customer.money = 19.99;

      const initialCustomer = JSON.parse(JSON.stringify(customer));

      fillTank(customer, 10);
      expect(customer).toEqual(initialCustomer);
    });

    it('should not pour if free space is < 2 liters', () => {
      customer.vehicle.maxTankCapacity = 11.9;

      const initialCustomer = JSON.parse(JSON.stringify(customer));

      fillTank(customer, 10);
      expect(customer).toEqual(initialCustomer);
    });
  });

  describe('rounding of price (to the nearest hundredth)', () => {
    it('should round price up to the hundredth when >= 0.5', () => {
      fillTank(customer, 12.3456, 5);
      expect(customer.vehicle.fuelRemains).toBe(15);
      expect(customer.money).toBeCloseTo(938.27, 10);
    });

    it('should round price down to the hundredth when < 0.5', () => {
      fillTank(customer, 12.3421, 5);
      expect(customer.vehicle.fuelRemains).toBe(15);
      expect(customer.money).toBeCloseTo(938.29, 10);
    });
  });
});
