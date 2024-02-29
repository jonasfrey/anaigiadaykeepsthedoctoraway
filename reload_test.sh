#!/bin/bash
# inspired by
# http://linux.die.net/man/1/inotifywait
# http://razius.com/articles/auto-refreshing-google-chrome-on-file-changes/
# http://unix.stackexchange.com/questions/37258/refresh-reload-active-browser-tab-from-command-line

# Usage:
# ./chrome-refresh.sh /folder/to/watch /some/folder/file_to_watch.html
 
# TIME_FORMAT='%F %H:%M'
# OUTPUT_FORMAT='%T Event(s): %e fired for file: %w. Refreshing.'
 
# RELOAD_KEYS="CTRL+R"
# BROWSER="google-chrome"
# CURRENT=''

# while inotifywait -q -r -e modify --timefmt "${TIME_FORMAT}" --format "${OUTPUT_FORMAT}" "$@"; do
#     sleep .5s # lets a flask server catch up with the file change
#     CURRENT=$(xdotool getactivewindow)
#     xdotool search --class ${BROWSER} windowactivate --sync
#     xdotool search --class ${BROWSER} key --clearmodifiers ${RELOAD_KEYS}

#     xdotool windowfocus --sync ${CURRENT}
#     xdotool windowactivate --sync ${CURRENT}

# done

CURRENT=$(xdotool getactivewindow) && xdotool search --onlyvisible --class Chrome windowfocus key ctrl+r && xdotool windowfocus --sync ${CURRENT} && xdotool windowactivate --sync ${CURRENT}