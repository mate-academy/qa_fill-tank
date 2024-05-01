'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill correct tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    }

    const fuelPrice = 10;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(2800);
    expect(customer.vehicle.fuelRemains).toBe(28);
  });
  
  it(`should fill tank to max if 'amount' is not set`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    }

    const fuelPrice = 10;

    fillTank(customer, fuelPrice);

    expect(customer.money).toBe(2680);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });
  
  it(`should fill tank to max if 'amount' is not set`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    }

    const fuelPrice = 10;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(2680);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });
  
  it(`should fill only the 'amount' the customer can pay for`, () => {
    const customer = {
      money: 250,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    }

    const fuelPrice = 10;
    const amount = 30;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(25);
  });
  
  it(` should filled fuel be rounded to tenths`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    }

    const fuelPrice = 10.99;
    const amount = 10.81;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(15.8);
  });
  
  it(`should 'money' be rounded to the nearest hundredth part`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    }

    const fuelPrice = 10.99;
    const amount = 10.81;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(1881.31);
  });
  
    
  it(`should not fill tank if 'amount' < 2`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    }

    const fuelPrice = 10.99;
    const amount = 1;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(2000);
    expect(customer.vehicle.fuelRemains).toBe(5);
  });
});
