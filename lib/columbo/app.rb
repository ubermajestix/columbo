module Columbo
  class App < Sinatra::Base
    set :static, true
    set :views, File.join(File.dirname(__FILE__), '/views')
    set :public, File.join(File.dirname(__FILE__), '/public')

    before do
      # puts "=="*45
    end
    

    get '/' do
       erb :index
    end       
  end
end  
