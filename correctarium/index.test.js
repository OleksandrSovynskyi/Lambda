const {
  calculatePriceAndTime
} = require("./index");

// for test using static order date 2022-06-16T10:30:00

test('test changing of language', () => {
    expect(calculatePriceAndTime("en", "none", 333)).toStrictEqual({
        price: 120,
        time: 1.5,
        deadline_date: '16/06/2022 12:00:00'
      });
      expect(calculatePriceAndTime("ua", "none", 333)).toStrictEqual({
        price: 50,
        time: 1,
        deadline_date: '16/06/2022 11:30:00'
      });  
      expect(calculatePriceAndTime("ru", "none", 1333)).toStrictEqual({
        price: 66.65,
        time: 1.5,
        deadline_date: '16/06/2022 12:00:00'
      });
  });

  test('test changing of count', () => {
    expect(calculatePriceAndTime("en", "none", 2000)).toStrictEqual({
        price: 240,
        time: 6.5,
        deadline_date: '16/06/2022 17:00:00'
      });
      expect(calculatePriceAndTime("en", "none", 10000)).toStrictEqual({
        price: 1200,
        time: 30.5,
        deadline_date: '21/06/2022 14:00:00'
      });  
      expect(calculatePriceAndTime("en", "none", 100000)).toStrictEqual({
        price: 12000,
        time: 300.8,
        deadline_date: '02/08/2022 14:18:00'
      });
  });


  test('test changing of mimetype', () => {
    expect(calculatePriceAndTime("ua", "doc", 1000)).toStrictEqual({
        price: 50,
        time: 1.3,
        deadline_date: '16/06/2022 11:48:00'
      });
      expect(calculatePriceAndTime("ua", "pdf", 1000)).toStrictEqual({
        price: 60,
        time: 1.5,
        deadline_date: '16/06/2022 12:00:00'
      });  
      expect(calculatePriceAndTime("en", "pdf", 100)).toStrictEqual({
        price: 144,
        time: 1.2,
        deadline_date: '16/06/2022 11:42:00'
      });
  });
