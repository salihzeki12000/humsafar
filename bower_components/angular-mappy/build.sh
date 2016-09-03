rm -rf build
mkdir build
coffee -o build -c src/angular-mappy.coffee
scss src/angular-mappy.scss > build/angular-mappy.css