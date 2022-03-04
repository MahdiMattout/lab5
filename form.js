const $ = (id) => { return document.getElementById(id); }
const slider = $('slider');
$('addressDetailsForm').style.display='none';
$('orderSummaryForm').style.display='none';
document.body.style.backgroundColor = '#01dddd';


const getSize = () => {
  return $('slider').value;
}

const checkedToppings = (id) => {
  var checked = [];
  var inputTags = $(id).getElementsByTagName('input');
  for (let i = 0; i < inputTags.length; i++){
    if (inputTags[i].checked) { checked.push(inputTags[i]); }
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
    default: '100px'
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
    default:
      return 'Small';
  }
}

const _getPizzaPrice = (sliderValue) => {
  switch (sliderValue) {
    case '1':
      return 6;
    case '2':
      return 10;
    case '3':
      return 14;
    case '4':
      return 16;
    default:
      return 6;
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
  return _getPizzaPrice(sliderValue) + _getMeatToppingPrice() + _getVegToppingsPrice() + (getCheese() == 3 ? 3 : 0);
}


const fillSummary = () => {
  const orderSummaryP = $('dlvrTo');
  const firstNameField = $('firstNameField').value;
  const lastNameField = $('lastNameField').value;
  const emailField = $('emailField').value;
  const phoneNumberField = $('phoneNumberField').value;
  const citySelect = $('citySelect').value;
  const addressTextArea = $('addressTextArea').value;
  orderSummaryP.textContent =
    `${firstNameField} ${lastNameField}, ${emailField}, ${phoneNumberField}, ${citySelect} - ${addressTextArea}`;
  
  const orderList = $('orderList');
  orderList.innerHTML = ""
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(`${_getPizzaSize(slider.value)} size`))
  orderList.append(li);
  const checkedArr = checkedToppings('form1');
  for(let i = 0; i < checkedArr.length; i++) {
    if (checkedArr[i].getAttribute('name') != 'paymentRadio') {
      li = document.createElement("li");
      li.appendChild(document.createTextNode(checkedArr[i].value));
      orderList.appendChild(li);
    }
  }
  const total = $('total');
  total.innerHTML = `Total: ${getTotal()}$`;
}

const goToPage = (pageNumber) => {
  switch (pageNumber) {
    case 1:
      $('form1').style.display = 'inherit';
      $('addressDetailsForm').style.display = 'none';
      $('orderSummaryForm').style.display = 'none';
      document.body.style.backgroundColor = '#01dddd';
      break;
    case 2:
      $('form1').style.display = 'none';
      $('addressDetailsForm').style.display = 'inherit';
      $('orderSummaryForm').style.display = 'none';
      document.body.style.backgroundColor = '#e93a57';
      break;
    case 3:
      $('form1').style.display = 'none';
      $('addressDetailsForm').style.display = 'none';
      $('orderSummaryForm').style.display = 'inherit';
      document.body.style.backgroundColor = '#3fc38e';
      break;
    default:
      goToPage(1);
  }
}

const checkInfo = () => {
  const addressDetailsForm = $('addressDetailsForm');
  const fields = addressDetailsForm.getElementsByClassName('addressDetailsFormFields');
  for(let i = 0; i < fields.length; i++) {
    if (fields[i].value === '') return false;
  }
  return true;
}

const form1Button = $('form1NextButton');
form1Button.addEventListener('click', (e) => {
  e.preventDefault();
  goToPage(2);
})

const addressDetailsFormBackButton = $('addressDetailsFormBackButton')
addressDetailsFormBackButton.addEventListener('click', (e) => {
  e.preventDefault();
  goToPage(1);
})

const addressDetailsFormNextButton = $('addressDetailsFormNextButton')
addressDetailsFormNextButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (!checkInfo()) {
    alert('All forms must be filled!');
    return;
  }
  goToPage(3);
  fillSummary();
})

const orderSummaryBackButton = $('orderSummaryBackButton')
orderSummaryBackButton.addEventListener('click', (e) => {
  e.preventDefault();
  goToPage(2);
})
 

