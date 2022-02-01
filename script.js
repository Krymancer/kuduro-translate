const ptTextArea = document.getElementById('pt-text-area');
const kuTextArea = document.getElementById('ku-text-area');

const translateButton = document.getElementById('button');
translateButton.addEventListener('click', translate);

const data = await fetch('./data.json').then(response => response.json());

window.data = data;

console.log(data);

function translate(){
  const ptText = ptTextArea.value;
  
  const kuText = ptText.split(' ').map(word => {
    const kuWord = data[word];
    return kuWord ? kuWord : word;
  }).join(' ');

  kuTextArea.value = kuText;
}