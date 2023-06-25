const notebookFilter = (laptopList) => {
  const filterForm = document.querySelector('form');
  const filteredResult = document.querySelector('.result');

  
switch (true) {
  case !filterForm:
    return;
  case !filteredResult:
    return;
  default:
    break;
}

const laptopListFilter = () => {
  const laptopFilters = {
    processor: document.querySelector('select[name="processor_eq"]').value,
    memory: document.querySelector('select[name="memory_eq"]').value,
    frequency_gte: document.querySelector('input[name="frequency_gte"]').value,
    frequency_lte: document.querySelector('input[name="frequency_lte"]').value,
  };

  const filteredLaptopList = laptopList.filter(laptop => {
    for (let key in laptopFilters) {
      switch (key) {
        case 'processor':
        case 'memory':
          if (laptopFilters[key] != '' && laptop[key] != laptopFilters[key]) {
            return false;
          }
          break;
        case 'frequency_gte':
          if (laptopFilters[key] != '' && laptop.frequency < laptopFilters[key]) {
            return false;
          }
          break;
        case 'frequency_lte':
          if (laptopFilters[key] != '' && laptop.frequency > laptopFilters[key]) {
            return false;
          }
          break;
        default:
          break;
      }
    }
    return true;
  });

  if (filteredLaptopList.length == 0) {
    filteredResult.innerHTML = '';
    return;
  }

  filteredResult.innerHTML = '';

  const ul = document.createElement('ul');
  ul.classList.add('list-group');

  filteredLaptopList.forEach(laptop => {
    const li = document.createElement('li');
    li.textContent = laptop.model;
    li.classList.add('list-group-item');
    ul.appendChild(li);
  });

  filteredResult.appendChild(ul);
};

  laptopListFilter();

  filterForm.addEventListener('input', laptopListFilter);
};

export default notebookFilter;