/**
 * @author Nic Ballesteros
 * @description This file handles all get requests for videos.
 * 11/4/21
 */

const { getAllVideos, getAllHappyVideos, getAllSadVideos, getAllScaryVideos, getVideo, getVideoByID } = require("../../db/video");

/**
 * This function handles a get video request based on the id passed in params.
 * 
 * @param {Object} req 
 * @param {Object} res 
 */

const handleGetVideoRequest = async (req, res) => {
  let video = await getVideo(req.params.id);

  res.status(200).json({
    success: true,
    msg: `Video retreived.`,
    video,
  });
}

const handleGetVideoByIDRequest = async (req, res) => {
  let video = await getVideoByID(req.params.id);

  res.status(200).json({
    success: true,
    msg: 'Video retreived.',
    video
  });
}

/**
 * This function handles all get all requests from the user. 
 * 
 * @param {Object} req 
 * @param {Object} res  
 */

const handleGetAllVideosRequest = async (req, res) => {
  let videos = await getAllVideos();

  res.status(200).json({
    success: true,
    msg: `Videos retreived successfully.`,
    videos,
  });
};

/**
 * This function handles all get all sad emotion video requests from the user. 
 * 
 * @param {Object} req 
 * @param {Object} res  
 */
const handleGetSadVideosRequest = async (req, res) => {
    let videos = await getAllSadVideos();
  
    res.status(200).json({
      success: true,
      msg: `Videos retreived successfully.`,
      videos,
    });
  };

  
/**
 * This function handles all get all happy emotion video requests from the user. 
 * 
 * @param {Object} req 
 * @param {Object} res  
 */
const handleGetHappyVideosRequest = async (req, res) => {
    let videos = await getAllHappyVideos();
  
    res.status(200).json({
      success: true,
      msg: `Videos retreived successfully.`,
      videos,
    });
  };

/**
 * This function handles all get all happy emotion video requests from the user. 
 * 
 * @param {Object} req 
 * @param {Object} res  
 */
 const handleGetScaryVideosRequest = async (req, res) => {
    let videos = await getAllScaryVideos();
  
    res.status(200).json({
      success: true,
      msg: `Videos retreived successfully.`,
      videos,
    });
  };

module.exports = {
  async getAll(req, res, next) {
    try {
      await handleGetAllVideosRequest(req, res);
    } catch (err) {
      next (err);  
    }
  },
  async getSad(req, res, next) {
    try {
      await handleGetSadVideosRequest(req, res);
    } catch (err) {
      next (err);  
    }
  },
  async getScary(req, res, next) {
    try {
      await handleGetScaryVideosRequest(req, res);
    } catch (err) {
      next (err);  
    }
  },
  async getHappy(req, res, next) {
    try {
      await handleGetHappyVideosRequest(req, res);
    } catch (err) {
      next (err);  
    }
  },
  async get(req, res, next) {
    try {
      await handleGetVideoRequest(req, res); 
    } catch (err) {
      next(err);
    }
  },
  async getByID(req, res, next) {
    try {
      await handleGetVideoByIDRequest(req, res);
    } 
    catch (err) {
      next(err);
    }
  },
};