'use strict';

const TestVehicle = {
  maxTankCapacity: 100,
  fuelRemains: 0,
};

const TestCustomer = {
  money: 100,
  vehicle: TestVehicle,
};

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('function should update money and fuelRemains of '
    + 'the customer', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 0;

    fillTank(TestCustomer, 1, 50);

    expect(TestCustomer.money).toEqual(50);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(50);
  });

  it('function should fill the tank fully if the \'amount\''
    + 'wasn\'t provided', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 0;

    fillTank(TestCustomer, 1);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(TestCustomer.vehicle.maxTankCapacity);
  });

  it('function should fill the tank fully if the '
    + 'customer wants to buy more fuel than his '
    + 'vehicle can accommodate', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 0;

    fillTank(TestCustomer, 0.5, 150);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(TestCustomer.vehicle.maxTankCapacity);
  });

  it('function should pour not more fuel than client can buy', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 0;

    fillTank(TestCustomer, 20, 50);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(5);
  });

  it('function should decline an operation if the amount '
    + 'of ordered fuel is less then 2 liters', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 0;

    fillTank(TestCustomer, 1, 1);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(0);
  });

  it('function should decline an opration if the customer can buy '
    + 'less then 2 litters of fuel', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 0;

    fillTank(TestCustomer, 75);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(0);
  });

  it('function should decline an operation if the tank can '
    + 'accommodate less then 2 liters of fuel', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 99;

    fillTank(TestCustomer, 1);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(99);
  });

  it('function should round fuel amount down to tenth', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 0;

    fillTank(TestCustomer, 1, 2.234);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(2.2);
  });

  it('function should round the total price to nearest hundredth', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 0;

    fillTank(TestCustomer, 5.001, 5);

    expect(TestCustomer.money)
      .toEqual(74.99);

    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 0;

    fillTank(TestCustomer, 5.009, 5);

    expect(TestCustomer.money)
      .toEqual(74.95);
  });

  it('function should not fill negative amount of fuel', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 90;

    fillTank(TestCustomer, 1 , -10);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(90);
  });

  it('function should not procceed with negative value', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 90;

    fillTank(TestCustomer, -1 , 10);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(90);
  });

  it('function should procceed with value of 0', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 90;

    fillTank(TestCustomer, 0 , 10);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(100);

    expect(TestCustomer.money)
      .toEqual(100);
  });

  it('function should not procceed when tank is full', () => {
    TestCustomer.money = 100;
    TestCustomer.vehicle.fuelRemains = 100;

    fillTank(TestCustomer, 1);

    expect(TestCustomer.vehicle.fuelRemains)
      .toEqual(100);

    expect(TestCustomer.money)
      .toEqual(100);
  });
});
