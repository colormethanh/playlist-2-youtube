const youtubedl = require("youtube-dl-exec");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");
const fs = require("fs");

class YtDlClient {
  constructor() {
    this.ytdl = youtubedl;
    this.ffmpegPath = ffmpegPath;
    this.tempDir = "/tmp"
  }

  async downloadVideo(videoURL) {
    try {
      const fileName = `audio-${Date.now()}.mp3`
      const outputFilePath = path.join(this.tempDir, fileName);
      console.log("saving file to: ", outputFilePath);
      await this.ytdl(videoURL, {
        output: outputFilePath,
        extractAudio: true,
        audioFormat: "mp3",
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        ffmpegLocation: ffmpegPath,
        addHeader: ["referer:youtube.com", "user-agent:googlebot"],
      });
      console.log("Audio extraction complete: ", fileName);
      return fileName;
    } catch (error) {
      console.error("Error downloading video:", error);
      throw new Error("Failed to process video");
    }
  }
}

module.exports = YtDlClient;
