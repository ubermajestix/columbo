# Look in the tasks/setup.rb file for the various options that can be
# configured in this Rakefile. The .rake files in the tasks directory
# are where the options are used.

begin
  require 'bones'
  Bones.setup
rescue LoadError
  begin
    load 'tasks/setup.rb'
  rescue LoadError
    raise RuntimeError, '### please install the "bones" gem ###'
  end
end

ensure_in_path 'lib'
require 'columbo'
rakefiles = Dir.glob File.join('tasks', '*.rake')
import *rakefiles

task :default => 'spec:run'


PROJ.name = 'columbo'
PROJ.authors = 'Tyler Montgomery'
PROJ.email = 'tyler@is.stupidawesome.com'
PROJ.url = 'http://github.com/ubermajestix/columbo'
PROJ.version = Columbo::VERSION
PROJ.rubyforge.name = 'columbo'

PROJ.spec.opts << '--color'
PROJ.readme_file = "README.rdoc"
# EOF
