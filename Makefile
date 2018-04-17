WHERE=$(PWD)

all: clean ${WHERE}/dist/index.html

clean:
	rm -rf ${WHERE}/dist

${WHERE}/dist/index.html:
	npm install
	npm update
	npm run build
	ls -lrt dist
	cd dist && tar cvf ../dist.tar *

tag:
	git config --local user.name "Yannick Roffin"
	git config --local user.email "yroffin@gmail.com"
	git tag "$(shell date +'%Y%m%d-%H%M%S')"
	git push --tags
