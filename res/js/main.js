const   $select = selector => document.querySelector(selector),
        $selectAll = selector => document.querySelectorAll(selector);

$select(".screens").setAttribute("style", null)
$select(".floatings").setAttribute("style", null)

function signup() {
    //screen.floating.show("inputmissing")
    screen.floating.show("loading")
    setTimeout(() => {
        screen.switchTo("discussion")
        screen.floating.hide("loading", {anim: "scale"})
    }, 2000)
}

var signin = signup;

document.onkeydown = event => {
    switch(event.key) {
        case "Escape":
            screen.onescape();
            break;
    }
};

document.onclick = event => {
    switch(event.target) {
        case $select("body > .floatings"):
            screen.onescape();
            break;
        case $select("body > .floatings > .discussionsList"):
            screen.onescape();
            break;
    }
}

if (window.matchMedia('(prefers-color-scheme: dark)').media === 'not all') {
    document.head.insertAdjacentHTML(
      "beforeend",
      '<link rel="stylesheet" href="res/css/dark-theme.css">',
    );
}