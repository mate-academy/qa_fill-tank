'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be decleared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill full tank if there`s no amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('pour only what will fit', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;
    const amount = 100;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('fill in only what the client can pay', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(38);
  });

  it('fill in only what the client can pay', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(38);
  });

  it('should round fuel to the tenth part', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;
    const amount = 11.75;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(19.7);
  });

  it('don`t fill if amount less than 2', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;
    const amount = 1;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('round money to hundredth pfrt', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10.45894216584512145884;
    const amount = 4;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(2958.16);
  });
});
