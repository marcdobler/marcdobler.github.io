const Image = require('@11ty/eleventy-img');
const { DateTime } = require('luxon');
const fs = require('fs');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');
const { cache } = require('eleventy-plugin-workbox');
const prodConfig = require('./config.prod');
const devConfig = require('./config.dev');

const config = process.env.ELEVENTY_ENV === 'production' ? prodConfig : devConfig;

async function imageShortcode(src, cls, alt, sizes, widths) {
  let options = {
    widths: widths,
    formats: ["webp", "jpeg"],
  };

  // generate images, while this is async we don’t wait
  Image(src, options);

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  // get metadata even the images are not fully generated
  let metadata = Image.statsSync(src, options);
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(cache, {
    enabled: true,
  });

  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
  eleventyConfig.addLiquidShortcode('image', imageShortcode);
  eleventyConfig.addJavaScriptFunction('image', imageShortcode);

  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy('src/assets/javascripts');
  eleventyConfig.addPassthroughCopy('src/assets/images');
  eleventyConfig.addPassthroughCopy('src/assets/videos');
  eleventyConfig.addPassthroughCopy('src/site.webmanifest');

  // Alias `layout: post` to `layout: layouts/post.njk`
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy');
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'projects', 'posts', 'corals', 'fishes'].indexOf(tag) === -1
    );
  }

  eleventyConfig.addFilter('filterTagList', filterTagList);

  // Create an array of all tags
  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  });

  // Watch CSS files for changes
  eleventyConfig.setBrowserSyncConfig({
    files: './_site/assets/css/**/*.css',
  });

  // Watch JS files for changes
  eleventyConfig.setBrowserSyncConfig({
    files: './_site/assets/javascripts/**/*.js',
  });

  return {
    dir: {
      input: 'src',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
