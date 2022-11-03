'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('Function is declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`Function doesn't return anything`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 10, 12)).toBe(undefined);
  });

  it('Function modifys original object and dont create a new one', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const customerCopy = customer;

    fillTank(customer, 10, 12);
    expect(customer === customerCopy).toBe(true);
  });

  it('Function should take correct amount of money', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 30);
    expect(customer.money).toBe(2700);
  });

  it('Function should purr correct amount of fuel', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 12);
    expect(customer.vehicle.fuelRemains).toBe(22);
  });

  it('Function should fill full tank when amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 2,
      },
    };

    fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2620);
  });

  it('Function should fill full tank when'
  + ' amount greater than tank accommodation', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 2,
      },
    };

    fillTank(customer, 10, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2620);
  });

  it('Customer cant be fueled with more fuel than he can afford', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 20);
    expect(customer.vehicle.fuelRemains).toBe(20);
    expect(customer.money).toBe(0);
  });

  it('Amount should be roundedd by discarding to tenth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 12.2, 20);
    expect(customer.vehicle.fuelRemains).toBe(18.1);
  });

  it('If ordered amount is 2 or less litres - dont fuel client', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 1.9);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(100);
  });

  it('Total price should be rounded to the nearest hundredth part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 11.775, 10);
    expect(customer.money).toBe(882.25);
  });
});
