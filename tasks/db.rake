namespace :db do  
  
  task :init do
    env = ENV['RACK_ENV'] || "development"
    Columbo.initialize(:environment=>env)
  end  
  
  desc "desctructively migrate the database to match models"
  task :migrate => :init do
    destructive_countdown
    DataMapper.auto_migrate!
  end
  
  desc "non-desctructively migrate the database to match models"
  task :upgrade => :init do
    puts "upgrade"
    DataMapper.auto_upgrade!
  end
  
  desc "tear down database, build up database"
  task :remigrate => :init do
    destructive_countdown
    DataMapper.auto_migrate_down!
    DataMapper.auto_migrate_up!
  end
  
  def destructive_countdown
    unless ARGV[1] == "FORCE=true"
      raise "don't even think about migrating the db in production" if ENV['RACK_ENV'] == "production"    
      puts "\nTHIS WILL DESTROY DATA CTL+C NOW"
      ticks = 4
      ticks-1.times do
         puts "#{ticks-=1}..."
         sleep 1
      end
    end
  end
  
end