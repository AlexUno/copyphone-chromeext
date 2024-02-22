(function () {
  const $btnExcel = document.createElement("button");
  $btnExcel.style.border = "0";
  $btnExcel.style.width = "100px";
  $btnExcel.style.height = "100px";
  $btnExcel.style.borderRadius = "100px";
  $btnExcel.style.background = "#d3d3d3";
  $btnExcel.style.boxShadow = "0 0 5px 0 rgba(0, 0, 0, 0.5)";
  $btnExcel.style.position = "fixed";
  $btnExcel.style.bottom = "30px";
  $btnExcel.style.right = "30px";
  $btnExcel.style.display = "flex";
  $btnExcel.style.justifyContent = "center";
  $btnExcel.style.alignItems = "center";
  $btnExcel.style.padding = "20px";
  $btnExcel.style.cursor = "pointer";
  $btnExcel.textContent = "Добавить в набор";

  document.body.appendChild($btnExcel);
})();
