const grid = document.querySelector('.grid');
const absoluteGrid = document.querySelector('.grid.absolute');

for(let i = 0; i < 10000; i++) {
    const div = document.createElement('div');
    div.classList.add('square');
    if(Math.floor(i / 100) % 2 == 0)
        div.classList.add(i % 2 === 0 ? 'white' : 'black');
    else
        div.classList.add(i % 2 !== 0 ? 'white' : 'black');
    const div2 = div.cloneNode()
    grid.appendChild(div);
    absoluteGrid.appendChild(div2);
}

function setAbsoluteGridPos() {
    const gridRect = grid.getBoundingClientRect();
    absoluteGrid.style.top = gridRect.top + scrollY + 'px';
    absoluteGrid.style.left = gridRect.left + scrollX + 'px';
    absoluteGrid.style.transform = 'rotate(0deg)';
    absoluteGrid.style.transformOrigin = 'center';
}

setAbsoluteGridPos();

let running = false
let handle = null;

document.querySelector('#rotate').addEventListener('click', (event)=> {
    if(!running) {
        running = true;
        handle = rotate(absoluteGrid);
    } else {
        running = false;
        clearInterval(handle);
        setAbsoluteGridPos();
    }
});

function rotate(div) {
    let rot = 0;
    return setInterval(()=> {
        div.style.transform = `rotate(${rot++}deg)`;
    }, 100);
}