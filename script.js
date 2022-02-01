const ptTextArea = document.getElementById('pt-text-area');
const kuTextArea = document.getElementById('ku-text-area');

const translateButton = document.getElementById('button');
translateButton.addEventListener('click', translate);
const data = await fetch('./data.json').then(response => response.json());
console.log(data);
function translate(){
  ptTextArea.value = ptTextArea.value.toLowerCase();
  const ptText = ptTextArea.value;
  
  const kuText = ptText.split(' ').map(word => {
    const wordData = ask(word);
    
    if(wordData){
      const kuWord = data[wordData.word];
      return kuWord ? kuWord + wordData.lastChar : word;
    }else{
      const kuWord = data[word];
      return kuWord ? kuWord : word;
    }
    
  }).join(' ');

  kuTextArea.value = kuText;
}

function ask(word){
  const tst = "!?";
  if(tst.includes(word.charAt(word.length-1))){
    return {
      word: word.substring(0, word.length-1),
      lastChar: word.charAt(word.length-1)
    }
  }
}

function replace(word){
  return word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

window.replace = replace;