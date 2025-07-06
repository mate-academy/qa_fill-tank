'use strict';

const { fillTank } = require("./fillTank");

describe('fillTank', () => {
  

 
  
  it(`should fill tank correctly and update money`, () => {
  const customer = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40, //dhgygd
      fuelRemains: 8,
    }
  };

  fillTank(customer, 40, 30);

  expect(customer.vehicle.fuelRemains).toBe(38);
  expect(customer.money).toBe(1800);
});
  it(`should fill tank correctly and update money`, () => {
  const customer = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    }
  };

  fillTank(customer, 40);

  expect(customer.vehicle.fuelRemains).toBe(40);
  expect(customer.money).toBe(1720);
});
  it(`should fill tank correctly and update money`, () => {
  const customer = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    }
  };

  fillTank(customer, 40, 40);

  expect(customer.vehicle.fuelRemains).toBe(40);
  expect(customer.money).toBe(1720);
});
  it(`should fill tank correctly and update money`, () => {
  const customer = {
    money: 1000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    }
  };

  fillTank(customer, 40, 30);

  expect(customer.vehicle.fuelRemains).toBe(33);
  expect(customer.money).toBe(0);
});
  it(`should fill tank correctly and update money`, () => {
  const customer = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    }
  };

  fillTank(customer, 40, 1);

  expect(customer.vehicle.fuelRemains).toBe(8);
  expect(customer.money).toBe(3000);
});
});
