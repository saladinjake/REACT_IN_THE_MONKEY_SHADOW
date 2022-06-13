const path = require("path");

module.exports = {
  images: {
    domains: ["d3re0f381bckq9.cloudfront.net", "res.cloudinary.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
