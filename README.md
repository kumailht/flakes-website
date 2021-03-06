# Flakes Homepage & Documentation
Homepage & Documentation to the [Flakes admin framework](https://github.com/kumailht/flakes/). Uses the [Cactus](https://github.com/koenbok/Cactus) static site generator. 

## Setup instructions

#### Clone the repository and all submodules
`git clone --recursive https://github.com/kumailht/flakes-website.git`

#### Install dependencies
```cd static
bower install```

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
