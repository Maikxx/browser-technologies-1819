# Browser technologies

## Table of Contents

1. [Installation](#installation)
2. [Exercises](#exercises)
3. [License](#license)

### Install

* Clone the repository: `git clone git@github.com:Maikxx/browser-technologies-1819.git`.
* Navigate into the directory: `cd browser-technologies-1819`.

## Exercises

### Exercise 1.2

The link to the repository (with the enhanced code) for this exercise can be found [here](https://github.com/Maikxx/project-1-1819).

When I first ran the audits test in Google Chrome on a 13inch MacBook from 2015, the results were pretty shocking, as can be seen below.

![Initial test results](./docs/assets/initial-test-results.png)

However, when looking into the issues that it gave me in the audits tab, I realized I was testing the local development version, which has no compression and minification.

The live test results (from [Netlify](https://minor-web-project-1.netlify.com/)) can be seen below.

![Live test results](./docs/assets/live-test-results.png)

The main issue that can be seen here is that the MapBox css stylesheet is blocking the render flow (0.15s), and that it takes about 3.2 seconds before the page displays meaningful content, due to the fact that everything is rendered with JavaScript, which first needs to be parsed and executed.

Modified this code `<link href="https://api.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.css" rel="preconnect">` to have `rel="preconnect"` instead of `rel="stylesheet"`.

This however broke MapBox, because it couldn't recognize that it's required stylesheet was loaded in.

#### Feature tests

##### Images

When disabling images in my OBA application, most of the page still stands.
Things that break are:

* The logo, which has an alt text, and is not a disaster to not be there.
* MapBox still works, but has some weird behaviour, which I couldn't find out, it sometimes works, and sometimes doens't.
* Images of content items are broken, which is clumsy, but still workable, since there is all the metadata below it, like the title and the authors. This behaviour can be seen below.

![Broken images](./docs/assets/broken-images.png)

A simple improvement that can be made here is to fix the `alt="undefined"` to be `alt`, which still keeps the alt tag, while not showing the ugly placeholder alt text.

![Enhanced images](./docs/assets/enhanced-images.png)

## License

This repository is licensed as [MIT](LICENSE) by [Maikel van Veen](https://github.com/maikxx).