export default (items) => {
    const container = document.querySelector('.container');
    const btns = [];
  
    items.forEach(item => {
      const btn = document.createElement('button');
      btn.classList.add('btn', 'btn-primary');
      btn.innerHTML = item.name;
      btn.dataset.description = item.description;
      btns.push(btn);
    });
  
    btns.forEach(btn => container.appendChild(btn));
  
    btns.forEach(btn => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
  
        const description = event.target.dataset.description;
        const descrContainer = document.createElement('div');
        descrContainer.textContent = description;
  
        const existingContainer = container.querySelector('div');
  
        if (existingContainer) {
          if (existingContainer.innerHTML === descrContainer.innerHTML) {
            existingContainer.remove();
          } else {
            existingContainer.textContent = descrContainer.innerHTML;
          }
        } else {
          container.appendChild(descrContainer);
        }
      });
    });
  }