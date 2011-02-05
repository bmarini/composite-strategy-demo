
require "open-uri"

namespace :js do
  desc "Pull jquery to projects javascripts"
  task :jquery do
    open( 'http://code.jquery.com/jquery-1.5.min.js' ) do |response|
      File.open 'assets/js/jquery-1.5.min.js', 'w' do |f|
        f << response.read
      end
    end
  end

  desc "Pull underscore to the projects javascripts"
  task :underscore do
    open( 'http://documentcloud.github.com/underscore/underscore-min.js' ) do |response|
      File.open 'assets/js/underscore-min.js', 'w' do |f|
        f << response.read
      end
    end
  end
  
  desc "Pulls all javascript files to project"
  task :all => [ :jquery, :underscore ]
end

