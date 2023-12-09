const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

    let sum = 0;

    const calcFunc = () => {
        sum = Math.round((parseFloat(sizeBlock.value)) * (parseFloat(materialBlock.value)) + parseFloat(optionsBlock.value));

        if (sizeBlock.value === '' || materialBlock.value === '') {
            resultBlock.innerText = "Будь ласка, оберіть розмір та матеріал картинки";
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.innerText = Math.round(sum * 0.7);
        } else {
            resultBlock.innerText = sum;
        }
    }

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;