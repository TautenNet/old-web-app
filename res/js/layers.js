var screen = {
    switchTo: (toScreen, properties) => {
        let fromScreen = $select("body > .screens > .showed");
        toScreen = $select("body > .screens > ." + toScreen);
        properties = properties || {anim: "scale", duration:300};
        properties.duration = properties.duration || 300;
        
        clearTimeout(screen.currentTimeout)

        fromScreen.style.animation = `${properties.anim}out ${properties.duration + 5}ms ease`;
        toScreen.style.animation = `${properties.anim}in ${properties.duration + 5}ms ease`;
        
        screen.currentTimeout = setTimeout(() => {
            fromScreen.classList.remove("showed");
            screen.updateThemecolor();
        }, properties.duration)
        toScreen.classList.add("showed");

        /*if (toScreen.onshow) toScreen.onshow()
        else console.log("cookie")
        if (fromScreen.onhide) fromScreen.onhide()*/
    },

    updateThemecolor: () => {
        let themeColor = $select("body > .screens > .showed").getAttribute("theme-color") || "var: background-tone-normal";

        if (themeColor.startsWith("var")) {
            //window.getComputedStyle($select("html"), null).getPropertyValue("--accent-tone-100")

            themeColor = themeColor.replaceAll(" ", "").split(":")[1];
            themeColor = (themeColor.startsWith("--") ? "" : "--") + themeColor;

            themeColor = window.getComputedStyle($select("html"), null).getPropertyValue(themeColor);
        }

        $select(".theme-color").setAttribute("content", themeColor)
    },

    onescape: () => {
        try { if ($select("body > .floatings").classList.contains("showed")) $select("body > .floatings > .showed .escapable").click() } catch (e) { console.log("Unescapable floating") }
        try { if (!$select("body > .floatings").classList.contains("showed")) $select("body > .screens > .showed .escapable").click() } catch (e) { console.log("Unescapable screen") }
    },

    floating: {
        show: (floating, properties) => {
            properties = properties || {anim: "scale", duration:300}
            properties.duration = properties.duration || 300
            let floatingParent = $select("body > .floatings");
            floating = $select("body > .floatings > ." + floating)
            
            if (floating) floatingParent.classList.add("showed");
            floating.classList.add("showed");

            floating.style.animation = `${properties.anim}in ${properties.duration + 5}ms ease`;
            floatingParent.style.animation = `fogfadein 0.3s ease`;
        },

        hide: (floating, properties) => {
            properties = properties || {anim: "fade", duration:300}
            properties.duration = properties.duration || 300
            let floatingParent = $select("body > .floatings");
            var muchShowed = 0;
            floating = $select("body > .floatings > ." + floating)

            Array.from(floatingParent.children).forEach(child => {
                if (child.classList.contains("showed") && floating != child) muchShowed++;
            });

            screen.currentTimeout = setTimeout(() => {
                floating.classList.remove("showed");
                if (!muchShowed) floatingParent.classList.remove("showed");
            }, properties.duration)

            floating.style.animation = `${properties.anim}out ${properties.duration + 5}ms ease`;
            if (!muchShowed) floatingParent.style.animation = `fogfadeout ${properties.duration + 5}ms ease`;
        },/*

        onclickoutside: () => {
            console.log("clicked outside floating")
            screen.onescape()
        },*/
    },

    currentTimeout: setTimeout(null, null)

    /*replicate: (fromReplicatable, toCloned, stringObject) => {

    },*/
}