(function () {
  const svgIcon = `
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" viewBox="0 0 699.428 699.428" style="enable-background:new 0 0 699.428 699.428;"
  xml:space="preserve">
<g>
 <g id="_x33__21_">
   <g>
     <path d="M502.714,0c-2.71,0-262.286,0-262.286,0C194.178,0,153,42.425,153,87.429l-25.267,0.59
       c-46.228,0-84.019,41.834-84.019,86.838V612c0,45.004,41.179,87.428,87.429,87.428H459c46.249,0,87.428-42.424,87.428-87.428
       h21.857c46.25,0,87.429-42.424,87.429-87.428v-349.19L502.714,0z M459,655.715H131.143c-22.95,0-43.714-21.441-43.714-43.715
       V174.857c0-22.272,18.688-42.993,41.638-42.993L153,131.143v393.429C153,569.576,194.178,612,240.428,612h262.286
       C502.714,634.273,481.949,655.715,459,655.715z M612,524.572c0,22.271-20.765,43.713-43.715,43.713H240.428
       c-22.95,0-43.714-21.441-43.714-43.713V87.429c0-22.272,20.764-43.714,43.714-43.714H459c-0.351,50.337,0,87.975,0,87.975
       c0,45.419,40.872,86.882,87.428,86.882c0,0,23.213,0,65.572,0V524.572z M546.428,174.857c-23.277,0-43.714-42.293-43.714-64.981
       c0,0,0-22.994,0-65.484v-0.044L612,174.857H546.428z M502.714,306.394H306c-12.065,0-21.857,9.77-21.857,21.835
       c0,12.065,9.792,21.835,21.857,21.835h196.714c12.065,0,21.857-9.771,21.857-21.835
       C524.571,316.164,514.779,306.394,502.714,306.394z M502.714,415.57H306c-12.065,0-21.857,9.77-21.857,21.834
       c0,12.066,9.792,21.836,21.857,21.836h196.714c12.065,0,21.857-9.77,21.857-21.836C524.571,425.34,514.779,415.57,502.714,415.57
       z"/>
   </g>
 </g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
  `;

  const URL_SPREADSHEET = "http://localhost:8000/api/spreadsheet/append";
  const SPREADSHEET_ID = "1x7nFPG7UmoSd1dLLPD5w4uRfHoEfFCEUH232E_xSOwk";
  const SHEET_NAME = "Лист1";
  const START_COLUMN = "A";
  const END_COLUMN = "G";

  const SPREADSHEET_VALUES = {
    owner: "Александр",
    city: "",
    name: "",
    site: "",
    status: "",
    date: new Date()
      .toLocaleString({
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
      .split(",")[0],
  };

  let $boxExcel = null;
  let $btnExcel = null;

  function createBoxExcel() {
    $boxExcel = document.createElement("div");
    $boxExcel.style.position = "fixed";
    $boxExcel.style.bottom = "0";
    $boxExcel.style.right = "0";
    $boxExcel.style.left = "0";
    $boxExcel.style.background = "#FFF";
    $boxExcel.style.zIndex = "9999999";
    $boxExcel.style.display = "flex";
    $boxExcel.style.justifyContent = "space-around";
    $boxExcel.style.alignItems = "baseline";
    $boxExcel.style.padding = "40px 20px";
    $boxExcel.style.borderTopLeftRadius = "30px";
    $boxExcel.style.borderTopRightRadius = "30px";
    $boxExcel.style.boxShadow = "0 0 50px 0 rgba(133, 133, 133, 0.5)";

    $boxExcel.addEventListener("input", function (e) {
      switch (e.target.dataset.type) {
        case "name":
          SPREADSHEET_VALUES["name"] = e.target.value;
          break;
        case "city":
          SPREADSHEET_VALUES["city"] = e.target.value;
          break;
        case "phone":
          SPREADSHEET_VALUES["phone"] = e.target.value;
          break;
        case "site":
          SPREADSHEET_VALUES["site"] = e.target.value;
          break;
        case "status":
          SPREADSHEET_VALUES["status"] = e.target.value;
          break;
      }
    });

    Object.keys(SPREADSHEET_VALUES).forEach((key) => {
      const $wrapInput = document.createElement("div");
      $wrapInput.style.display = "flex";
      $wrapInput.style.flexDirection = "column";
      $wrapInput.style.width = "11%";
      $wrapInput.style.margin = "0 10px";

      const $label = document.createElement("label");
      $label.style.color = "#404040";
      $label.style.fontSize = "12px";
      $label.style.marginBottom = "5px";

      let transform_key = String(key);
      transform_key = transform_key[0].toUpperCase() + transform_key.slice(1);
      $label.innerText = transform_key;
      $wrapInput.appendChild($label);

      const $input = document.createElement("input");
      $input.style.border = "1px solid #c3c3c3";
      $input.style.padding = "5px 10px";
      $input.style.borderRadius = "5px";
      $input.style.color = "#404040";
      $input.type = "text";
      $input.style.fontSize = "13px";
      $input.value = SPREADSHEET_VALUES[key];
      $input.setAttribute("data-type", key);

      $wrapInput.appendChild($input);

      if (key === "name") {
        const $wrapBtn = document.createElement("div");
        $wrapBtn.style.display = "flex";
        $wrapBtn.style.justifyContent = "center";

        const $btnReverse = document.createElement("button");
        $btnReverse.style.border = "0";
        $btnReverse.style.background = "none";
        $btnReverse.style.cursor = "pointer";
        $btnReverse.style.background = "#d3d3d3";
        $btnReverse.style.borderRadius = "100px";
        $btnReverse.style.padding = "2px 5px";
        $btnReverse.style.marginTop = "5px";
        $btnReverse.style.color = "#404040";
        $btnReverse.textContent = "<->";
        $btnReverse.addEventListener("click", function (e) {
          const nameSlices = SPREADSHEET_VALUES[key].split(" ").reverse();
          const name = nameSlices.join(" ");
          SPREADSHEET_VALUES[key] = name;
          $input.value = name;
        });

        $wrapBtn.appendChild($btnReverse);
        $wrapInput.appendChild($wrapBtn);
      }
      $boxExcel.appendChild($wrapInput);
    });

    $btnExcel = document.createElement("button");
    $btnExcel.style.border = "0";
    $btnExcel.style.width = "80px";
    $btnExcel.style.height = "80px";
    $btnExcel.style.fontSize = "12px";
    $btnExcel.style.lineHeight = "130%";
    $btnExcel.style.borderRadius = "100px";
    $btnExcel.style.background = "#d3d3d3";
    $btnExcel.style.boxShadow = "0 0 16px 0 rgba(0, 0, 0, 0.5)";
    $btnExcel.style.bottom = "30px";
    $btnExcel.style.right = "30px";
    $btnExcel.style.display = "flex";
    $btnExcel.style.justifyContent = "center";
    $btnExcel.style.alignItems = "center";
    $btnExcel.style.padding = "20px";
    $btnExcel.style.marginLeft = "10px";
    $btnExcel.style.cursor = "pointer";
    $btnExcel.style.transition = "all 0.3s ease-in-out";
    $btnExcel.textContent = "Добавить в базу";

    $btnExcel.addEventListener(
      "mouseover",
      function (e) {
        e.target.style.transform = "scale(1.1)";
      },
      false
    );

    $btnExcel.addEventListener(
      "mouseout",
      function (e) {
        e.target.style.transform = "scale(1)";
      },
      false
    );

    $btnExcel.addEventListener("click", async function (e) {
      const body = {
        spreadsheet_id: SPREADSHEET_ID,
        sheet_name: SHEET_NAME,
        start_column: START_COLUMN,
        end_column: END_COLUMN,
        values: [
          SPREADSHEET_VALUES["owner"] || "",
          SPREADSHEET_VALUES["city"],
          SPREADSHEET_VALUES["name"] || "",
          SPREADSHEET_VALUES["phone"] || "",
          SPREADSHEET_VALUES["site"] || "",
          SPREADSHEET_VALUES["status"] || "",
          SPREADSHEET_VALUES["date"],
        ],
      };

      try {
        $btnExcel.textContent = "Добавление...";
        const response = await fetch(URL_SPREADSHEET, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.errors) {
            alert("Данные добавлены!");
          }
          return;
        }

        throw new Error("Данные не добавлены!");
      } catch (e) {
        alert("Произошла ошибка порпобуйте еще раз!");
        console.log(e);
        return false;
      } finally {
        $btnExcel.textContent = "Добавить в базу";
      }
    });

    $boxExcel.appendChild($btnExcel);
  }

  const siteElements = [
    {
      site: "hh.ru",
      name: "HH",
      elements: [
        {
          name: "name",
          selector: ".bloko-header-1>span",
          pattern: "",
        },
        {
          name: "phone",
          selector: 'div[data-qa="resume-contacts-phone"]',
          pattern: "",
        },
        {
          name: "city",
          selector: ".bloko-translate-guard>p>span",
          pattern: "",
        },
        {
          name: "status",
          selector: 'div[data-qa="resume-comments"]',
          pattern: "отзывы",
        },
      ],
    },
    {
      site: "zarplata.ru",
      name: "Зарплата ру",
      elements: [
        {
          name: "name",
          selector: ".bloko-header-1>span",
          pattern: "",
        },
        {
          name: "phone",
          selector: 'div[data-qa="resume-contacts-phone"]',
          pattern: "",
        },
        {
          name: "city",
          selector: ".bloko-translate-guard>p>span",
          pattern: "",
        },
        {
          name: "status",
          selector: 'div[data-qa="resume-comments"]',
          pattern: "отзывы",
        },
      ],
    },
    {
      site: "avito.ru",
      name: "Авито",
      elements: [
        {
          name: "name",
          selector: ".js-seller-info-name>span",
          pattern: "",
        },
        {
          name: "phone",
          selector: 'button[data-marker="item-phone-button/card"]',
          pattern: "",
          func: (elem) => {
            const $img = elem.querySelector("img");
            if (!$img) return;
            const img_src = $img.getAttribute("src");
            if (!img_src) return;

            fetch("http://localhost:8000/api/avito/phone", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ image: img_src }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data["phone"]) {
                  elem.innerText = data["phone"];
                  phoneSelection(elem);
                  $boxExcel.remove();
                  createBoxExcel();
                  document.body.appendChild($boxExcel);
                }
              });
          },
        },
        {
          name: "city",
          selector: ".style-item-address-KooqC>div>span",
          pattern: "",
          func: (elem) => {
            const cities =
              "Город Абаза Абакан Абдулино Абинск Агидель Агрыз Адыгейск Азнакаево Азов Ак-Довурак Аксай Алагир Алапаевск Алатырь Алдан Алейск Александров Александровск Александровск-Сахалинский Алексеевка Алексин Алзамай Алупкане призн. Алуштане призн. Альметьевск Амурск Анадырь Анапа Ангарск Андреаполь Анжеро-Судженск Анива Апатиты Апрелевка Апшеронск Арамиль Аргун Ардатов Ардон Арзамас Аркадак Армавир Армянскне призн. Арсеньев Арск Артём Артёмовск Артёмовский Архангельск Асбест Асино Астрахань Аткарск Ахтубинск Ачинск Ачхой-Мартан Аша Бабаево Бабушкин Бавлы Багратионовск Байкальск Баймак Бакал Баксан Балабаново Балаково Балахна Балашиха Балашов Балей Балтийск Барабинск Барнаул Барыш Батайск Бахчисарайне призн. Бежецк Белая Калитва Белая Холуница Белгород Белебей Белёв Белинский Белово Белогорск Белогорскне призн. Белозерск Белокуриха Беломорск Белоозёрский Белорецк Белореченск Белоусово Белоярский Белый Бердск Березники Берёзовский Берёзовский Беслан Бийск Бикин Билибино Биробиджан Бирск Бирюсинск Бирюч Благовещенск Благовещенск Благодарный Бобров Богданович Богородицк Богородск Боготол Богучар Бодайбо Бокситогорск Болгар Бологое Болотное Болохово Болхов Большой Камень Бор Борзя Борисоглебск Боровичи Боровск Бородино Братск Бронницы Брянск Бугульма Бугуруслан Будённовск Бузулук Буинск Буй Буйнакск Бутурлиновка Валдай Валуйки Велиж Великие Луки Великий Новгород Великий Устюг Вельск Венёв Верещагино Верея Верхнеуральск Верхний Тагил Верхний Уфалей Верхняя Пышма Верхняя Салда Верхняя Тура Верхотурье Верхоянск Весьегонск Ветлуга Видное Вилюйск Вилючинск Вихоревка Вичуга Владивосток Владикавказ Владимир Волгоград Волгодонск Волгореченск Волжск Волжский Вологда Володарск Волоколамск Волосово Волхов Волчанск Вольск Воркута Воронеж Ворсма Воскресенск Воткинск Всеволожск Вуктыл Выборг Выкса Высоковск Высоцк Вытегра Вышний Волочёк Вяземский Вязники Вязьма Вятские Поляны Гаврилов Посад Гаврилов-Ям Гагарин Гаджиево Гай Галич Гатчина Гвардейск Гдов Геленджик Георгиевск Глазов Голицыно Горбатов Горно-Алтайск Горнозаводск Горняк Городец Городище Городовиковск Гороховец Горячий Ключ Грайворон Гремячинск Грозный Грязи Грязовец Губаха Губкин Губкинский Гудермес Гуково Гулькевичи Гурьевск Гурьевск Гусев Гусиноозёрск Гусь-Хрустальный Давлеканово Дагестанские Огни Далматово Дальнегорск Дальнереченск Данилов Данков Дегтярск Дедовск Демидов Дербент Десногорск Джанкойне призн. Дзержинск Дзержинский Дивногорск Дигора Димитровград Дмитриев Дмитров Дмитровск Дно Добрянка Долгопрудный Долинск Домодедово Донецк Донской Дорогобуж Дрезна Дубна Дубовка Дудинка Духовщина Дюртюли Дятьково Евпаторияне призн. Егорьевск Ейск Екатеринбург Елабуга Елец Елизово Ельня Еманжелинск Емва Енисейск Ермолино Ершов Ессентуки Ефремов Железноводск Железногорск Железногорск Железногорск-Илимский Жердевка Жигулёвск Жиздра Жирновск Жуков Жуковка Жуковский Завитинск Заводоуковск Заволжск Заволжье Задонск Заинск Закаменск Заозёрный Заозёрск Западная Двина Заполярный Зарайск Заречный Заречный Заринск Звенигово Звенигород Зверево Зеленогорск Зеленоградск Зеленодольск Зеленокумск Зерноград Зея Зима Златоуст Злынка Змеиногорск Знаменск Зубцов Зуевка Ивангород Иваново Ивантеевка Ивдель Игарка Ижевск Избербаш Изобильный Иланский Инза Иннополис Инсар Инта Ипатово Ирбит Иркутск Исилькуль Искитим Истра Ишим Ишимбай Йошкар-Ола Кадников Казань Калач Калач-на-Дону Калачинск Калининград Калининск Калтан Калуга Калязин Камбарка Каменка Каменногорск Каменск-Уральский Каменск-Шахтинский Камень-на-Оби Камешково Камызяк Камышин Камышлов Канаш Кандалакша Канск Карабаново Карабаш Карабулак Карасук Карачаевск Карачев Каргат Каргополь Карпинск Карталы Касимов Касли Каспийск Катав-Ивановск Катайск Качканар Кашин Кашира Кедровый Кемерово Кемь Керчьне призн. Кизел Кизилюрт Кизляр Кимовск Кимры Кингисепп Кинель Кинешма Киреевск Киренск Киржач Кириллов Кириши Киров Киров Кировград Кирово-Чепецк Кировск Кировск Кирс Кирсанов Киселёвск Кисловодск Клин Клинцы Княгинино Ковдор Ковров Ковылкино Когалым Кодинск Козельск Козловка Козьмодемьянск Кола Кологрив Коломна Колпашево Колтуши Кольчугино Коммунар Комсомольск Комсомольск-на-Амуре Конаково Кондопога Кондрово Константиновск Копейск Кораблино Кореновск Коркино Королёв Короча Корсаков Коряжма Костерёво Костомукша Кострома Котельники Котельниково Котельнич Котлас Котово Котовск Кохма Красавино Красноармейск Красноармейск Красновишерск Красногорск Краснодар Краснозаводск Краснознаменск Краснознаменск Краснокаменск Краснокамск Красноперекопскне призн. Краснослободск Краснослободск Краснотурьинск Красноуральск Красноуфимск Красноярск Красный Кут Красный Сулин Красный Холм Кремёнки Кропоткин Крымск Кстово Кубинка Кувандык Кувшиново Кудрово Кудымкар Кузнецк Куйбышев Кукмор Кулебаки Кумертау Кунгур Купино Курган Курганинск Курильск Курлово Куровское Курск Куртамыш Курчалой Курчатов Куса Кушва Кызыл Кыштым Кяхта Лабинск Лабытнанги Лагань Ладушкин Лаишево Лакинск Лангепас Лахденпохья Лебедянь Лениногорск Ленинск Ленинск-Кузнецкий Ленск Лермонтов Лесной Лесозаводск Лесосибирск Ливны Ликино-Дулёво Липецк Липки Лиски Лихославль Лобня Лодейное Поле Лосино-Петровский Луга Луза Лукоянов Луховицы Лысково Лысьва Лыткарино Льгов Любань Люберцы Любим Людиново Лянтор Магадан Магас Магнитогорск Майкоп Майский Макаров Макарьев Макушино Малая Вишера Малгобек Малмыж Малоархангельск Малоярославец Мамадыш Мамоново Мантурово Мариинск Мариинский Посад Маркс Махачкала Мглин Мегион Медвежьегорск Медногорск Медынь Межгорье Междуреченск Мезень Меленки Мелеуз Менделеевск Мензелинск Мещовск Миасс Микунь Миллерово Минеральные Воды Минусинск Миньяр Мирный Мирный Михайлов Михайловка Михайловск Михайловск Мичуринск Могоча Можайск Можга Моздок Мончегорск Морозовск Моршанск Мосальск Москва Муравленко Мураши Мурино Мурманск Муром Мценск Мыски Мытищи Мышкин Набережные Челны Навашино Наволоки Надым Назарово Назрань Называевск Нальчик Нариманов Наро-Фоминск Нарткала Нарьян-Мар Находка Невель Невельск Невинномысск Невьянск Нелидово Неман Нерехта Нерчинск Нерюнгри Нестеров Нефтегорск Нефтекамск Нефтекумск Нефтеюганск Нея Нижневартовск Нижнекамск Нижнеудинск Нижние Серги Нижний Ломов Нижний Новгород Нижний Тагил Нижняя Салда Нижняя Тура Николаевск Николаевск-на-Амуре Никольск Никольск Никольское Новая Ладога Новая Ляля Новоалександровск Новоалтайск Новоаннинский Нововоронеж Новодвинск Новозыбков Новокубанск Новокузнецк Новокуйбышевск Новомичуринск Новомосковск Новопавловск Новоржев Новороссийск Новосибирск Новосиль Новосокольники Новотроицк Новоузенск Новоульяновск Новоуральск Новохопёрск Новочебоксарск Новочеркасск Новошахтинск Новый Оскол Новый Уренгой Ногинск Нолинск Норильск Ноябрьск Нурлат Нытва Нюрба Нягань Нязепетровск Няндома Облучье Обнинск Обоянь Обь Одинцово Озёрск Озёрск Озёры Октябрьск Октябрьский Окуловка Олёкминск Оленегорск Олонец Омск Омутнинск Онега Опочка Орёл Оренбург Орехово-Зуево Орлов Орск Оса Осинники Осташков Остров Островной Острогожск Отрадное Отрадный Оха Оханск Очёр Павлово Павловск Павловский Посад Палласовка Партизанск Певек Пенза Первомайск Первоуральск Перевоз Пересвет Переславль-Залесский Пермь Пестово Петров Вал Петровск Петровск-Забайкальский Петрозаводск Петропавловск-Камчатский Петухово Петушки Печора Печоры Пикалёво Пионерский Питкяранта Плавск Пласт Плёс Поворино Подольск Подпорожье Покачи Покров Покровск Полевской Полесск Полысаево Полярные Зори Полярный Поронайск Порхов Похвистнево Почеп Починок Пошехонье Правдинск Приволжск Приморск Приморск Приморско-Ахтарск Приозерск Прокопьевск Пролетарск Протвино Прохладный Псков Пугачёв Пудож Пустошка Пучеж Пушкино Пущино Пыталово Пыть-Ях Пятигорск Радужный Радужный Райчихинск Раменское Рассказово Ревда Реж Реутов Ржев Родники Рославль Россошь Ростов-на-Дону Ростов Рошаль Ртищево Рубцовск Рудня Руза Рузаевка Рыбинск Рыбное Рыльск Ряжск Рязань Сакине призн. Салават Салаир Салехард Сальск Самара Санкт-Петербург Саранск Сарапул Саратов Саров Сасово Сатка Сафоново Саяногорск Саянск Светлогорск Светлоград Светлый Светогорск Свирск Свободный Себеж Севастопольне призн. Северо-Курильск Северобайкальск Северодвинск Североморск Североуральск Северск Севск Сегежа Сельцо Семёнов Семикаракорск Семилуки Сенгилей Серафимович Сергач Сергиев Посад Сердобск Серов Серпухов Сертолово Сибай Сим Симферопольне призн. Сковородино Скопин Славгород Славск Славянск-на-Кубани Сланцы Слободской Слюдянка Смоленск Снежинск Снежногорск Собинка Советск Советск Советск Советская Гавань Советский Сокол Солигалич Соликамск Солнечногорск Соль-Илецк Сольвычегодск Сольцы Сорочинск Сорск Сортавала Сосенский Сосновка Сосновоборск Сосновый Бор Сосногорск Сочи Спас-Деменск Спас-Клепики Спасск Спасск-Дальний Спасск-Рязанский Среднеколымск Среднеуральск Сретенск Ставрополь Старая Купавна Старая Русса Старица Стародуб Старый Крымне призн. Старый Оскол Стерлитамак Стрежевой Строитель Струнино Ступино Суворов Судакне призн. Суджа Судогда Суздаль Сунжа Суоярви Сураж Сургут Суровикино Сурск Сусуман Сухиничи Сухой Лог Сызрань Сыктывкар Сысерть Сычёвка Сясьстрой Тавда Таганрог Тайга Тайшет Талдом Талица Тамбов Тара Тарко-Сале Таруса Татарск Таштагол Тверь Теберда Тейково Темников Темрюк Терек Тетюши Тимашёвск Тихвин Тихорецк Тобольск Тогучин Тольятти Томари Томмот Томск Топки Торжок Торопец Тосно Тотьма Трёхгорный Троицк Трубчевск Туапсе Туймазы Тула Тулун Туран Туринск Тутаев Тында Тырныауз Тюкалинск Тюмень Уварово Углегорск Углич Удачный Удомля Ужур Узловая Улан-Удэ Ульяновск Унеча Урай Урень Уржум Урус-Мартан Урюпинск Усинск Усмань Усолье-Сибирское Усолье Уссурийск Усть-Джегута Усть-Илимск Усть-Катав Усть-Кут Усть-Лабинск Устюжна Уфа Ухта Учалы Уяр Фатеж Феодосияне призн. Фокино Фокино Фролово Фрязино Фурманов Хабаровск Хадыженск Ханты-Мансийск Харабали Харовск Хасавюрт Хвалынск Хилок Химки Холм Холмск Хотьково Цивильск Цимлянск Циолковский Чадан Чайковский Чапаевск Чаплыгин Чебаркуль Чебоксары Чегем Чекалин Челябинск Чердынь Черемхово Черепаново Череповец Черкесск Чёрмоз Черноголовка Черногорск Чернушка Черняховск Чехов Чистополь Чита Чкаловск Чудово Чулым Чусовой Чухлома Шагонар Шадринск Шали Шарыпово Шарья Шатура Шахты Шахунья Шацк Шебекино Шелехов Шенкурск Шилка Шимановск Шиханы Шлиссельбург Шумерля Шумиха Шуя Щёкино Щёлкиноне призн. Щёлково Щигры Щучье Электрогорск Электросталь Электроугли Элиста Энгельс Эртиль Югорск Южа Южно-Сахалинск Южно-Сухокумск Южноуральск Юрга Юрьев-Польский Юрьевец Юрюзань Юхнов Ядрин Якутск Ялтане призн. Ялуторовск Янаул Яранск Яровое Ярославль Ярцево Ясногорск Ясный Яхрома".split(
                " "
              );

            const addrSlices = elem.textContent
              ? elem.textContent.split(",")
              : elem.textContent;

            for (let i = 0; i < addrSlices.length; i++) {
              if (cities.includes(addrSlices[i])) {
                elem.textContent = addrSlices[i].trim();
                break;
              }
            }
          },
        },
        {
          name: "status",
          selector: 'div[data-marker="item-note/existing-note-container"]',
          pattern: "отзывы",
        },
      ],
    },
    // {
    //     site: "rabota.ru",
    //     elements: [".candidate-name", ".b-city-info"],
    //   },
    // {
    //     site: "avito.ru",
    //     elements: [".js-seller-info-name>span"],
    //   },
    // {
    //     site: "joblab.ru",
    //     elements: [".table-to-div tr:nth-child(1)>td:nth-child(2)", ".table-to-div tr:nth-child(9)>td:nth-child(2)"],
    //   },
    // {
    //     site: "farpost.ru",
    //     elements: ["span[data-field=\"subject\"]", "span[data-field=\"cityId\"]"],
    //   },
  ];

  function addStyle2Elem(elem) {
    elem.style.position = "relative";
    elem.style.background = "#ADFF2F";
    elem.style.borderRadius = "100px";
    elem.style.padding = "5px";
  }

  function addBtnCopy(elem, clipboardValue) {
    if (!elem) return;

    const $btnCopy = document.createElement("button");
    $btnCopy.style.display = "flex";
    $btnCopy.style.justifyContent = "center";
    $btnCopy.style.alignItems = "center";
    $btnCopy.style.width = "30px";
    $btnCopy.style.height = "30px";
    $btnCopy.style.border = "0";
    $btnCopy.style.borderRadius = "100px";
    $btnCopy.style.background = "#d3d3d3";
    $btnCopy.style.top = "50%";
    $btnCopy.style.transform = "translateY(-50%)";
    $btnCopy.style.position = "absolute";
    $btnCopy.style.right = "-25px";
    $btnCopy.style.boxShadow = "0 2px 3px 0 rgba(0, 0, 0, 0.5)";
    $btnCopy.innerHTML = svgIcon;
    $btnCopy.addEventListener("click", function () {
      window.navigator.clipboard.writeText(clipboardValue.trim());
    });
    elem.append($btnCopy);
  }

  function createWrapElem(elem) {
    const content = elem.textContent;
    const $span = document.createElement("span");
    $span.textContent = content;
    elem.innerHTML = "";
    elem.append($span);
    return $span;
  }

  function phoneSelection(elem) {
    let content = elem.innerHTML;
    content = content.replace(/href="[^"]*"/gi, "");
    const results = content.match(/\+?[78][\d\-\(\) ]{9,}\d/gi);
    if (results) {
      results.forEach((item) => {
        let cut_item = item.replace(/[\(\)\-\s]/g, "");
        cut_item = cut_item.replace(/\+7/, "8");
        SPREADSHEET_VALUES["phone"] = cut_item;
        content = content.replace(
          item,
          `<span style="position: relative; background: #ADFF2F; border-radius: 100px; padding: 5px;">${cut_item}<button style="display: flex; justify-content: center; align-items: center; width: 30px; height: 30px; border: 0; border-radius: 100px; background: #d3d3d3; top: 50%; transform: translateY(-50%); position: absolute; right: -25px; box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);" onclick={window.navigator.clipboard.writeText('${cut_item}');}>${svgIcon}</button></span>`
        );
      });

      elem.innerHTML = content;
    }
  }

  const patterns = [
    {
      "отказ|сбросил трубку|неудобно говорить|неактуально|рассматривает удаленку|подумает":
        "Отказ",
    },
    { "приглашен|пригл": "Приглашен" },
    { "ндз|телефон недоступен": "Недозвон" },
    { перезвонить: "Перезвонить" },
  ];

  function patternSelection(elem) {
    let content = elem.innerHTML;

    for (let i = 0; i < patterns.length; i++) {
      const pattern = Object.keys(patterns[i])[0];
      const regex = new RegExp(pattern, "gi");
      if (content.match(regex)) {
        const value = patterns[i][pattern];
        SPREADSHEET_VALUES["status"] = value;
        content = content.replace(
          regex,
          `<span style="position: relative; background: #ADFF2F; border-radius: 100px; padding: 5px;">${value}<button style="display: flex; justify-content: center; align-items: center; width: 30px; height: 30px; border: 0; border-radius: 100px; background: #d3d3d3;     top: 50%; transform: translateY(-50%); position: absolute; right: -25px; box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);" onclick={window.navigator.clipboard.writeText('${value}');}>${svgIcon}</button></span>`
        );

        elem.innerHTML = content;
        break;
      }
    }
  }

  for (let i = 0; i < siteElements.length; i++) {
    if (window.location.host.includes(siteElements[i].site)) {
      if (!siteElements[i].elements) break;

      siteElements[i].elements.forEach((elem) => {
        const $el = document.querySelector(elem.selector);
        if ($el && elem.name == "phone") {
          if (typeof elem.func == "function") {
            elem.func($el);
          }
          phoneSelection($el);
        } else if ($el && !elem.pattern) {
          if (typeof elem.func == "function") {
            elem.func($el);
          }
          const $wrapElem = createWrapElem($el);
          addStyle2Elem($wrapElem);
          addBtnCopy($wrapElem, $el.textContent);
          if (elem.name) {
            SPREADSHEET_VALUES[elem.name] = $el.textContent.trim();
            SPREADSHEET_VALUES["site"] = siteElements[i].name;
          }
        } else if ($el && elem.pattern) {
          patternSelection($el);
        }
      });
      break;
    }
  }

  createBoxExcel();
  document.body.append($boxExcel);
})();
