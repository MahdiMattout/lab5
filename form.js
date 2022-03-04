const $ = (id) => { return document.getElementById(id); }
const slider = $('slider');


const getSize = () => {
  return $('slider').value;
}

const checkedToppings = (id) => {
  var checked = [];
  var inputTags = $(id).getElementsByTagName('input');
  for (let i = 0; i < inputTags.length; i++){
    if (inputTags[i].checked) { checked.push(inputTags[i].value); }
  }
  return checked;
}

const getMeat = () => {
  return checkedToppings('meatFieldSet');
}

const getVeg = () => {
  return checkedToppings('veggiesFieldSet');
}

const getCheese = () => {
  const cheese = $('cheese').getElementsByTagName('input')
  for (let i = 0; i < cheese.length; i++){
    if (cheese[i].checked) return cheese[i].value;
  }
  return 0;
}

const _getImageSize = (sliderValue) => {
  switch (sliderValue) {
    case '1':
      return '100px';
    case '2':
      return '150px';
    case '3':
      return '200px';
    case '4':
      return '250px';
  }
}

const _getPizzaSize = (sliderValue) => {
  switch (sliderValue) {
    case '1':
      return 'Small';
    case '2':
      return 'Medium';
    case '3':
      return 'Large';
    case '4':
      return 'X-Large';
  }
}

const _getPizzaPrice = (sliderValue) => {
  switch (sliderValue) {
    case '1':
      return '6';
    case '2':
      return '10';
    case '3':
      return '14';
    case '4':
      return '16';
  }
}

const ChangePizzaSize = (sliderValue) => {
  var sliderText = $('sizeAndPrice');
  var pizzaImg = $('pizzaImg');
  sliderText.textContent = `${_getPizzaSize(sliderValue)} ${_getPizzaPrice(sliderValue)}$`;
  pizzaImg.style.width = _getImageSize(sliderValue);
  pizzaImg.style.height = _getImageSize(sliderValue);
}

slider.addEventListener('change', () => {
  ChangePizzaSize(slider.value);
});

const _getMeatToppingPrice = () => {
  return getMeat().length * 2;
}

const _getVegToppingsPrice = () => {
  return getVeg().length
}

const getTotal = (sliderValue) => {
  return _getPizzaPrice(sliderValue) + _getMeatToppingPrice() + _getVegToppingsPrice() + (getCheese == '3' ? 3 : 0);
}


const fillSummary = () => {
  
}

