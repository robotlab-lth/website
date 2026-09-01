source "https://rubygems.org"

# Matches the GitHub Actions workflow in .github/workflows/pages.yml, which is
# the approach GitHub now recommends for Pages.
gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-paginate", "~> 1.1"
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-seo-tag", "~> 2.8"
  # gem "jekyll-remote-theme"   # only if you set remote_theme in _config.yml
end

# If you publish with "Deploy from a branch" instead, GitHub builds the site
# with the github-pages gem. To reproduce that build locally, comment out the
# four gems above and use this one instead:
#
#   gem "github-pages", group: :jekyll_plugins
#
# The plugins this site uses are all on the GitHub Pages allow-list, so it
# builds either way.

# Windows and JRuby
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "webrick", "~> 1.8"
