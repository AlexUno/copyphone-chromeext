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
  const spreadsheet_values = { owner: "Александр" };
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
        spreadsheet_values["phone"] = cut_item;
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
        spreadsheet_values["status"] = value;
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
          phoneSelection($el);
        } else if ($el && !elem.pattern) {
          const $wrapElem = createWrapElem($el);
          addStyle2Elem($wrapElem);
          addBtnCopy($wrapElem, $el.textContent);
          if (elem.name) {
            spreadsheet_values[elem.name] = $el.textContent.trim();
            spreadsheet_values["site"] = siteElements[i].name;
          }
        } else if ($el && elem.pattern) {
          patternSelection($el);
        }
      });
      break;
    }
  }

  const $boxExcel = document.createElement("div");
  $boxExcel.style.position = "fixed";
  $boxExcel.style.bottom = "0";
  $boxExcel.style.right = "0";
  $boxExcel.style.left = "0";
  $boxExcel.style.background = "#FFF";
  $boxExcel.style.zIndex = "9999999";
  $boxExcel.style.display = "flex";
  $boxExcel.style.justifyContent = "space-around";
  $boxExcel.style.alignItems = "center";
  $boxExcel.style.padding = "20px";
  $boxExcel.style.borderTopLeftRadius = "30px";
  $boxExcel.style.borderTopRightRadius = "30px";
  $boxExcel.style.boxShadow = "0 0 50px 0 rgba(133, 133, 133, 0.5)";

  $boxExcel.addEventListener("input", function (e) {
    switch (e.target.dataset.type) {
      case "name":
        spreadsheet_values["name"] = e.target.value;
        break;
      case "city":
        spreadsheet_values["city"] = e.target.value;
        break;
      case "phone":
        spreadsheet_values["phone"] = e.target.value;
        break;
      case "site":
        spreadsheet_values["site"] = e.target.value;
        break;
      case "status":
        spreadsheet_values["status"] = e.target.value;
        break;
    }
    console.log(spreadsheet_values);
  });

  Object.keys(spreadsheet_values).forEach((key) => {
    const $input = document.createElement("input");
    $input.style.border = "1px solid #c3c3c3";
    $input.style.padding = "5px 10px";
    $input.style.borderRadius = "5px";
    $input.type = "text";
    $input.style.fontSize = "13px";
    $input.style.width = "12%";
    $input.value = spreadsheet_values[key];
    $input.setAttribute("data-type", key);
    $boxExcel.appendChild($input);
  });

  const $btnExcel = document.createElement("button");
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
  $btnExcel.style.cursor = "pointer";
  $btnExcel.textContent = "Добавить в базу";

  const urlSpreadsheet = "http://localhost:8000/api/spreadsheet/append";
  const SPREADSHEET_ID = "1x7nFPG7UmoSd1dLLPD5w4uRfHoEfFCEUH232E_xSOwk";
  const SHEET_NAME = "Лист1";
  const START_COLUMN = "A";
  const END_COLUMN = "E";

  $btnExcel.addEventListener("click", async function (e) {
    const body = {
      spreadsheet_id: SPREADSHEET_ID,
      sheet_name: SHEET_NAME,
      start_column: START_COLUMN,
      end_column: END_COLUMN,
      values: [
        spreadsheet_values["owner"] || "",
        spreadsheet_values["name"] || "",
        spreadsheet_values["phone"] || "",
        spreadsheet_values["site"] || "",
        spreadsheet_values["status"] || "",
      ],
    };

    try {
      $btnExcel.textContent = "Добавление...";
      const response = await fetch(urlSpreadsheet, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
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
  document.body.append($boxExcel);
})();
