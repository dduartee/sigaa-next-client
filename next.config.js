module.exports = {
  target: "serverless",
  images: {
    domains: ["sigaa.ifsc.edu.br"],
  },
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
};
