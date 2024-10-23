'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should ', () => {

  });

  it(`should not change fuelRemains if user has no money`, () => {
    const customer1 = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer1, 10, 5);

    expect(customer1.vehicle.fuelRemains).toBe(0);
  });

  it(`User.money should not change more`
    + ` than the cost of filling up to maxTankCapacity`, () => {
    const customer1 = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer1, 1, 40);

    expect(customer1.money).toBe(30);
  });

  it(`should change fuelRemains to value that user can`
  +` afford and fuelRemains <= maxTankCapacity`, () => {
    const customer1 = {
      money: 100, 
      vehicle: {
        maxTankCapacity: 40, 
        fuelRemains: 0,
      },
    };
  
    fillTank(customer1, 1);
  
    expect(customer1.vehicle.fuelRemains).toBe(40); 
    expect(customer1.money).toBe(60);
  });
  
  it(`should change fuelRemains to amount of fuel that user can buy`, () => {
    const customer1 = {
      money: 20,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer1, 1, 35);

    expect(customer1.vehicle.fuelRemains).toBe(20);
  });

  it(`should not change fuelRemains if amount of fuels < 2`, () => {
    const customer1 = {
      money: 20,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer1, 1, 1);

    expect(customer1.vehicle.fuelRemains).toBe(0);
  });

  it(`should change fuelRemains to decimal`
    + ` value if amount = decimal number`, () => {
    const customer1 = {
      money: 20,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer1, 1, 5.64);

    expect(customer1.vehicle.fuelRemains).toBe(5.6);
  });

  it(`should change customer.money to decimal`
    + ` value if fuelPrice = decimal`
    + ` number and amount = decimal number`, () => {
    const customer1 = {
      money: 20,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer1, 1.26, 5.64);

    expect(customer1.money).toBe(12.94);
  });
});
