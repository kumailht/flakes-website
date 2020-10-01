# Flakes Homepage & Documentation
Homepage & Documentation to the [Flakes admin framework](https://github.com/kumailht/flakes/). Uses the [Cactus](https://github.com/koenbok/Cactus) static site generator. 

## Setup instructions

#### Clone the repository and all submodules
`git clone --recursive https://github.com/kumailht/flakes-website.git`

#### Install dependencies
```cd static
bower install```(Bower works by fetching and installing packages from all over, taking care of hunting, finding, downloading, and saving the stuff you’re looking for. Bower keeps track of these packages in a manifest file, bower.json. How you use packages is up to you. Bower provides hooks to facilitate using packages in your tools and workflows.)

#### Run SASS (if you're making changes to the CSS)
```
cd static/css
sass --watch website.sass:website.css --style compressed
sass --watch preview.sass:preview.css --style compressed
```

#### Install Cactus (https://github.com/koenbok/Cactus)
`sudo easy_install cactus`

#### Run the Cactus server
`cactus serve`

#### Build the website (outputs a website in the .build directory)
`cactus build`
