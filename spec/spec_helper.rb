
require File.expand_path(
    File.join(File.dirname(__FILE__), %w[.. lib columbo]))

Spec::Runner.configure do |config|
  Columbo.initialize(:environment=>"test")

  Users = {}
  def sample_data
    Columbo.logger.info "loading sample data"
    Users[:tyler] = Columbo::User.create(:username=>"ubermajestix")
    Users[:jeff] = Columbo::User.create(:username=>"jlarrimore")
  end
end

# EOF
