(function () {
  const $arrDiv = document.querySelectorAll("div");
  const $arrP = document.querySelectorAll("p");
  const $arrA = document.querySelectorAll("a");
  const $arrSpan = document.querySelectorAll("span");
  const $arrB = document.querySelectorAll("b");

  searchPhoneInTags($arrDiv);
  searchPhoneInTags($arrP);
  searchPhoneInTags($arrA);
  searchPhoneInTags($arrSpan);
  searchPhoneInTags($arrB);

  function searchPhoneInTags(elements) {
    if (elements) {
      elements.forEach((elem) => {
        if (!elem.innerHTML.match(/<div>|<p>|<a>/gi)) {
          let content = elem.innerHTML;
          const results = content.match(/\+[78][\d\-\(\) ]{9,}\d/gi);
          if (results) {
            results.forEach((item) => {
              let cut_item = item.replace(/[\(\)\-\s]/g, "");
              cut_item = cut_item.replace(/\+7/, "8");
              content = content.replace(
                item,
                `<span style="display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; background: #ff0000; padding: 5px;"">${cut_item}<button style="padding: 5px 13px; font-size: 10px; background: #c0c0c0; border-radius: 100px; bottom: -15px; right: 0;" onclick={window.navigator.clipboard.writeText(${cut_item})}>Скопировать</button></span>`
              );
            });
            elem.innerHTML = content;
          }
        }
      });
    }
  }
})();
