'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill the tank to the maximum capacity and deduct the correct amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  
    fillTank(customer, 1);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(40, 1);
    expect(customer.money).toBeCloseTo(2968, 1);
  });
    it('should fill the tank partially and deduct the correct amount', () => {
      const customer = {
        money: 2000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };
  
      fillTank(customer, 1.5, 20);
      expect(customer.vehicle.fuelRemains).toBeCloseTo(28, 1);
      expect(customer.money).toBeCloseTo(1970, 2);
    });
    it('should not fill the tank if the customer can\'t afford it', () => {
      const customer = {
        money: 50,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };
    
      fillTank(customer, 2);
      expect(customer.vehicle.fuelRemains).toBeCloseTo(33, 1);
      expect(customer.money).toBeCloseTo(0, 1);
    });
  
    it('should fill the tank partially to what the customer can afford', () => {
      const customer = {
        money: 100,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };
  
      fillTank(customer, 1.5, 30);
      expect(customer.vehicle.fuelRemains).toBeCloseTo(38, 1);
      expect(customer.money).toBeCloseTo(55, 2);
    });
  
    it('should not pour if the amount is less than 2 liters', () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };
  
      fillTank(customer, 1.5, 1);
      expect(customer.vehicle.fuelRemains).toBeCloseTo(8, 1);
      expect(customer.money).toBeCloseTo(3000, 2);
    });
  });