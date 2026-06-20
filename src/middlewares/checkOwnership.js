const checkOwnership = (Model) => {
  return async (req, res, next) => {
    try {
      const document = await Model.findById(
        req.params.id
      );

      if (!document) {
        return res.status(404).json({
          success: false,
          message: "Record not found",
          data: null,
        });
      }

      if (
        document.user.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
          data: null,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  };
};

module.exports = checkOwnership;