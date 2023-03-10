/**
 * Returns a statistical summary of multiple variables at once.==
 * 
 * @param {A1:C51} DataSet The range of cells to calculate.
 * @param {1} HeaderRow confirm if there is a header row by typing 1.
 *
 * @return a statistical summary of multiple variables at once.
 * @customfunction
 */

function DescriptiveStatistics(DataSet, HeaderRow) {
  let DataArray;
   let Summary = {
     Title: ["Title"],
     Mean: ["Mean"],
     Sum: ["Sum"],
     Minimum: ["Minimum"],
     Maximum: ["Maximum"],
     Observation: ["Observation"],
     Median: ["Median"],
     StandardDeviation: ["Standard Deviation"],
     Skewness: ["Skewness"],
     Kurtosis: ["Kurtosis"],
     SumofSquares: ["Sum of Squares"],
     JarqueBera: ["JarqueBera"],
   }
 
  if(HeaderRow == 1 ){
      for (let j = 0; j < DataSet[0].length; j++) {
         if(!isString(DataSet[0][j])){
           return "Please provide a text a the header."
         }
        Summary.Title.push(DataSet[0][j])
      }
          DataSet.splice(0, 1)
   }else{
       for (let j = 0; j < DataSet[0].length; j++) {
         if(isString(DataSet[0][j])){
           return "Please confirm a header row or select only the range of values."
         }
        Summary.Title.push("var"+j)
      }
   }
 
   for (let j = 0; j < DataSet[0].length; j++) {
     let arrayColumn = (DataSet, j) => DataSet.map(x => x[j]);
     DataArray = arrayColumn(DataSet, j)
     Summary.Mean.push(Mean(DataArray).toFixed(4))
     Summary.Sum.push(Sum(DataArray).toFixed(4))
     Summary.Minimum.push(Minimum(DataArray).toFixed(4))
     Summary.Maximum.push(Maximum(DataArray).toFixed(4))
     Summary.Observation.push(DataArray.length)
     Summary.Median.push(Median(DataArray).toFixed(4))
     Summary.StandardDeviation.push(StandardDeviation(DataArray).toFixed(4))
     Summary.Skewness.push(StandardDeviation(DataArray).toFixed(4))
     Summary.Kurtosis.push(Kurtosis(DataArray).toFixed(4))
     Summary.SumofSquares.push(SumofSquares(DataArray).toFixed(4))
     Summary.JarqueBera.push(JarqueBera(DataArray).toFixed(4))
 
   }
 
 
   let SummaryTable = [
     Summary.Title,
     Summary.Mean,
     Summary.Sum,
     Summary.Minimum,
     Summary.Maximum,
     Summary.Observation,
     Summary.Median,
     Summary.StandardDeviation,
     Summary.Skewness,
     Summary.Kurtosis,
     Summary.SumofSquares,
     Summary.JarqueBera
   ]
 
 
   return SummaryTable
 
 
 }
 
 
   function isString(x) {
   return Object.prototype.toString.call(x) === "[object String]"
 }
 
 
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 
 
 
 function Mean(DataArray) {
   let Total = Sum(DataArray)
   let NumArry = DataArray.length
   return Total / NumArry.toFixed(4)
 }
 
 function Sum(DataArray) {
   return DataArray.reduce((a, b) => a + b, 0)
 }
 
 function Minimum(DataArray) {
   return Math.min.apply(Math, DataArray)
 }
 
 
 function Maximum(DataArray) {
   return Math.max.apply(Math, DataArray)
 }
 
 function Median(DataArray) {
   let SortedDataArray = DataArray.sort((a, b) => a - b)
   let NumArry = SortedDataArray.length
   if (SortedDataArray.length % 2 !== 0) {
     return SortedDataArray[Math.floor(SortedDataArray.length / 2)]
   } else {
     let Mid1 = SortedDataArray[SortedDataArray.length / 2]
     let Mid2 = SortedDataArray[(SortedDataArray.length / 2) - 1]
     return ((Mid1 + Mid2) / 2)
   }
 }
 
 function StandardDeviation(DataArray) {
   let Avg = Mean(DataArray)
   let SumDiffSqr = 0;
   let Obsavations = DataArray.length - 1
   for (let i = 0; i < DataArray.length; i++) {
     let DiffSqr = Math.pow((DataArray[i] - Avg), 2)
     SumDiffSqr = DiffSqr + SumDiffSqr
   }
   return Math.sqrt(SumDiffSqr / Obsavations)
 
 }
 
 function Skewness(DataArray) {
   let Avg = Mean(DataArray)
   let Stand_Dev_Cube = Math.pow(StandardDeviation(DataArray), 3)
   let SumDiffCube = 0;
   let n = DataArray.length
   let Obsavations = n / ((n - 1) * (n - 2))
   for (let i = 0; i < DataArray.length; i++) {
     let DiffCube = Math.pow((DataArray[i] - Avg), 3)
     SumDiffCube = DiffCube + SumDiffCube
   }
   return (Obsavations * (SumDiffCube / Stand_Dev_Cube))
 
 }
 
 function Kurtosis(DataArray) {
   let Avg = Mean(DataArray)
   let Stand_Dev_4 = Math.pow(StandardDeviation(DataArray), 4)
   let SumDiff4 = 0;
   let n = DataArray.length
   let AntiObsvt = (3 * Math.pow((n - 1), 2)) / ((n - 2) * (n - 3))
   let Obsvt = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))
 
   for (let i = 0; i < DataArray.length; i++) {
     let Diff4 = Math.pow((DataArray[i] - Avg), 4)
     SumDiff4 = Diff4 + SumDiff4
   }
   return (Obsvt * (SumDiff4 / Stand_Dev_4)) - AntiObsvt
 
 }
 
 function SumofSquares(DataArray) {
   let Avg = Mean(DataArray)
   let SumDiffSqr = 0;
   for (let i = 0; i < DataArray.length; i++) {
     let DiffSqr = Math.pow(DataArray[i], 2)
     SumDiffSqr = DiffSqr + SumDiffSqr
   }
   return SumDiffSqr
 
 }
 
 function JarqueBera(DataArray) {
   let Skew2 = Math.pow(Skewness(DataArray), 2)
   let Kurt2 = Math.pow(Kurtosis(DataArray) - 3, 2)
   let n = DataArray.length
   return (n / 6) * (Skew2 + (Kurt2 / 4))
 }
 
 
 function Probability(DataArray) {
  return "Pending..."
 }
 
 