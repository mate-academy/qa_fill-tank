'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should changer next parametres 'customer.money'`
  + `& 'customer.vehicle.fuelRemains'`
  + `when 'fuelPrice' & 'amount' are given`, () => {
    const customer = {
      money: 3000, // остаток денег на счету клиента
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0, // Остаток топлива в баке
      },
    };

    fillTank(customer, 20, 5);

    expect(customer).toStrictEqual(
      {
        money: 2900,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 5,
        },
      }
    );
  });

  it(`should fill full tank when 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 0,
      },
    };

    fillTank(customer, 20);

    expect(customer).toStrictEqual(
      {
        money: 2200,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      }
    );
  });

  it(`the purchased fuel should === customer.vehicle.maxTankCapacity`
  + `if 'amount' > 'customer.maxTankCapacity'`
  , () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 20, 100);

    expect(customer).toStrictEqual(
      {
        money: 2200,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      }
    );
  });

  it(`fill in only what the client can pay`
  + `even when 'amount' > 'customer.money'`
  , () => {
    const customer = {
      money: 60,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 20, 100);

    expect(customer).toStrictEqual(
      {
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 3,
        },
      }
    );
  });

  it(`should change nothing if order is < 2 litres`, () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 20, 1.5);

    expect(customer).toStrictEqual(
      {
        money: 50,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 0,
        },
      }
    );
  });

  it(`should round the poured amount by discarding number to the tenth part.`
    , () => {
      const customer = {
        money: 52,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 0,
        },
      };

      fillTank(customer, 7.5, 100);

      expect(customer).toStrictEqual(
        {
          money: 0.25,
          vehicle: {
            maxTankCapacity: 40,
            fuelRemains: 6.9,
          },
        }
      );
    });

  it(`should round the price of the purchased fuel`
  + `to the nearest hundredth part`
  , () => {
    const customer = {
      money: 2000, // остаток денег на счету клиента
      vehicle: {
        maxTankCapacity: 42,
        fuelRemains: 0, // Остаток топлива в баке
      },
    };

    fillTank(customer, 7.522, 100);

    expect(customer).toStrictEqual(
      {
        money: 1684.08,
        vehicle: {
          maxTankCapacity: 42,
          fuelRemains: 42,
        },
      }
    );
  });
});
