module Columbo
  class App < Sinatra::Base
    set :static, true
    set :views, File.join(File.dirname(__FILE__), '/views')
    set :public, File.join(File.dirname(__FILE__), '/public')

    before do
      # puts "=="*45
    end
    

    get '/' do
      @bookmarklet = ""
      @local = ['development', nil, 'test'].include?(ENV['RACK_ENV'])
      File.open("#{Dir.pwd}/lib/columbo/public/js/bookmarklet#{'.localhost' if @local  }.js"){|f| @bookmarklet = f.read}
      puts "=="*45
      puts ENV['RACK_ENV']
      puts ENV.inspect
      puts @bookmarklet.gsub!("\n\n" , '')
      puts "=="*45
       erb :index
    end       
  end
end  
