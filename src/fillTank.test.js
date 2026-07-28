'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('should return nothing', () => {
    expect(fillTank(customer, 10, 10)).toBeUndefined();
  });

  it('should fill the full tank when `amount` is not given', () => {
    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2680);
  });

  it('should pour only what fits when `amount` is too big', () => {
    fillTank(customer, 10, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2680);
  });

  it('should pour the exact `amount` when it fits and is affordable', () => {
    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(28);
    expect(customer.money).toBe(2800);
  });

  it('should pour only what the customer can pay for', () => {
    customer.money = 100;

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(0);
  });

  it('should not fill the full tank if the customer cannot pay for it', () => {
    customer.money = 150;

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(23);
    expect(customer.money).toBe(0);
  });

  it('should round the poured amount down to the tenth part', () => {
    fillTank(customer, 10, 10.267);

    expect(customer.vehicle.fuelRemains).toBe(18.2);
    expect(customer.money).toBe(2898);
  });

  it('should round down the amount limited by the money', () => {
    customer.money = 129.5;

    fillTank(customer, 10, 30);

    expect(customer.vehicle.fuelRemains).toBe(20.9);
    expect(customer.money).toBe(0.5);
  });

  it('should not pour when less than 2 liters are ordered', () => {
    fillTank(customer, 10, 1.9);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should not pour when free space is less than 2 liters', () => {
    customer.vehicle.fuelRemains = 39;

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(39);
    expect(customer.money).toBe(3000);
  });

  it('should not pour when the customer can pay for less than 2 liters', () => {
    customer.money = 19;

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(19);
  });

  it('should pour exactly 2 liters', () => {
    fillTank(customer, 10, 2);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(2980);
  });

  it('should round the price to the nearest hundredth part', () => {
    customer.money = 100;

    fillTank(customer, 2.335, 10.1);

    expect(customer.vehicle.fuelRemains).toBe(18.1);
    expect(customer.money).toBe(76.42);
  });
});
