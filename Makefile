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
