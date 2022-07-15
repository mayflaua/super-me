<template>
  <div class="password">
    <div class="password__options">
      <div class="options options-length">
        <input
          class="options-length__input"
          value="8"
          type="range"
          min="8"
          max="32"
          step="4"
          oninput="lengthvalue.value=value"
        />
        <output id="lengthvalue" class="options-length__value">8</output>
        <label class="options-length__label" for="length">длина</label>
      </div>
      <div class="options options-symbols">
        <input type="checkbox" id="symbols" />
        <div class="checkbox"></div>
        <label for="symbols">cимволы</label>
        <div class="options__tip">
          <div class="options__tip-info">!@#$%^&*()_+~`|}{[]\:;?>&lt;,./-=</div>
          <div class="options__tip-arrow"></div>
          ?
        </div>
      </div>
      <div class="options options-uppercase">
        <input type="checkbox" id="uppercase" />
        <div class="checkbox"></div>
        <label for="uppercase">буквы верхнего регистра</label>
        <div class="options__tip">
          <div class="options__tip-info">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          <div class="options__tip-arrow"></div>
          ?
        </div>
      </div>
      <div class="options options-lowercase">
        <input type="checkbox" id="lowercase" />
        <div class="checkbox"></div>
        <label for="lowercase">буквы нижнего регистра</label>
        <div class="options__tip">
          <div class="options__tip-info">abcdefghijklmnopqrstuvwxyz</div>
          <div class="options__tip-arrow"></div>
          ?
        </div>
      </div>
      <div class="options options-numbers">
        <input type="checkbox" id="numbers" />
        <div class="checkbox"></div>
        <label for="numbers">цифры</label>
        <div class="options__tip">
          <div class="options__tip-info">1234567890</div>
          <div class="options__tip-arrow"></div>
          ?
        </div>
      </div>
      <div class="options options-averaging">
        <input type="checkbox" id="averaging" />
        <div class="checkbox"></div>
        <label for="averaging">усреднение</label>
        <div class="options__tip">
          <div class="options__tip-info">
            Усредняет количество символов разных групп
          </div>
          <div class="options__tip-arrow"></div>
          ?
        </div>
      </div>
    </div>
    <div class="password-generate">
      <div class="password__output"></div>
      <button class="password-generate__button">сгенерировать</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let button = document.querySelector(".password-generate__button");
    let obj = document.querySelector(".password__output");

    let optionsCheckboxes = document.querySelector(".password__options");

    var animationDone = true;

    const pushPassword = () => {
      if (animationDone && checkOptions()) {
        password = generatePassword(getOptions());

        clearSpans();
        addSpans();

        animateLetters();
      } else if (!checkOptions()) {
        shakeCheckboxes();
      }
    };

    let password = "";
    const speed = 20;

    // список для анимации перебора
    let animList = "danil".split("");

    // функция задержки(delay) в ms
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // функция перемешивания массива
    const shuffle = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };

    // выделен ли хоть один чекбокс
    const checkOptions = () => {
      let opts = getOptions();
      return opts.symbols || opts.uppercase || opts.lowercase || opts.numbers
        ? true
        : false;
    };

    const shakeCheckboxes = () => {
      document
        .querySelectorAll(".checkbox")
        .forEach((el) => el.classList.toggle("pulse"));
    };

    // предварительная разметка для вывода пароля
    const addSpans = () => {
      for (var i = 0; i < password.length; i++) {
        var span = document.createElement("span");
        span.classList.add("password-symbol");
        obj.append(span);
      }
    };
    // очистка разметки под пароль
    const clearSpans = () => {
      obj.innerHTML = "";
    };

    const animateLetter = async (index) => {
      // вынимаем нужный спан
      var span = obj.children[index];

      // пробег по animList с задержкой speed
      for (var i = 0; i < animList.length; i++) {
        span.innerHTML = animList[i];
        await sleep(speed);
      }
      // вставляем конечный символ
      // из сгенерированного пароля
      // после конца анимации
      span.innerHTML = password[index];
      if (!isNaN(password[index])) {
        span.style.color = "#9063cd";
      }
    };

    const animateLetters = async () => {
      // чтобы предотвратить ошибки в анимации
      animationDone = false;
      for (var i = 0; i < obj.children.length; i++) {
        animateLetter(i);
        await sleep(speed * (animList.length - 1));
      }
      animationDone = true;
    };

    const generatePassword = (options) => {
      let symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=".split("");
      let numbers = "1234567890".split("");
      let lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
      let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

      let charArrays = [];
      let result = [];

      // заполнение charArrays массивами разрешенных символов
      options.symbols ? charArrays.push(symbols) : null;
      options.numbers ? charArrays.push(numbers) : null;
      options.lowercase ? charArrays.push(lowercase) : null;
      options.uppercase ? charArrays.push(uppercase) : null;

      for (var i = 0; i < options.length; i++) {
        let arr;
        if (options.averaging) {
          // перебор по порядку массивов charArrays
          arr =
            charArrays[
              i - charArrays.length * Math.floor(i / charArrays.length)
            ];
        } else {
          // случайный массив из charArrays
          arr = charArrays[Math.floor(Math.random() * charArrays.length)];
        }

        // случайный символ из arr
        result.push(arr[Math.floor(Math.random() * arr.length)]);
      }
      shuffle(result);
      return result;
    };

    const getOptions = () => {
      var optionFields = optionsCheckboxes.children;
      var options = {
        length: 8,
        symbols: true,
        uppercase: true,
        lowercase: true,
        numbers: true,
      };

      options.length = optionFields[0].children[0].value;
      options.symbols = optionFields[1].children[0].checked;
      options.uppercase = optionFields[2].children[0].checked;
      options.lowercase = optionFields[3].children[0].checked;
      options.numbers = optionFields[4].children[0].checked;
      options.averaging = optionFields[5].children[0].checked;

      return options;
    };

    button.addEventListener("click", pushPassword);
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/colors.scss";
.pulse {
  animation-name: pulse;
  animation-duration: 0.5s;
  animation-fill-mode: both;
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.password {
  display: flex;
  flex-direction: column;

  &-generate {
    margin: 0 auto;

    max-width: 600px;
    min-width: 450px;
    width: 100%;

    &__button {
      cursor: poiner;

      display: block;
      margin: 25px auto;
      padding: 10px 20px;
      width: 260px;
      border: none;

      text-align: center;
      text-decoration: none;
      color: black;
      background-color: white;
      font-size: 22px;
      font-weight: 600;
      border-radius: 25px;
      border: 2px solid $purple;
      box-shadow: 0px 2px 5px 2px rgba(34, 60, 80, 0.2);

      transition: background-color 0.3s ease;

      text-transform: uppercase;

      &:hover {
        background-color: lighten($purple, 10);
      }
    }
  }

  &__output {
    height: 100px;
    background-color: #eee;
    border: 3px solid $purple;
    border-radius: 50px;

    text-align: center;
    line-height: 100px;

    font-size: 24px;
    font-weight: 600;
  }
}

.checkbox {
  display: inline-block;
  min-width: 30px;
  min-height: 30px;
  background-color: none;
  border: 2px solid black;
  border-radius: 5px;

  transition: all 0.1s ease;

  cursor: pointer;
}

input[type="checkbox"] {
  position: absolute;
  width: 30px;
  height: 30px;
  opacity: 0;
  cursor: pointer;
}

.options {
  max-width: 600px;
  margin: 0 auto;

  cursor: pointer;
  display: flex;
  margin-bottom: 15px;

  & label {
    cursor: pointer;
    margin-left: 15px;
    display: block;
    height: 32px;
    width: 100%;
    line-height: 32px;
    text-transform: uppercase;
    font-size: 20px;

    font-weight: 500;
  }

  &__tip {
    position: relative;

    min-width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin-left: 5px;

    transition: all 0.3s ease;

    border-radius: 50%;

    &-arrow {
      transition: 0.2s ease;

      opacity: 0;

      pointer-events: none;

      border: 8px solid transparent;
      border-top-color: $purple;

      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translate(-50%, 8px);

      width: 0;
      height: 0;

      z-index: 2;
    }

    &-info {
      transition: 0.2s ease;

      min-width: 250px;
      width: 300px;
      opacity: 0;

      pointer-events: none;
      background-color: #eee;
      border: 2px solid $purple;
      border-radius: 10px;

      position: absolute;
      bottom: 100%;
      left: -120px;
      transform: translate(-50%, -8px);

      z-index: 2;

      box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    }

    &:hover {
      & .options__tip-arrow,
      & .options__tip-info {
        opacity: 1;
        pointer-events: initial;
      }
    }
  }

  &-length {
    display: flex;
    flex-direction: column-reverse;

    &__label {
      text-align: center;
    }
  }

  &-symbols,
  &-uppercase,
  &-lowercase,
  &-numbers,
  &-averaging {
    & input[type="checkbox"]:checked ~ .checkbox {
      background-image: url("@/assets/icons/checkbox.png");
      background-repeat: no-repeat;
      background-size: 90%;
      background-position: center;
    }
  }

  &:hover > .checkbox,
  &:hover > &__tip {
    background-color: lighten($purple, 10);
  }
}

@media (max-width: 768px) {
  .password-generate {
    min-width: 0;
  }

  .password__output {
    margin: 0 auto;
    padding: 20px;

    font-size: 18px;
    min-height: 60px;
    line-height: 60px;
    width: 250px;
    word-wrap: break-word;
    overflow: hidden;
  }
}

@media (max-width: 515px) {
  .options {
    margin-bottom: 35px;
  }
}
</style>
