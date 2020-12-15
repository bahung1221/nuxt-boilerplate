#!/usr/bin/expect -f

set timeout 1000
set ENV [lindex $argv 0]; # Grab the first command line parameter
set PASSPHRASE [lindex $argv 1]; # Grab the second command line parameter
set BRANCH $ENV

if { $ENV == "prod" } {
    set BRANCH "master"
}

spawn echo $ENV
expect {
  "prod" {
    set WORKING_DIR "/var/www/vhosts/nuxt"
    set CLONE_DIR "/var/www/vhosts/nuxt"
    spawn ssh sgtek@xxxx.xxxx.xxxx.xxxx -i /env/keys/key.pem
    exp_continue;
  }
  "staging" {
    set WORKING_DIR "/var/www/vhosts/nuxt"
    set CLONE_DIR "/var/www/vhosts/nuxt"
    spawn ssh sgtek@xxxx.xxxx.xxxx.xxxx -i /env/keys/key.pem
    exp_continue;
  }
  "dev" {
    set WORKING_DIR "/var/www/vhosts/nuxt"
    set CLONE_DIR "/var/www/vhosts/nuxt"
    spawn ssh sgtek@xxxx.xxxx.xxxx.xxxx -i /env/keys/key.pem
  }
}

expect {
  "*yes/no*" { send "yes\r"; exp_continue }
  "*passphrase*" { send "$PASSPHRASE\r"; exp_continue }
  -re {\$ $} {
    send "\r"
  }
}

# Build and copy built folder from CLONE_DIR to WORKING_DIR and then run that code on WORKING_DIR
expect -re {\$ $}
send "cd $CLONE_DIR\r"
expect -re {\$ $}
send "git checkout -- yarn.lock\r"
expect -re {\$ $}
send "git checkout $BRANCH\r"
expect -re {\$ $}
send "git pull\r"
expect -re {\$ $}
send "yarn\r"
expect -re {\$ $}
send "yarn build:$ENV\r"
expect -re {\$ $}
send "rm -rf $WORKING_DIR/.nuxt\r"
expect -re {\$ $}
send "cp -R $CLONE_DIR/.nuxt $WORKING_DIR/.nuxt\r"
expect -re {\$ $}

send "cd $WORKING_DIR\r"
expect -re {\$ $}
send "git checkout -- yarn.lock\r"
expect -re {\$ $}
send "git checkout $BRANCH\r"
expect -re {\$ $}
send "git pull\r"
expect -re {\$ $}
send "yarn\r"
expect -re {\$ $}
send "yarn run:$ENV\r"
expect -re {\$ $}
send "exit\r"
expect eof
