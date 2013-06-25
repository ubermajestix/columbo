require 'rubygems'
require './lib/columbo/app'

# class ColumboSite < Columbo::App    
#   Columbo.initialize(:environment=>ENV['RACK_ENV'] || "development")
# end
# 
# run ColumboSite.new

run Columbo::App.new
