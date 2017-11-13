#! /bin/bash
PROGNAME=$0
}

run() {
    source '.env'
    python3 ./app/server/app.py
}

usage() {
  cat << EOF >&2
Usage: $PROGNAME [OPTIONS]

-b: builds the react code before start
-h:  displays help message
EOF
  exit 1
}

while [ "$1" != "" ]; do
    case $1 in
        -h | --help)
            usage
            exit
            ;;
        -b | --build)
            build
            ;;
        *)
            echo "ERROR: unknown parameter \"$PARAM\""
            usage
            exit 1
            ;;
    esac
    shift
done

run
