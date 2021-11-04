/**
 * @author Nic Ballesteros
 * @description This file handles all db requests regarding video objects.
 */

const { queryPromise } = require(".");


/**
 * The same as `CreateVideo` but this function adds it because the video 
 * technically already exists.
 *  
 * @param {String} youtube The youtube id. 
 * @param {String} title The title of the video.  
 * @param {Number} emotionID The id of the emotion. 
 */

const addVideo = async (youtube, title, emotionID) => {
  let query = `
    INSERT INTO video (videoYoutubeID, videoTitle, emotionID)
    VALUES ("${youtube}", "${title}", ${emotionID});
  `;

  let video = await queryPromise(query);

  return video.results;
};

/**
 * This function asks the database for the video with the corrisponding video.
 * 
 * @param {Number} id 
 * @returns The video corrisponding to the id.
 */

const getVideo = async (id) => {
  let query = `
    SELECT * FROM video
    WHERE videoID = ${id};
  `;

  let video = await queryPromise(query);

  return video.results;
};

/**
 * This function returns all the videos in the database.
 *  
 * @returns {Array} A list of all the videos in the database.
 */

const getAllVideos = async () => {
  let query = `SELECT * FROM video`;

  let videos = await queryPromise(query);

  return video.results;
};

/**
 * This function updates the video object in the database.
 *  
 * @param {Number} id 
 * @param {Number} rank 
 * @returns The newly updated video object
 */

const updateVideoRank = async (id, rank) => {
  let query = ``;

  let video = await queryPromise(query);

  return video.results;
};

module.exports = {
  addVideo,
  getVideo,
  getAllVideos,
};