/**
 * @author Nic Ballesteros
 * @description This file helps modify the database.
 * 
 * 10/22/21
 */

const getUserScores = async (user) => {
  console.log(`
    SELECT * FROM user_game
    WHERE user = ${user.userID};
  `);

  try {
    let user = await new Promise((resolve, reject) => {
      global.connection.query(`
        SELECT * FROM user_game
        WHERE user = ${user.userID};
      `);

      if (err) {
        reject(err);
        return;
      }

      resolve({
        results,
        fields,
      });
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getUserScores,
};