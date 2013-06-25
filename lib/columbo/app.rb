require 'sinatra/base'

module Columbo
  class App < Sinatra::Base
    set :static, true
    set :views, File.expand_path('../views', __FILE__)
    set :public, File.expand_path('../public', __FILE__)
    

    get '/' do
      @bookmarklet = ""
      @local = ['development', nil, 'test'].include?(ENV['RACK_ENV'])
      File.open("#{Dir.pwd}/lib/columbo/public/js/bookmarklet#{'.localhost' if @local }.js"){|f| @bookmarklet = f.read}
      @bookmarklet.gsub!("\n\n" , '')
      erb :index
    end
    
  end
end  
