index=1
cwd=$(pwd)
echo  "{'urls':["

for file in $cwd/*.mp4
do
   echo "\"${file}\","
done

echo "]}"
