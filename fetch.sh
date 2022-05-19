
#! /bin/bash
file=${1--}
while IFS="," read -r name login department
do
  curl -sS -L -c ~/.midway/cookie -b ~/.midway/cookie https://phonetool.amazon.com/users/$login.json > ./$2/$login.json
  echo $login
  sleep 1

done < <(tail -n +2 $file)
