// this need a rewrite or need to be improved

var swipeDiscussion = {
    enabled: false,
    startY: 0,
    moveY: 0,
    startDate: 0,

    showList: () => {

    },

    showDiscussion: () => {
        
    }
};

$select(".screens > .discussion").ontouchmove = event => {
    if (swipeDiscussion.enabled) {
        swipeDiscussion.moveY = event.changedTouches[0].pageY - swipeDiscussion.startY;
        let moveY = swipeDiscussion.moveY;
        moveY = moveY > 0 ? moveY / 10 : moveY
        $select(".screens > .discussion").style.transform = `translateY(${moveY}px)` 
        $select(".screens > .discussionList").style.transform = `translateY(${moveY + window.innerHeight}px)`
        //console.log(moveY)
    }
}

$select(".screens > .discussion").ontouchstart = event => {
    swipeDiscussion.startY = event.changedTouches[0].pageY;
    swipeDiscussion.moveY = 0;
    swipeDiscussion.enabled = (window.innerHeight - 150) < swipeDiscussion.startY ? true : false;

    $select(".screens > .discussionList").classList.add(swipeDiscussion.enabled ? "showed" : null)
    $select(".screens > .discussionList").style.transform = `translateY(${window.innerHeight}px)`
    $select(".screens > .discussionList").style.animation = `none`
    $select(".screens > .discussionList").style.background = `var(--background-tone-dark)`
    $select(".screens > .discussion").style.transition = "0s"
    $select(".screens > .discussionList").style.transition = "0s"

    swipeDiscussion.startDate = Date.now();
}

$select(".screens > .discussion").ontouchend = event => {
    let moveY = swipeDiscussion.moveY,
    startDate = swipeDiscussion.startDate,
    endDate = Date.now(),
    swipeAcceptance = (startDate - endDate) / 2;
    swipeAcceptance = swipeAcceptance < -200 ? -200 : swipeAcceptance;
    $select(".screens > .discussion").style.transition = "0.3s"
    $select(".screens > .discussionList").style.transition = "0.3s"
    $select(".screens > .discussion").style.transform = moveY < swipeAcceptance ? `translateY(-100%)` : `translateY(0px)`
    $select(".screens > .discussionList").style.transform = moveY < swipeAcceptance ? `translateY(0px)` : `translateY(${window.innerHeight}px)`
    $select(".screens > .discussionList").style.background = moveY < swipeAcceptance ? `var(--background-tone-normal)` : `var(--background-tone-dark)`
    swipeDiscussion
    console.log(swipeAcceptance)

    setTimeout(() => {
        (moveY < swipeAcceptance ? $select(".screens > .discussion") : $select(".screens > .discussionList")).classList.remove("showed")
        $select(".screens > .discussion").style.transform = `translateY(0px)`
    }, 300)
}