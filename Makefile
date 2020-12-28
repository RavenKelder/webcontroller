prebuild:
	rm -r bin
	mkdir -p bin bin/build

compileserver:
	@echo "Compiling Go server..."
	cd server && go build -o ../bin/webcontroller

compileapp:
	@echo "Compiling React App..."
	cd app && npm run build && cp -R build/* ../bin/build

compile: prebuild compileserver compileapp

run: 
	bin/audiocontrol