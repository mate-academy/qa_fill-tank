'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  // const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it('should update money and fuelRemains of the customer', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 2800,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 28,
        },
      });
  });

  it(`should fill the tank fully if the 'amount' wasn't provided`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 85,
        fuelRemains: 2,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 1170,
        vehicle: {
          maxTankCapacity: 85,
          fuelRemains: 85,
        },
      });
  });

  it(`should fill the tank fully if the 'amount' >= 'maxTankCapacity'`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 8, 25);

    expect(customer)
      .toEqual({
        money: 1960,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it('should pour not more fuel than client can buy', () => {
    const customer = {
      money: 250,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 40);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 45,
          fuelRemains: 30,
        },
      });
  });

  it(`should decline an operation if the 'amount' < 2 liters`, () => {
    const customer = {
      money: 650,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer)
      .toEqual({
        money: 650,
        vehicle: {
          maxTankCapacity: 45,
          fuelRemains: 30,
        },
      });
  });

  it(`should decline an operation`
  + `if the customer can buy less then 2 liters of fuel`, () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 15,
        vehicle: {
          maxTankCapacity: 45,
          fuelRemains: 30,
        },
      });
  });

  it(`should decline an operation`
  + `if the tank can accomodate less then 2 liters of fuel`, () => {
    const customer = {
      money: 450,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 59,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 450,
        vehicle: {
          maxTankCapacity: 60,
          fuelRemains: 59,
        },
      });
  });

  it(`round fuel amount down to tenth`, () => {
    const customer = {
      money: 140,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 14,
      },
    };

    fillTank(customer, 10, 9.47);

    expect(customer)
      .toEqual({
        money: 46,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 23.4,
        },
      });
  });

  it(`round the total price to nearest hundredth`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 11.775, 10);

    expect(customer)
      .toEqual({
        money: 882.25,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 25,
        },
      });
  });
});
