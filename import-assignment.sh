
studentgithubs=(
	marmstr1123 
	jordanledford
	PaulRSwift	
)


for i in ${studentgithubs[@]}; do
  mkdir -p $i
  cd $i
  git clone git@github.com:$i/$1.git
  cd ..
done