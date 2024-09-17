const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

const updateDebounceText = debounce(text => {
    // console.log("hello")
    debounceText.textContent = text;
})

input.addEventListener("input", e => {
    defaultText.textContent = e.target.value;
    updateDebounceText(e.target.value);
})


// input.addEventListener("input", e => updateDebounceText(e.target.value))



function debounce(cb, delay = 1000) {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);  //clears any previous setTimeout if one was still waiting to be executed
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}