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

  const customer1 = {
    money: 8,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  const customer2 = {
    money: 11,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  const customer3 = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  const customer4 = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  const customer5 = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  const customer6 = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  it('should be drclared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should return nothing', () => {
    expect(fillTank(customer, 20, 10)).toBeUndefined();
  });

  it('should give full tank without amount', () => {
    fillTank(customer5, 2);
    expect(customer5.vehicle.fuelRemains).toBe(40);
  });

  it('should fill in only what the client can pay', () => {
    fillTank(customer1, 2);
    expect(customer1.vehicle.fuelRemains).toBe(12);
  });

  // eslint-disable-next-line max-len
  it('should round the poured amount by discarding number to the tenth part', () => {
    fillTank(customer2, 3);
    expect(customer2.vehicle.fuelRemains).toBe(11.6);
  });

  it('should do not pour at all if amount is less than 2 liters', () => {
    fillTank(customer3, 2, 1);
    expect(customer3.vehicle.fuelRemains).toBe(8);
  });

  // eslint-disable-next-line max-len
  it('should round the price of the purchased fuel the to the nearest hundredth part', () => {
    fillTank(customer4, 2.45, 3.5);
    expect(customer4.money).toBe(2991.42);
  });

   // eslint-disable-next-line max-len
  it(`Add only the amount that fits into the tank if the quantity exceeds the reservoir's remaining capacity`, () => {
    fillTank(customer6, 2, 100);
    expect(customer6.vehicle.fuelRemains).toBe(40);
  })
});
