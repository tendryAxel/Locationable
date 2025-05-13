#!/usr/bin/env ruby

require 'cli/ui'

def main
    CLI::UI::StdoutRouter.enable
    CLI::UI::Frame.open('Frame 1') do
        CLI::UI::Frame.open('Frame 2') { puts "inside frame 2" }
        puts "inside frame 1"
    end
    puts 'Hello, CLI!'
end
  
main if __FILE__ == $PROGRAM_NAME