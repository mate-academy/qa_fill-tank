'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it(`should update money and fuelRemains of the customer`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toStrictEqual({
        money: 2800,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 28,
        },
      });
  });

  it(`should fill the tank fully if the 'amount' wasn't provided`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 65,
        fuelRemains: 2,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toStrictEqual({
        money: 370,
        vehicle: {
          maxTankCapacity: 65,
          fuelRemains: 65,
        },
      });
  });

  it(`should fill the tank fully if the customer wants to buy more fuel
  than his vehicle can accommodate`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 32,
      },
    };

    fillTank(customer, 8, 23);

    expect(customer)
      .toStrictEqual({
        money: 1936,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it(`should pour not more fuel than client can buy`, () => {
    const customer = {
      money: 360,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 2,
      },
    };

    fillTank(customer, 10, 43);

    expect(customer)
      .toStrictEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 45,
          fuelRemains: 38,
        },
      });
  });

  it(`should decline an operation if the amount of ordered
  fuel is less than 2 liters`, () => {
    const customer = {
      money: 810,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer)
      .toStrictEqual({
        money: 810,
        vehicle: {
          maxTankCapacity: 45,
          fuelRemains: 20,
        },
      });
  });

  it(`should round the total price to nearest hundredth`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 11.775, 10);

    expect(customer)
      .toStrictEqual({
        money: 882.25,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 25,
        },
      });
  });

  it(`should decline an operation if the customer
  can buy less then 2 liters of fuel`, () => {
    const customer = {
      money: 19,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toStrictEqual({
        money: 19,
        vehicle: {
          maxTankCapacity: 45,
          fuelRemains: 30,
        },
      });
  });

  it(`should decline an operation if the tank can
  accomodate less then 2 liters of fuel`, () => {
    const customer = {
      money: 810,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 44,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toStrictEqual({
        money: 810,
        vehicle: {
          maxTankCapacity: 45,
          fuelRemains: 44,
        },
      });
  });

  it(`should round fuel amount down to tenth`, () => {
    const customer = {
      money: 140,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 14,
      },
    };

    fillTank(customer, 10, 9.47);

    expect(customer)
      .toStrictEqual({
        money: 46,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 23.4,
        },
      });
  });
});
