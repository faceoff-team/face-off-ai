/**
 * @author Nic Ballesteros
 * @description This file handles the creation of video object in the database.
 * 11/4/21
 */

const { addVideo } = require("../../db/video");
const BadRequestError = require("../../error/BadRequestError");
const { http } = require("../../../frontend/face-off-ai/src/store");

const validateCreateVideoRequest = (body) => {
  if (body.videoYoutubeID == undefined)
    throw new BadRequestError(`videoYoutubeID must be defined.`, 400);

  if (typeof body.videoYoutubeID !== 'string')
    throw new BadRequestError(`videoYoutubeID must be a string.`, 400);

  if (body.videoTitle == undefined)
    throw new BadRequestError(`videoTitle must be defined.`, 400);

  if (typeof body.videoTitle !== 'string')
    throw new BadRequestError(`videoTitle must be a string.`, 400);

  if (body.emotion == undefined) 
    throw new BadRequestError(`emotion must be defined.`, 400);

  if (typeof body.emotion !== 'number')
    throw new BadRequestError(`emotion must be a number.`, 400);
};

const handleCreateVideoRequest = async (req, res) => {
  validateCreateVideoRequest(req.body);
  const resVid = await http.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${req.body.videoYoutubeID}&key=${process.env.YOUTUBE}`);
  let video = addVideo(req.body.videoYoutubeID, resVid.data.items[0].snippet.title, req.body.emotion);

  

  res.status(200).json({
    success: true,
    msg: `Video object created.`,
    title: resVid.data.items[0].snippet.title,
    video,
  });
};

module.exports = async (req, res, next) => {
  try {
    await handleCreateVideoRequest(req, res);
  } catch (err) {
    next(err);
  }
};