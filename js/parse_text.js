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
  const $arrDiv = document.querySelectorAll("div");
  const $arrP = document.querySelectorAll("p");
  const $arrA = document.querySelectorAll("a");
  const $arrSpan = document.querySelectorAll("span");
  const $arrB = document.querySelectorAll("b");
  
  const patterns = [
	{'отказ|сбросил трубку|неудобно говорить|неактуально|рассматривает удаленку|подумает': 'Отказ'},
	{'приглашен|пригл': 'Приглашен'},
	{'ндз|телефон недоступен': 'Недозвон'},
	{'перезвонить': 'Перезвонить'},
  ];

  searchText2Tags($arrDiv);
  searchText2Tags($arrP);
  searchText2Tags($arrA);
  searchText2Tags($arrSpan);
  searchText2Tags($arrB);
  
  function phoneSelection(elem){
	  let content = elem.innerHTML;
	  content = content.replace(/href="[^"]*"/gi, "");
	  const results = content.match(/\+?[78][\d\-\(\) ]{9,}\d/gi);
	  if (results) {
		results.forEach((item) => {
		  let cut_item = item.replace(/[\(\)\-\s]/g, "");
		  cut_item = cut_item.replace(/\+7/, "8");
		  content = content.replace(
			item,
			`<span style="position: relative; background: #ADFF2F; border-radius: 100px; padding: 5px;">${cut_item}<button style="display: flex; justify-content: center; align-items: center; width: 30px; height: 30px; border: 0; border-radius: 100px; background: #d3d3d3; top: 50%; transform: translateY(-50%); position: absolute; right: -25px; box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);" onclick={window.navigator.clipboard.writeText('${cut_item}');}>${svgIcon}</button></span>`
		  );
		});

		elem.innerHTML = content;
	  }
  }
  
  function patternSelection(elem){
	  let content = elem.innerHTML;
	  
	  for(let i = 0; i < patterns.length; i++){
		  const pattern = Object.keys(patterns[i])[0]
		  const regex = new RegExp(pattern, 'gi');
		  if(content.match(regex)){
			  const value = patterns[i][pattern];
			  content = content.replace(
				regex,
				`<span style="position: relative; background: #ADFF2F; border-radius: 100px; padding: 5px;">${value}<button style="display: flex; justify-content: center; align-items: center; width: 30px; height: 30px; border: 0; border-radius: 100px; background: #d3d3d3;     top: 50%; transform: translateY(-50%); position: absolute; right: -25px; box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);" onclick={window.navigator.clipboard.writeText('${value}');}>${svgIcon}</button></span>`
			  );
			  
			  elem.innerHTML = content;
		  }
	  }
  }

  function searchText2Tags(elements) {
    if (elements) {
      elements.forEach((elem) => {
        if (!elem.innerHTML.match(/<div>|<p>|<a>/gi)) {
          phoneSelection(elem);
		  patternSelection(elem);
        }
      });
    }
  }
})();
