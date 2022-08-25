'use strict';

describe('fillTank function', () => {

  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill tank full if no amount fiven', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, 40);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should tank full if amount > maxCapacity', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, 40, 200);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should tank full if as much as cllient can pay', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, 100);
    expect(customer.vehicle.fuelRemains).toBe(38);
  });

  it('should round poured amout to decimal', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, 133);
    expect(customer.vehicle.fuelRemains).toBe(30.5);
  });

  it('should not pour anything if ordered amount < 2', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, 40, 1.99);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('should charge and pour if ordered amount is 2', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, 40, 2);
    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it('should charge and pour if ordered amount is > 2', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, 40, 2.001);
    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it('should round the price to two numbers after dot', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, 40.15, 12.5);
    expect(customer.money).toBe(2498.12);
  });

  // negative scenario:
  it('should replace customers values with NaN if NaN was inputed', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, NaN);
    expect(customer.money).toBe(NaN);
    expect(customer.vehicle.fuelRemains).toBe(NaN);
  });

  it('should handle undefined input', () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, undefined);
    expect(customer.money).toBe(NaN);
    expect(customer.vehicle.fuelRemains).toBe(NaN);
  });

  it(`should replace customers values with NaN if 'sting' was inputed`, () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, 'qwe');
    expect(customer.money).toBe(NaN);
    expect(customer.vehicle.fuelRemains).toBe(NaN);
  });

  it(`should work as if 1(one) is the price if 'true' was inputed`, () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, true);
    expect(customer.money).toBe(2968);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should not charge customer and fullfill tank if 'false' was inputed`, () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, false);
    expect(customer.money).toBe(3000);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });
  
  it(`should not charge customer and not fill the tank if the price is negative`, () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };

    fillTank(customer, -40);
    expect(customer.money).toBe(3000);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it(`should not charge customer and not fill the tank if the price is zero, and zero amount`, () => {
    const customer = {
      money: 3000, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      }
    };
    
    fillTank(customer, 0, 0);
    expect(customer.money).toBe(3000);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

});
