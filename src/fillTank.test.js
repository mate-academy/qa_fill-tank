'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`full tank if 'amount' is undefined`, () => {

    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      }
    };
    const amount = undefined;
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(950);
  });

  it('when customer has money and enough space', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      }
    };
    const fuelPrice = 1.5;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

  expect(customer.vehicle.fuelRemains).toBe(15);
  expect(customer.money).toBe(985);
  });

  it('money is not enough', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      }
    };
    const fuelPrice = 300;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

  expect(customer.vehicle.fuelRemains).toBe(8.3);
  expect(customer.money).toBe(10);
  });

  it('if the `amount` is greater than the tank can accommodate', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      }
    };
    const amount = 40;
    const fuelPrice = 0.01;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(999.75);
    
  });

  it('fill in only what the client can pay', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      }
    };
    const amount = 5;
    const fuelPrice = 330;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(10);
  });

  it('if amount < 2', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      }
    };
    const amount = 1.99;
    const fuelPrice = 330;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(5);
    expect(customer.money).toBe(1000);
  });

  it('if amount >= 2', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      }
    };
    const amount = 2;
    const fuelPrice = 330;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(7);
    expect(customer.money).toBe(340);
  });

  it('need round the amount by discarding the number to the tenth part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      }
    };
    const amount = 7.333;
    const fuelPrice = 25;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(12.3);
    expect(customer.money).toBe(817.5);
  });

  it('need round the amount by discarding the number to the tenth part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      }
    };
    const amount = 7.3;
    const fuelPrice = 25.253333;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(12.3);
    expect(customer.money).toBe(815.65); //I think in this test ER should be "815.675". Please explain to me where I am wrong.
  });
});
