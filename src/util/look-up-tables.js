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
  id: 'season-18-19',
  startDate: '2018-10-17',
  endDate: '2019-04-10',
}, {
  id: 'season-19-20',
  startDate: '2019-10-04',
  endDate: '2020-04-15',
}];

module.exports = {
  playerPositionTable,
  seasonTable,
};
