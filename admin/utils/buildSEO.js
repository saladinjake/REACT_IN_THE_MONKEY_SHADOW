/**
 * builds SEO `object` with the default properties
 * @param {string} page - the title of the page
 * @param {string} description - the description of the page
 * @param {object} options - all optional `SEO` properties
 */
const buildSEO = (page, description, options) => {
  const SEO = {
    // Og tags
    openGraph: {
      title: `Admin - ${page}`,
      description,
    },

    // Other , which can overwrite `openGraph` tags
    ...options,

    title: `Admin - ${page}`,
    description,
  };

  return SEO;
};

export default buildSEO;
