function cl(message) {
    return (console.log(message))
}

upcount = 0
downcount = 0
function vote(votes) {
    var upvote_element = getId('upvote_element')
    var downvote_element = getId('downvote_element')
    if (votes == 'upvote') {
        if (downvote_element.value == 0) {
            up(upvote_element)
        } else {
            downcount = 0
            downvote_element.value = downcount
            up(upvote_element)
        }
    } else {
        if (upvote_element == 0) {
            down(downvote_element)
        } else {
            upcount = 0
            upvote_element.value = upcount
            down(downvote_element)
        }
    }
}

function up(upvote_element) {
    upcount++
    upvote_element.value = upcount
    upcount = 0
}

function down(downvote_element) {
    downcount++
    downvote_element.value = downcount
    downcount = 0
}

function getId(element) {
    var ID = document.getElementById(element)
    return ID
}