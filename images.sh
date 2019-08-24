for file in images-new/*.jpg
do
	sizes=(144 240 360 480 720 1080)
	for size in ${sizes[@]}
	do
		nf=${file/images-new\//}
		nf=${nf/.jpg/-${size}.jpeg}
		convert -resize $size -quality 100 $file images-intermediate/$nf
		cjpeg "images-intermediate/$nf" >"images/$nf"
		rm images-intermediate/$nf
		echo $nf
	done
	mv $file ${file/images-new/images-archive}
done
