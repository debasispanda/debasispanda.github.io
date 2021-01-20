const ghpages = require('gh-pages');

const callback = () => {
  console.log("Successfully deployed to https://debasispanda.github.io");
}

ghpages.publish('build', {
  user: {
    name: 'debasispanda',
    email: 'imdebasispanda@gmail.com'
  },
  message: 'Auto-generated commit: update debasispanda.github.io'
}, callback);
