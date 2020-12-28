compileserver:
	@echo "Compiling Go server..."
	cd server && go build -o ../bin/audiocontrol

compileapp:
	@echo "Compiling React App..."
	cd app && npm run build && cp -R build/* ../bin/build

compile: compileserver compileapp

run: 
	bin/audiocontrol