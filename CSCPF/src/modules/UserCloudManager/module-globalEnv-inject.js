const init = globalEnv => {
  globalEnv.modules.userCloudManager.filePath = {};

  globalEnv.modules.userCloudManager.filePath.fm =
    process.env.NODE_ENV === "production"
      ? globalEnv.system.productionUrl + "/Storage/Fm/"
      : globalEnv.system.developmentUrl + "/Storage/Fm/";
};

export default init;
