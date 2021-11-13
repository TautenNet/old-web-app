const   $select = selector => document.querySelector(selector),
        $selectAll = selector => document.querySelectorAll(selector);

var screen = {
    switchTo: (toScreen, properties) => {
        let fromScreen = $select("body > .screens > .showed");
        toScreen = $select("body > .screens > ." + toScreen);
        properties = properties || {anim: "scale", duration:300};
        properties.duration = properties.duration || 300;
        
        clearTimeout(screen.currentTimeout)

        if (properties.duration) {
            fromScreen.style.animation = `${properties.anim}out ${properties.duration + 5}ms ease`;
            toScreen.style.animation = `${properties.anim}in ${properties.duration + 5}ms ease`;
        }
        
        screen.currentTimeout = setTimeout(() => {
            fromScreen.classList.remove("showed");
        }, properties.duration)
        toScreen.classList.add("showed");
    },

    floating: {
        show: (floating, properties) => {
            properties = properties || {anim: "scale", duration:300}
            let floatingParent = $select("body > .floatings");
            floating = $select("body > .floatings > ." + floating)
            
            floatingParent.classList.add("showed");
            floating.classList.add("showed");
        }
    },
    
    currentTimeout: setTimeout(null, null)
}