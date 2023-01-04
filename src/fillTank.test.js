'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');
  const customer = {
    money: 30,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  describe('fuel price', () => {
    it('not fill if no money', () => {
      fillTank(customer, 40, 10);

      expect(customer.money).toBe(30);
      expect(customer.vehicle.fuelRemains).toBe(8);
    });

    it('fill full if price is free ', () => {
      fillTank(customer, 0, 40);

      expect(customer.money).toBe(30);
      expect(customer.vehicle.fuelRemains).toBe(40);
    });

    it('not fill if has money less then for 2 litres', () => {
      customer.vehicle.fuelRemains = 8;
      fillTank(customer, 45, 2);

      expect(customer.money).toBe(30);
      expect(customer.vehicle.fuelRemains).toBe(8);
    });

    it('fill if has money', () => {
      customer.money = 1000;
      fillTank(customer, 100, 5);

      expect(customer.money).toBe(500);
      expect(customer.vehicle.fuelRemains).toBe(13);
    });

    it('fill only customer can pay', () => {
      customer.money = 1000;
      customer.vehicle.fuelRemains = 8;
      fillTank(customer, 100, 15);

      expect(customer.money).toBe(0);
      expect(customer.vehicle.fuelRemains).toBe(18);
    });
  });

  describe('amount', () => {
    it('amount is not given, then full tank is ordered', () => {
      customer.money = 1000;
      customer.vehicle.fuelRemains = 8;
      fillTank(customer, 10);

      expect(customer.money).toBe(680);
      expect(customer.vehicle.fuelRemains).toBe(40);
    });

    it('amount is greater than the tank capacity, pour what will fit', () => {
      customer.money = 1000;
      customer.vehicle.fuelRemains = 8;
      fillTank(customer, 10, 50);

      expect(customer.money).toBe(680);
      expect(customer.vehicle.fuelRemains).toBe(40);
    });

    it('if the poured amount is less than 2 liters, do not pour at all', () => {
      customer.money = 100;
      customer.vehicle.fuelRemains = 8;
      fillTank(customer, 10, 1);

      expect(customer.money).toBe(100);
      expect(customer.vehicle.fuelRemains).toBe(8);
    });
  });

  describe('round', () => {
    it('the poured amount by discarding number to the tenth part', () => {
      customer.money = 100;
      customer.vehicle.fuelRemains = 8;
      fillTank(customer, 10, 4.328);

      expect(customer.money).toBe(57);
      expect(customer.vehicle.fuelRemains).toBe(12.3);
    });

    it('the price of the purchased fuel to the nearest hundredth part', () => {
      customer.money = 100;
      customer.vehicle.fuelRemains = 8;
      fillTank(customer, 5.65, 4.9);

      expect(customer.money).toBe(72.31);
      expect(customer.vehicle.fuelRemains).toBe(12.9);
    });
  });
});
