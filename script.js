const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

const defaultMouse = document.getElementById("default-mouse");
const debounceMouse = document.getElementById("debounce-mouse");
const throttleMouse = document.getElementById("throttle-mouse");

let defaultCount = 0;
let debounceCount = 0;
let throttleCount = 0;

const updateDebounceText = debounce(text => {
    debounceText.textContent = text;
})

const updateThrottleText = throttle(text => {
    throttleText.textContent = text;
})

const updateDebounceCount = debounce(() => {
    debounceCount++;
    debounceMouse.textContent = debounceCount;
});

const updateThrottleCount = throttle(() => {
    throttleCount++;
    throttleMouse.textContent = throttleCount;
}, 200);

input.addEventListener("input", e => {
    defaultText.textContent = e.target.value;
    updateDebounceText(e.target.value);
    updateThrottleText(e.target.value);
})

document.addEventListener("mousemove", e => {
    defaultCount++;
    defaultMouse.textContent = defaultCount;
    updateDebounceCount();
    updateThrottleCount();
});

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

// Throttle: Limits the rate of function execution
// Unlike debounce, throttle guarantees function execution at regular intervals
// Useful for continuous events like scrolling or resizing
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