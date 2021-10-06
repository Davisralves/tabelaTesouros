const d100 = () => Math.round(Math.random() * (100) + 0.5);

const fetchItem = (item) => {
  return fetch(`https://api.open5e.com/magicitems/${item}/?format=json`)
  .then((data) => data.json());
  };

const serchApi = async (item) => {
  itemName = item.toLowerCase().replaceAll(' ','-');
    if (itemName.slice(0,12) === 'spell-scroll') { 
      var itemName = 'spell-scroll';
   };
    const itemObject = await fetchItem(itemName); 
    return itemObject;
};

const removeSelected = () => {
const allTablesLines = document.querySelectorAll('tr');
allTablesLines.forEach((line) => line.classList.remove('selected'));
};

const findResult = (value, result) => {
  let boolean = false;
  if(value) {
    let splitValue = value.split('–');
    if (splitValue.length === 1) {
      const number = parseInt(splitValue);
      number === result ? boolean = true : boolean = false;
    };
    const menorNumero = parseInt(splitValue[0]);
    const maiorNumero = parseInt(splitValue[1]);
    if (result >= menorNumero && result <= maiorNumero) {
      boolean = true;
      return boolean
    } else {return boolean} ;
  };
};

window.onload = function() {
  const addResult = () => {
    const rolagem = d100();
    const resultado = document.querySelector('#resultado');
    resultado.innerText = `Resultado: ${rolagem}`;
    return rolagem;
  };

 const sortAndFindItem = () => {
  const result = addResult();
  const table = document.getElementById('tables').value;
  const actualTable = document.querySelector(table);
  const tableItems = actualTable.querySelectorAll('tr');
  let sortedItem = 'string';
  tableItems.forEach((item, index) => {
    if (index !== 0) {
      const value = item.querySelector('td').innerText;
      if(findResult(value, result)) {
        sortedItem = item;
      };
    };
  });
  sortedItem.scrollIntoView({block: "center", behavior: "smooth"});;
  sortedItem.className = 'selected';
  return sortedItem;
 }

  const main = async () => {
    const sortedItem = sortAndFindItem();
    const itemDiv = document.querySelector('#apiResult');
    const apiTitle = document.querySelector('#apiTitle');
    const apiRarity = document.querySelector('#apiRarity');
    const ItemObject = serchApi(sortedItem.lastElementChild.innerText)
    .then((item) => {
      if (item.detail === 'Not found.') {
        apiTitle.innerText = 'Item not found';
        itemDiv.innerText= '';
        apiRarity.innerText = '';
      } else {
        itemDiv.innerText= item.desc;
        apiTitle.innerText = item.name;
        apiRarity.innerText = `Rarity: ${item.rarity}`;
        itemDiv.style.overflow = 'visible';
      }
    });
  };

  const tableScroll = () => {
    const table = document.getElementById('tables');
    const actualTable = document.querySelector(table.value);
    actualTable.scrollIntoView({ behavior: "smooth" });
  }
  
  const table = document.getElementById('tables');
  table.addEventListener('click', tableScroll);
  const button = document.querySelector('#button');
  button.addEventListener('click', main);
  const clearButton = document.querySelector('#clear');
  clearButton.addEventListener('click', removeSelected);
};
