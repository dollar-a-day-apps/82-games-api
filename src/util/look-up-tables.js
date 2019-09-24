const playerPositionTable = {
  1: {
    name: 'Point Guard',
    performanceStatistics: [{
      name: 'Points',
      weight: 5,
    }, {
      name: 'Steals',
      weight: 3,
    }, {
      name: 'Assists',
      weight: 2,
    }],
  },
};

const seasonTable = [{
  seasonYears: [16, 17],
  startDate: '2016-12-10',
  endDate: '2017-04-13',
}, {
  seasonYears: [17, 18],
  startDate: '2017-10-18',
  endDate: '2018-04-12',
}, {
  seasonYears: [18, 19],
  startDate: '2018-10-17',
  endDate: '2019-04-11',
}, {
  seasonYears: [19, 20],
  startDate: '2019-10-23',
  endDate: '2020-04-15',
}];

module.exports = {
  playerPositionTable,
  seasonTable,
};
