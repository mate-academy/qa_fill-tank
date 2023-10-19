"use strict";


describe('fillTank', () => {
  const { fillTank } = require('./fillTank');
  const customer = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };
  const fuelPrice = 4.80;

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  // write tests here
  it('should round the poured amount to the tenth part', () => {
    fillTank(customer, fuelPrice, 20.78);

    expect(customer.vehicle.fuelRemains).toStrictEqual(28.7);
  });

  it('should order a full tank if the amount is not given', () => {
    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toStrictEqual(40);
  });

  it('should pour only what fuel fits if the amount > tank', () => {
    fillTank(customer, fuelPrice, 50);

    expect(customer.vehicle.fuelRemains).toStrictEqual(40);
  });

  it('should not pour if the amount is less than 2', () => {
    expect(fillTank(customer, fuelPrice, 1)).toBeUndefined();
  });

  it('should round the price to the nearest hundredth part', () => {
    const customerForPriceTest = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPriceThousandthPart = 4.809;

    fillTank(customerForPriceTest, fuelPriceThousandthPart, 10);

    expect(customerForPriceTest.money).toStrictEqual(2951.91);
  });

  it('should fill only what the client can pay', () => {
    const customerForMoneyAmount = {
      money: 48,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customerForMoneyAmount, fuelPrice, 11);

    expect(customerForMoneyAmount.money).toStrictEqual(0);
  });

  it('should fill the right amount of fuel when money < amount * price', () => {
    const customerForMoneyAmount = {
      money: 48,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customerForMoneyAmount, fuelPrice, 11);

    expect(customerForMoneyAmount.vehicle.fuelRemains).toStrictEqual(18);
  });
});
