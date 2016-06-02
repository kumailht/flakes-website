#### Flakes Homepage & Documentation
Homepage & Documentation to the [Flakes admin framework](https://github.com/kumailht/flakes/). Uses the [Cactus](https://github.com/koenbok/Cactus) static site generator. 

# How to run the Flakes Website & Documentation locally

1. Clone the repository and all submodules
git clone --recursive https://github.com/kumailht/flakes-website.git

2. Install dependencies
cd static
bower install

3. Run SASS (if you're making changes to the CSS)
cd static/css
sass --watch website.sass:website.css --style compressed
sass --watch preview.sass:preview.css --style compressed


3. Install Cactus (https://github.com/koenbok/Cactus)
sudo easy_install cactus

4. Run the Cactus server
cactus serve

4. Build the website (outputs a website in the .build directory)
cactus build
