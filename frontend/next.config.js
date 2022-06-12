module.exports = {
  reactStrictMode: true,
  pages: ["./pages"],
  images: {
    domains: ["res.cloudinary.com"],
  },
  sassOptions: {
    includePaths: [path.join( __dirname, "styles")],
  },
}
