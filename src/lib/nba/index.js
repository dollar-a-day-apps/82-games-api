const { get } = require('axios');
const moment = require('moment-timezone');
const Promise = require('bluebird');
const template = require('nba-client-template');
const { cloneDeep } = require('lodash');
const {
  Team,
  Game,
} = require('../../database/models');

const requestOptions = {
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'en-US',
  Accept: '*/*',
  'User-Agent': template.user_agent,
  Referer: template.referrer,
  Connection: 'keep-alive',
  'Cache-Control': 'no-cache',
  Origin: 'http://stats.nba.com',
};

const parseResultSet = async (resultSet) => {
  const {
    headers,
    rowSet,
  } = resultSet;

  return Promise.map(rowSet, (row) => {
    let mappedRow = {};
    row.forEach((val, idx) => {
      mappedRow = {
        ...mappedRow,
        [headers[idx]]: val,
      };
    });
    return mappedRow;
  });
};

const getResultSet = (resultSets, setName) => {
  for (let i = 0; i < resultSets.length; i += 1) {
    const resultSet = resultSets[i];
    if (resultSet.name === setName) {
      return parseResultSet(resultSet);
    }
  }
};

const getTeamLineScore = (lineScores, gameId, teamId) => {
  for (let i = 0; i < lineScores.length; i += 1) {
    const lineScore = lineScores[i];

    if (lineScore.GAME_ID === gameId && lineScore.TEAM_ID === teamId) {
      return lineScore;
    }
  }
};

// const getTeamMapping = async () => {
//   const teamList = await Team.findAll({});
//   let teamMapping = {};

//   teamList.forEach(({ id, referenceId }) => {
//     teamMapping = {
//       ...teamMapping,
//       [id]: referenceId,
//       [referenceId]: id,
//     };
//   });

//   return teamMapping;
// };

const sanitizeStatistic = (stats, unusedFields) => {
  const tmp = cloneDeep(stats);

  unusedFields.forEach((field) => {
    delete tmp[field];
  });

  return tmp;
};

