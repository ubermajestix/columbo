require 'rubygems'
require 'lib/columbo'

class ColumboSite < Columbo::App    
  Columbo.initialize(:environment=>ENV['RACK_ENV'] || "development")
end

run ColumboSite.new