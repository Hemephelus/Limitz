/**
 * Returns the correlation between multiple variables.
 * 
 * @param {A1:C51} Array The range of cells to calculate.
 *
 * @return the correlation between multiple variables.
 * @customfunction
 */

function MultipleCorrelation(DataSet) {
  let AllCorrelations = []
  let SomeCorrel = []
  let Correl;
  for (let j = 0; j < DataSet[0].length; j++) {

    for (let k = 0; k < DataSet[0].length; k++) {
      let arrayColumnY = (DataSet, k) => DataSet.map(x => x[k]);
      let DataArrayY = arrayColumnY(DataSet, k)
      let arrayColumnX = (DataSet, j) => DataSet.map(x => x[j]);
      let DataArrayX = arrayColumnX(DataSet, j)
      let AvgX = Mean(DataArrayX)
      let AvgY = Mean(DataArrayY)
      let SumProdtXY = 0
      let SumSqrX = 0
      let SumSqrY = 0
      for (let i = 0; i < DataSet.length; i++) {
        let DiffX = (DataArrayX[i] - AvgX)
        let DiffY = (DataArrayY[i] - AvgY)
        let ProdtXY = DiffX * DiffY
        SumProdtXY = SumProdtXY + ProdtXY
      }
      let Numerator = SumProdtXY

      for (let i = 0; i < DataSet.length; i++) {
        let DiffSqrX = Math.pow((DataArrayX[i] - AvgX), 2)
        let DiffSqrY = Math.pow((DataArrayY[i] - AvgY), 2)
        SumSqrX = SumSqrX + DiffSqrX
        SumSqrY = SumSqrY + DiffSqrY
      }
      let Denominator = Math.sqrt(SumSqrX * SumSqrY)
       Correl = Numerator / Denominator
      SomeCorrel.push(Correl)
    }
  AllCorrelations.push(SomeCorrel)
 SomeCorrel = []
  }
  return AllCorrelations
}