const generatePastGamesStatistic = async () => {
  // const seasonFirstDate = '2019-10-23';
  // const seasonLastDate = '2020-04-15';
  const seasonFirstDate = '2018-10-17';
  const seasonLastDate = '2019-04-11';
  // const seasonFirstDate = '2017-10-18';
  // const seasonLastDate = '2018-04-12';
  // const seasonFirstDate = '2016-12-10';
  // const seasonLastDate = '2017-04-13';
  const seasonDurationInDays = moment(seasonLastDate).diff(moment(seasonFirstDate), 'days');
  const dayOffsets = [...Array(seasonDurationInDays + 1).keys()];
  const mainTeamId = '1610612751';

  const teamMapping = {};
  const teams = await Team.findAll();
  teams.forEach((team) => {
    teamMapping[team.referenceId] = team.id;
  });

  const gameRecords = [];
  let teamIds = {};
  try {
    await Promise.map(dayOffsets, async (dayOffset) => {
      console.log(dayOffset);
      await new Promise(resolve => setTimeout(resolve, 500 * dayOffset));
      const { data: { resultSets } } = await get(`https://stats.nba.com/stats/scoreboard?DayOffset=${dayOffset}&GameDate=${seasonFirstDate}&LeagueID=00`, {}, requestOptions);

      const gameHeaders = await getResultSet(resultSets, 'GameHeader');
      const lineScores = await getResultSet(resultSets, 'LineScore');

      for (let i = 0; i < gameHeaders.length; i += 1) {
        const {
          // GAME_DATE_EST,
          GAME_ID,
          HOME_TEAM_ID,
          VISITOR_TEAM_ID,
        } = gameHeaders[i];

        const homeTeamLineScore = getTeamLineScore(lineScores, GAME_ID, HOME_TEAM_ID);
        const awayTeamLineScore = getTeamLineScore(lineScores, GAME_ID, VISITOR_TEAM_ID);

        teamIds = {
          ...teamIds,
          [homeTeamLineScore.TEAM_ID]: homeTeamLineScore.TEAM_CITY_NAME,
          [awayTeamLineScore.TEAM_ID]: awayTeamLineScore.TEAM_CITY_NAME,
        };

        if (`${HOME_TEAM_ID}` === mainTeamId || `${VISITOR_TEAM_ID}` === mainTeamId) {
          gameRecords.push({
            header: gameHeaders[i],
            homeTeam: homeTeamLineScore,
            awayTeam: awayTeamLineScore,
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }

  const getGameStatistic = (date) => {
    for (let i = 0; i < gameRecords.length; i += 1) {
      const record = gameRecords[i];
      const {
        header,
        homeTeam,
        awayTeam,
      } = record;

      const gameDate = moment.tz(header.GAME_DATE_EST, 'America/New_York');
      const dbDate = moment(date).utc();

      if (gameDate.isSame(dbDate, 'day') && (`${homeTeam.TEAM_ID}` === mainTeamId || `${awayTeam.TEAM_ID}` === mainTeamId)) {
        return record;
      }
    }
  };

  // -----------------------
  // Game List
  // const games = await Game.findAll({});
  // const getGameArena = (teamId) => {
  //   let ret;
  //   games.forEach((game) => {
  //     const { homeTeamId, arena } = game;

  //     if (homeTeamId === teamId) {
  //       ret = arena;
  //     }
  //   });

  //   return ret;
  // };
  // console.log('GameCount', gameRecords.length);
  // console.log("      return queryInterface.bulkInsert('Games', [{");
  // for (let i = 0; i < gameRecords.length; i += 1) {
  //   const record = gameRecords[i];
  //   const {
  //     header,
  //     homeTeam,
  //     awayTeam,
  //   } = record;
  //   const {
  //     GAME_DATE_EST,
  //     GAME_ID,
  //     // SEASON,
  //   } = header;

  //   const homeTeamId = teamMapping[`${homeTeam.TEAM_ID}`];
  //   const awayTeamId = teamMapping[`${awayTeam.TEAM_ID}`];
  //   const gameDate = moment.tz(GAME_DATE_EST, 'America/New_York').format('YYYY-MM-DD');
  //   let est;

  //   // 2016-2017
  //   if (gameDate < '2017-11-06') {
  //     est = 4;
  //   } else if (gameDate < '2018-03-12') {
  //     est = 5;
  //   } else {
  //     est = 4;
  //   }

  //   // 2017-2018
  //   // if (gameDate < '2017-11-05') {
  //   //   est = 4;
  //   // } else if (gameDate < '2018-03-11') {
  //   //   est = 5;
  //   // } else {
  //   //   est = 4;
  //   // }

  //   console.log(`        dateTime: convertToUtc('${gameDate} 00:00:00-0${est}'),`);
  //   console.log(`        referenceId: '${GAME_ID}',`);
  //   console.log(`        homeTeamId: ${homeTeamId},`);
  //   console.log(`        awayTeamId: ${awayTeamId},`);
  //   console.log(`        arena: '${getGameArena(homeTeamId)}',`);

  //   console.log('        createdAt: currentDateTime,');
  //   console.log('        updatedAt: currentDateTime,');
  //   console.log('      }, {');
  // }
  // console.log('      }], {});');
  // -----------------------

  // -----------------------
  // Game Stats
  console.log("      return queryInterface.bulkInsert('GameStatistics', [{");
  const games = await Game.findAll({});
  games.forEach((game) => {
    const {
      id,
      dateTime,
    } = game;

    try {
      const record = getGameStatistic(dateTime);

      if (record) {
        const {
          homeTeam,
          awayTeam,
        } = record;
        const { PTS: homeTeamPoints } = homeTeam;
        const { PTS: awayTeamPoints } = awayTeam;

        console.log(`        gameId: ${id},`);
        console.log(`        homeTeamPoints: ${homeTeamPoints},`);
        console.log(`        awayTeamPoints: ${awayTeamPoints},`);

        const sanitizedHomeStats = sanitizeStatistic(homeTeam, [
          'GAME_DATE_EST', 'GAME_SEQUENCE', 'GAME_ID', 'TEAM_ABBREVIATION', 'TEAM_CITY_NAME', 'PTS',
        ]);
        const sanitizedAwayStats = sanitizeStatistic(awayTeam, [
          'GAME_DATE_EST', 'GAME_SEQUENCE', 'GAME_ID', 'TEAM_ABBREVIATION', 'TEAM_CITY_NAME', 'PTS',
        ]);

        console.log(`        homeTeamStatistics: '${JSON.stringify(sanitizedHomeStats)}',`);
        console.log(`        awayTeamStatistics: '${JSON.stringify(sanitizedAwayStats)}',`);

        console.log('        createdAt: currentDateTime,');
        console.log('        updatedAt: currentDateTime,');
        console.log('      }, {');
      }
    } catch (err) {
      console.log(err);
    }
  });

  console.log('      }], {});');
  // -----------------
};

const generatePlayerGamesStatistic = async () => {
  // const seasonFirstDate = '2019-09-30';
  // const seasonLastDate = '2020-04-15';
  // const seasonFirstDate = '2018-10-17';
  // const seasonLastDate = '2019-04-10';
  const seasonFirstDate = '2019-09-01';
  // const seasonLastDate = '2017-04-13';
  const mainAthleteId = 1;
  const mainPlayerId = '203915';
  const seasonCode = '2018-19';
  const seasonType = 'Regular+Season';

  // for (let i = 226; i <= 307; i += 1) {
  //   console.log(`        gameId: ${i},`);
  //   console.log(`        athleteId: ${mainAthleteId},`);

  //   console.log("        performanceStatistics: '{}',");

  //   console.log('        createdAt: currentDateTime,');
  //   console.log('        updatedAt: currentDateTime,');
  //   console.log('      }, {');
  // }
  // return;

  let gameRecords = [];
  try {
    const { data: { resultSets } } = await get(`https://stats.nba.com/stats/playergamelog?DateFrom=&DateTo=&LeagueID=&PlayerID=${mainPlayerId}&Season=${seasonCode}&SeasonType=${seasonType}`, {}, requestOptions);

    gameRecords = await getResultSet(resultSets, 'PlayerGameLog');
  } catch (err) {
    console.log(err);
  }
  // console.log(gameRecords);
  const getAthleteStatistic = (refId) => {
    for (let i = 0; i < gameRecords.length; i += 1) {
      const record = gameRecords[i];
      const { Game_ID } = record;

      if (refId === `${Game_ID}`) {
        return record;
      }
    }

    return null;
  };

  console.log("      return queryInterface.bulkInsert('AthleteStatistics', [{");

  const games = await Game.findAll({});
  games.forEach((game) => {
    const {
      id,
      referenceId,
      dateTime,
    } = game;

    const gameDate = moment(dateTime).utc();
    const dbDate = moment.tz(seasonFirstDate, 'America/New_York');

    if (gameDate.isBefore(dbDate)) {
      try {
        const record = getAthleteStatistic(referenceId, dateTime);

        console.log(`        gameId: ${id},`);
        console.log(`        athleteId: ${mainAthleteId},`);

        if (record) {
          const sanitizedRecord = sanitizeStatistic(record, [
            'SEASON_ID', 'Player_ID', 'Game_ID', 'GAME_DATE', 'MATCHUP', 'VIDEO_AVAILABLE',
          ]);

          console.log(`        performanceStatistics: '${JSON.stringify(sanitizedRecord)}',`);
        }

        console.log('        createdAt: currentDateTime,');
        console.log('        updatedAt: currentDateTime,');
        console.log('      }, {');
      } catch (err) {
        console.log(err);
      }
    }

    // console.log(dateTime);
    // console.log(gameStats);
  });

  console.log('      }], {});');

  // console.log(teamIds);
};

module.exports = {
  generatePastGamesStatistic,
  generatePlayerGamesStatistic,
};
