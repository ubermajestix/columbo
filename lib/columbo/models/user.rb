class Columbo::User
  include DataMapper::Resource
  property :id, Serial
  property :name, String
  property :location, String
  property :profile_image_url, String
  property :twitter_id, String
  property :username, String #twitter @username
  property :created_at, DateTime, :default => Proc.new {Time.now}
  
  has 1, :team, :model => "Columbo::Team"
  has n, :members, :through => :team
  
  # has_many :members, :through => :team
  
  # def team
  #   self.members
  # end
  
  def add_member(opts={})
    raise "need to provide a user who's tagging" unless opts[:tagged_by]
    raise "need a member to add to this team" unless opts[:member]
    Columbo::Team.create(:member=>opts[:member], :tagged_by=>opts[:tagged_by], :user=>self)
  end
end