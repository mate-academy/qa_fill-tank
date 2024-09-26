'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be decleared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should set 'fuelRemains' === 'maxTankCapacity' 
  if the amount is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it(`should set 'fuelRemains' to 'maxTankCapacity' 
  if 'amount' > 'maxTankCapacity'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it(`should set 'fuelRemains' in accordance with 'customer.money'`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toEqual(38);
  });

  it(`should round 'fuelRemains' 
  by discarding number to the tenth part`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10.35;
    const amount = 20.34;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toEqual(28.3);
  });

  it(`should not change 'fuelRemains' 
  if 'amount' < 2`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;
    const amount = 1;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toEqual(8);
  });

  it(`should change 'fuelRemains' if 'amount' === 2`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;
    const amount = 2;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toEqual(10);
  });

  it(`should change 'fuelRemains' if 'amount' === 3`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10;
    const amount = 3;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toEqual(11);
  });

  it(`should round 'fuelPrice' to the nearest hundredth part'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 10.343;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toEqual(2896.57);
  });
});
