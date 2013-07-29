require "rubygems"
require 'rake'
require 'yaml'
require 'time'

SOURCE = "."
CONFIG = {
  'version' => "0.3.0",
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "markdown"
}

desc "Begin a new post in #{CONFIG['posts']}"

task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  tags = ENV["tags"] || "[]"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date_format = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d-%H_%M_%S')
    date_format2 = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d %H:%M:%S')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'], "#{date_format}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "date: #{date_format2}"
    post.puts 'description: ""'
    post.puts "categories: "
    post.puts "tags: []"
    post.puts "---"
  end
end # task :post