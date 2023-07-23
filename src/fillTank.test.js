'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  const customer = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should not return anything', () => {
    expect(fillTank(customer, 40, 8)).toEqual(undefined);
  });

  it('If amount is less than 2 liters, should do not pour at all', () => {
    fillTank(customer, 50, 1);

    expect(customer.vehicle.fuelRemains).toEqual(16);
  });

  it('if the amount is not given, then full tank is ordered', () => {
    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it('should pour only what will fit', () => {
    fillTank(customer, 50, 50);

    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it('should round the amount by discarding number to the tenth part', () => {
    customer.vehicle.fuelRemains = 8;
    fillTank(customer, 50, 20.556);

    expect(customer.vehicle.fuelRemains).toEqual(28.5);
  });

  it('should round the price to the nearest hundredth part', () => {
    customer.money = 3000;

    fillTank(customer, 50.555, 20);

    expect(customer.money).toEqual(2418.62);
  });

  it('should fill in only what the client can pay', () => {
    customer.money = 3000;
    customer.vehicle.fuelRemains = 8;

    fillTank(customer, 1500, 20);

    expect(customer.vehicle.fuelRemains).toEqual(10);
  });
});
