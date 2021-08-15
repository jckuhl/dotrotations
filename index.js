(function() {
    const grid = document.querySelector('.grid');
    const absoluteGrid = document.querySelector('.grid.absolute');
    
    for(let i = 0; i < 10000; i++) {
        const div = document.createElement('div');
        div.classList.add('circle');
        div.classList.add(Math.random() > 0.5 ? 'white' : 'black');
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
    
    absoluteGrid.addEventListener('click', (event)=> {
        const gridRect = grid.getBoundingClientRect();
        const x = event.clientX - gridRect.left;
        const y = event.clientY - gridRect.top;
        if(!running) {
            running = true;
            handle = rotateDiv(absoluteGrid, x, y);
        } else {
            running = false;
            clearInterval(handle);
            setAbsoluteGridPos();
        }
    });
    
    function rotateDiv(div, x, y) {
        let z = 0;
        return setInterval(() => {
            div.style.transformOrigin = `${x}px ${y}px`;
            div.style.transform = `rotate(${z++}deg)`;
        }, 100);
    }

    window.addEventListener('resize', (event)=> {
        running = false;
        clearInterval(handle);
        setAbsoluteGridPos();
    });

    document.querySelector('#reset').addEventListener('click', (event)=> {
        running = false;
        clearInterval(handle);
        setAbsoluteGridPos();
    });
})();