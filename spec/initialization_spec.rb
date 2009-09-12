require File.expand_path(
    File.join(File.dirname(__FILE__), %w[.. lib columbo]))
    
describe Columbo do
  
  it "should raise error if env != prod|dev|test" do
      lambda{Columbo.initialize(:environment=>"not an environment")}.should raise_error 
  end
  
  it "it should be able to intialize" do
    lambda{Columbo.initialize(:environment=>ENV['YT_ENV'] || "test")}.should_not raise_error  
  end

  
end

# EOF
