/**
 * @author Nic Ballesteros, Ashton Statz
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
 * This function asks the database for the video with the corrisponding video with youtube ID.
 * 
 * @param {Number} id 
 * @returns The videoID corrisponding to the id.
 */

const getVideoByID = async (id) => {
  let query = `
    SELECT * FROM video
    WHERE videoYoutubeID = '${id}';
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

  return videos.results;
};


/**
 * This function returns all the videos in the database
 * with emotion sad.
 *  
 * @returns {Array} A list of all the  sad videos in the database.
 */

const getAllSadVideos = async () => {
    let query = `SELECT * FROM video 
                 WHERE emotionID = 2
                 ORDER BY videoRank`;
  
    let videos = await queryPromise(query);
  
    return videos.results;
};


/**
 * This function returns all the happy videos in the database.
 *  
 * @returns {Array} A list of all the happy videos in the database.
 */

const getAllHappyVideos = async () => {
    let query = `SELECT * FROM video 
                 WHERE emotionID = 1
                 ORDER BY videoRank`;
  
    let videos = await queryPromise(query);
  
    return videos.results;
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
  getAllSadVideos,
  getAllHappyVideos, 
  getVideoByID
};