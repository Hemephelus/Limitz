let DataSet = [[1001, 222, 14.5, 3], [151, 180, 6, 4], [148, 178, 9, 5], [189, 165, 12, 6], [183, 192, 18, 7], [154, 144, 15, 8]]//[[70,80],[65,100],[90,120],[95,140],[110,160],[115,180],[120,200],[140,220],[155,240],[150,260]] 
let DataArray;

function DataArrayCreator() {
  for (let j = 0; j < DataSet[0].length; j++) {
    let arrayColumn = (DataSet, j) => DataSet.map(x => x[j]);
    DataArray = arrayColumn(DataSet, j)
    Descriptivestats(DataArray)
  }

}
function Descriptivestats() {

  Logger.log(Mean(DataArray))
  Logger.log(Sum(DataArray))
  Logger.log(Minimum(DataArray))
  Logger.log(Maximum(DataArray))
  Logger.log(DataArray.length)
  Logger.log(Median(DataArray))
  Logger.log(StandardDeviation(DataArray))
  Logger.log(Skewness(DataArray))
  Logger.log(Kurtosis(DataArray))
  Logger.log(SumofSquares(DataArray))
  Logger.log(JarqueBera(DataArray))
  Logger.log(Probability(DataArray))
}

/**
 * Executed on add-on install.
 */
function onInstall() {
  'use strict';
  onOpen();
}

/**
 * Executed on add-on open.
 */
function onOpen() {
  'use strict';
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Show documentation', 'showDocumentation_')
      .addToUi();
}

/**
 * Shows a sidebar with help.
 */
function showDocumentation_() {
  'use strict';
  var html = HtmlService.createHtmlOutputFromFile('Doc')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle('Documentation')
      .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}
