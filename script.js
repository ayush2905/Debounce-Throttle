const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

const updateDebounceText = debounce(text => {
    debounceText.textContent = text;
})

const updateThrottleText = throttle(text => {
    throttleText.textContent = text;
})

input.addEventListener("input", e => {
    defaultText.textContent = e.target.value;
    updateDebounceText(e.target.value);
    updateThrottleText(e.target.value);
})



// batch all the changes and send them at once instead of sending multiple requests
function debounce(cb, delay = 1000) {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);  //clears any previous setTimeout if one was still waiting to be executed
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

function throttle(cb, delay = 1000) {
    let shouldWait = false;
    let waitingArgs;

    const setTimeoutFunc = () => {
        if(waitingArgs==null) {
            shouldWait = false;
        } else {
            cb(...waitingArgs);
            waitingArgs = null;
            setTimeout(setTimeoutFunc, delay);
        }
    }

    return (...args) => {
        if(shouldWait) {
            waitingArgs = args;
            return;
        }

        cb(...args);

        shouldWait = true;

        setTimeout(setTimeoutFunc, delay);
    }
}