'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {

  describe('basic behavior', () => {
    it('fills fuel according to available money', () => {
      const customer = {
        money: 30,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 2,
        },
      };

      fillTank(customer, 3, 20);

      expect(customer.vehicle.fuelRemains).toBe(12);
    });

    it('does nothing if customer has no money', () => {
      const customer = {
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 5,
        },
      };

      fillTank(customer, 1, 10);

      expect(customer.vehicle.fuelRemains).toBe(5);
    });
  });

  describe('money limitations', () => {
    it('fills only what the customer can afford (rounded to 1 decimal)', () => {
      const customer = {
        money: 17.45,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 4,
        },
      };

      fillTank(customer, 2.94, 30);

      expect(customer.vehicle.fuelRemains).toBe(9.9);
    });

    it('fills exact ordered amount if customer can afford it', () => {
      const customer = {
        money: 20,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 10,
        },
      };

      fillTank(customer, 2, 10);

      expect(customer.vehicle.fuelRemains).toBe(20);
    });
  });

  describe('tank capacity limitations', () => {
    it('fills only what fits in the tank', () => {
      const customer = {
        money: 25,
        vehicle: {
          maxTankCapacity: 36,
          fuelRemains: 31,
        },
      };

      fillTank(customer, 5, 6);

      expect(customer.vehicle.fuelRemains).toBe(36);
    });

    it('does nothing if tank is already full', () => {
      const customer = {
        money: 50,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      };

      fillTank(customer, 1, 10);

      expect(customer.vehicle.fuelRemains).toBe(40);
    });
  });

  describe('order amount limitations', () => {
    it('fills only ordered amount even if customer can afford more', () => {
      const customer = {
        money: 100,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 10,
        },
      };

      fillTank(customer, 2, 8);

      expect(customer.vehicle.fuelRemains).toBe(18);
    });

    it('fills max possible amount if order is not specified', () => {
      const customer = {
        money: 20,
        vehicle: {
          maxTankCapacity: 30,
          fuelRemains: 10,
        },
      };

      fillTank(customer, 2);

      expect(customer.vehicle.fuelRemains).toBe(20);
    });
  });

  describe('rounding rules', () => {
    it('rounds fueled amount down to one decimal place', () => {
      const customer = {
        money: 10,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 0,
        },
      };

      fillTank(customer, 1.67, 10);

      expect(customer.vehicle.fuelRemains).toBe(5.9);
    });
  });

  describe('validation and edge cases', () => {
    it('does nothing if unit price is negative', () => {
      const customer = {
        money: 20,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 10,
        },
      };

      fillTank(customer, -2, 10);

      expect(customer.vehicle.fuelRemains).toBe(10);
    });

    it('does not fill if calculated fuel is less than 2 units', () => {
      const customer = {
        money: 3,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 10,
        },
      };

      fillTank(customer, 2, 10);

      expect(customer.vehicle.fuelRemains).toBe(10);
    });
  });

});
